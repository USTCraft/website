import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'
import console from 'node:console'

// Connection details stay in the caller's environment and local OpenSSH config.
const root = dirname(dirname(fileURLToPath(import.meta.url)))
const { DEPLOY_HOST: host, DEPLOY_DIR: directory, SITE_URL: siteUrl } = process.env
const dryRun = process.argv.includes('--dry-run')

function run(command, args) {
  const result = spawnSync(command, args, { cwd: root, stdio: 'inherit' })
  if (result.error) throw result.error
  if (result.status !== 0) throw new Error(`${command} failed (${result.status})`)
}

function quote(value) {
  return `'${value.replaceAll("'", "'\\''")}'`
}

try {
  if (!host || !/^[a-zA-Z0-9][a-zA-Z0-9_.@-]*$/.test(host)) {
    throw new Error('Set DEPLOY_HOST to a local SSH alias or user@hostname.')
  }
  if (
    !directory ||
    !/^\/[a-zA-Z0-9_./-]+$/.test(directory) ||
    directory.split('/').some((part) => part === '..' || part === '.') ||
    directory.split('/').filter(Boolean).length < 2
  ) {
    throw new Error('Set DEPLOY_DIR to a dedicated absolute site directory, e.g. /srv/website.')
  }
  const url = new URL(siteUrl)
  const base = process.env.BASE_PATH || '/'
  if (
    !['https:', 'http:'].includes(url.protocol) ||
    url.search ||
    url.hash ||
    url.username ||
    url.password
  ) {
    throw new Error(
      'SITE_URL must be the public HTTP(S) site URL without credentials, query or hash.',
    )
  }
  if (!base.startsWith('/') || !base.endsWith('/') || url.pathname !== base) {
    throw new Error(
      'SITE_URL pathname must match BASE_PATH (default /), including the trailing slash.',
    )
  }

  const siteDirectory = directory.replace(/\/+$/, '')
  const release = `release-${new Date().toISOString().replace(/[:.]/g, '-')}-${process.pid}`
  const remoteRelease = `${siteDirectory}/releases/${release}`
  const archiveName = `${release}.tar.gz`
  if (dryRun) {
    console.log(
      `Build ${url.href}, upload dist to ${host}:${remoteRelease}, then switch ${siteDirectory}/current.`,
    )
  } else {
    // cmd.exe needs the Windows npm launcher; command text is fixed, never interpolated.
    if (process.platform === 'win32') run('cmd.exe', ['/d', '/s', '/c', 'npm run build'])
    else run('npm', ['run', 'build'])
    const temporary = mkdtempSync(join(tmpdir(), 'website-deploy-'))
    try {
      const archive = join(temporary, archiveName)
      run('tar', ['-czf', archive, '-C', '.vitepress/dist', '.'])
      const ssh = ['-o', 'ControlMaster=no', '-o', 'ClearAllForwardings=yes', host]
      // Refuse to replace an existing directory or regular file named current.
      run('ssh', [
        ...ssh,
        `set -eu; test ! -e ${quote(`${siteDirectory}/current`)} || test -L ${quote(`${siteDirectory}/current`)}; mkdir -p ${quote(remoteRelease)}`,
      ])
      run('scp', [
        '-o',
        'ClearAllForwardings=yes',
        archive,
        `${host}:${remoteRelease}/${archiveName}`,
      ])
      run('ssh', [
        ...ssh,
        [
          'set -eu',
          `cd ${quote(remoteRelease)}`,
          `tar -xzf ${quote(archiveName)}`,
          'test -s index.html',
          `rm -- ${quote(archiveName)}`,
          `cd ${quote(siteDirectory)}`,
          'test ! -e current || test -L current',
          `ln -s ${quote(`releases/${release}`)} ${quote(`.${release}`)}`,
          `mv -Tf -- ${quote(`.${release}`)} current`,
        ].join('; '),
      ])
      console.log('Deployment complete. Previous releases are retained for rollback.')
    } finally {
      rmSync(temporary, { recursive: true, force: true })
    }
  }
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
