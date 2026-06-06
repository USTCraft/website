import { defineConfig } from 'vitepress'
import { RssPlugin } from 'vitepress-plugin-rss'

// ============================================================
// 部署模式 — 选择一种
// ============================================================
// 'github-pages' — GitHub Pages 子路径部署
// 'root'         — 根域名部署（自有域名 / Vercel / Netlify 等）
// 'relative'     — 全部相对路径，dist 可随意移动（nginx 本地部署等）
const DEPLOY_MODE: 'github-pages' | 'root' | 'relative' = 'github-pages'

// GitHub 信息 — 用于 socialLinks 和 GitHub Pages 模式
const GITHUB_USERNAME = 'Lylighte'
const REPO_NAME = 'pixel-eco'

// 根域名部署时需指定
const CUSTOM_DOMAIN = 'example.com'

// ---- 以下自动推导 ----
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}/${REPO_NAME}`
const IS_DEV = process.argv[2] === 'dev'

let SITE_URL: string
let BASE_PATH: string
let RSS_BASE: string

if (DEPLOY_MODE === 'github-pages') {
  SITE_URL = `https://${GITHUB_USERNAME}.github.io/${REPO_NAME}/`
  BASE_PATH = `/${REPO_NAME}/`
  RSS_BASE = `https://${GITHUB_USERNAME}.github.io`
} else if (DEPLOY_MODE === 'root') {
  SITE_URL = `https://${CUSTOM_DOMAIN}/`
  BASE_PATH = '/'
  RSS_BASE = `https://${CUSTOM_DOMAIN}`
} else {
  // relative
  SITE_URL = ''
  BASE_PATH = './'
  RSS_BASE = ''
}

const SITE_TITLE = 'Pixel Eco - Template Demo'
const SITE_DESCRIPTION = 'A pixel-styled portal template built with VitePress'

export default defineConfig({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: './logo.png' }],

    // SEO
    ...(SITE_URL ? [
      ['meta', { name: 'description', content: SITE_DESCRIPTION }] as any,
      ['meta', { name: 'author', content: 'Pixel Eco Contributors' }] as any,
      ['link', { rel: 'canonical', href: SITE_URL }] as any,
      ['meta', { property: 'og:type', content: 'website' }] as any,
      ['meta', { property: 'og:title', content: SITE_TITLE }] as any,
      ['meta', { property: 'og:description', content: SITE_DESCRIPTION }] as any,
      ['meta', { property: 'og:url', content: SITE_URL }] as any,
      ['meta', { property: 'og:image', content: `${SITE_URL}logo.png` }] as any,
      ['meta', { property: 'og:site_name', content: 'Pixel Eco' }] as any,
      ['meta', { name: 'twitter:card', content: 'summary' }] as any,
      ['meta', { name: 'twitter:title', content: SITE_TITLE }] as any,
      ['meta', { name: 'twitter:description', content: SITE_DESCRIPTION }] as any,
      ['meta', { name: 'twitter:image', content: `${SITE_URL}logo.png` }] as any,
    ] : []),
  ],
  srcExclude: ['dev-notes/**', 'AGENTS.md', 'CHANGELOG.md', 'README.md', 'LICENSE'],
  base: IS_DEV ? '/' : BASE_PATH,
  sitemap: SITE_URL ? {
    hostname: SITE_URL,
  } : undefined,
  markdown: {
    theme: 'github-dark',
  },
  vite: {
    plugins: [
      ...(RSS_BASE ? [RssPlugin({
        title: SITE_TITLE,
        baseUrl: RSS_BASE,
        copyright: '© 2026-Present Pixel Eco. 保留所有权利。',
        filename: 'feed.rss',
        icon: false,
        filter: (post) => post.frontmatter?.category,
      })] : []),
    ],
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '新闻', link: '/news/' },
      { text: '关于', link: '/about' },
      { text: '文档', link: '/docs/' },
    ],
    socialLinks: [
      { icon: 'github', link: GITHUB_URL, text: '仓库地址' } as any,
    ],
    footer: {
      copyright: '© 2026-Present Pixel Eco. 保留所有权利。',
    },
  },
})
