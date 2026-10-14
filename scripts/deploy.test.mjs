import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import process from 'node:process'

function preview(overrides = {}) {
  return spawnSync(process.execPath, ['scripts/deploy.mjs', '--dry-run'], {
    encoding: 'utf8',
    env: {
      ...process.env,
      DEPLOY_HOST: 'example',
      DEPLOY_DIR: '/srv/website',
      SITE_URL: 'https://example.com/',
      BASE_PATH: '/',
      ...overrides,
    },
  })
}

test('preview validates a root deployment without invoking SSH or a build', () => {
  const result = preview()
  assert.equal(result.status, 0, result.stderr)
  assert.match(result.stdout, /\/srv\/website\/current/)
})

test('preview supports a matching subdirectory deployment', () => {
  assert.equal(preview({ SITE_URL: 'https://example.com/club/', BASE_PATH: '/club/' }).status, 0)
})

test('accepts a domain-named server directory with a trailing slash', () => {
  const result = preview({ DEPLOY_DIR: '/var/www/portal.example.com/' })
  assert.equal(result.status, 0, result.stderr)
  assert.match(result.stdout, /\/var\/www\/portal\.example\.com\/current/)
})

test('rejects missing connection details and unsafe server paths', () => {
  for (const directory of ['', '/', '/srv', '/srv/../etc', '/srv/site;touch-file']) {
    assert.equal(preview({ DEPLOY_DIR: directory }).status, 1)
  }
  for (const host of ['', '-oProxyCommand=command', 'example;command']) {
    assert.equal(preview({ DEPLOY_HOST: host }).status, 1)
  }
})

test('rejects missing, non-HTTP or credential-bearing public URLs', () => {
  for (const url of ['', 'file:///tmp/site/', 'https://user:secret@example.com/']) {
    assert.equal(preview({ SITE_URL: url }).status, 1)
  }
})

test('rejects a site URL that differs from the built base path', () => {
  assert.equal(preview({ SITE_URL: 'https://example.com/club/' }).status, 1)
})
