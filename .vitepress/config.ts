import { defineConfig } from 'vitepress'
import { RssPlugin } from 'vitepress-plugin-rss'

// 站点基础信息
// SITE_URL 用于 SEO 和社交媒体预览，确保它与你部署站点的 URL 匹配
// SITE_URL 必须以斜杠结尾
const SITE_URL = 'https://lylighte.github.io/pixel-eco/'
const SITE_ROOT = 'https://lylighte.github.io'
const SITE_TITLE = 'Pixel Eco - Template Demo'
const SITE_DESCRIPTION = 'A pixel-styled portal template built with VitePress'

const IS_DEV = process.argv[2] === 'dev'

export default defineConfig({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  head: [
    // 需与 base 配置保持同步
    ['link', { rel: 'icon', type: 'image/png', href: '/pixel-eco/logo.png' }],

    // SEO
    ['meta', { name: 'description', content: SITE_DESCRIPTION }],
    ['meta', { name: 'author', content: 'Pixel Eco Contributors' }],
    ['link', { rel: 'canonical', href: SITE_URL }],

    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: SITE_TITLE }],
    ['meta', { property: 'og:description', content: SITE_DESCRIPTION }],
    ['meta', { property: 'og:url', content: SITE_URL }],
    ['meta', { property: 'og:image', content: `${SITE_URL}logo.png` }],
    ['meta', { property: 'og:site_name', content: 'Pixel Eco' }],

    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: SITE_TITLE }],
    ['meta', { name: 'twitter:description', content: SITE_DESCRIPTION }],
    ['meta', { name: 'twitter:image', content: `${SITE_URL}logo.png` }],
  ],
  srcExclude: ['dev-notes/**', 'AGENTS.md', 'CHANGELOG.md', 'README.md', 'LICENSE'],
  base: IS_DEV ? '/' : '/pixel-eco/',
  sitemap: {
    hostname: SITE_URL,
  },
  markdown: {
    theme: 'github-dark',
  },
  vite: {
    plugins: [
      RssPlugin({
        title: SITE_TITLE,
        baseUrl: SITE_ROOT,
        copyright: '© 2026-Present Pixel Eco. 保留所有权利。',
        filename: 'feed.rss',
        icon: false,
        filter: (post) => post.frontmatter?.category,
      }),
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
      { icon: 'github', link: 'https://github.com/Lylighte/pixel-eco', text: '仓库地址' } as any,
    ],
    footer: {
      copyright: '© 2026-Present Pixel Eco. 保留所有权利。',
    },
  },
})
