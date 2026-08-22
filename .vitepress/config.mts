import { buildRss } from './rss'
import { mermaidMarkdown, mermaidPlugin } from 'vitepress-plugin-mermaid-viewer'
import { imagetools } from 'vite-imagetools'

const site = {
  title: 'khronosyn',
  description: "Alex Sun's homepage, blog and notes.",
  author: 'Alex Sun',
  language: 'zh-CN',
  copyrightStartYear: 2013,
}

// VITE_PLATFORM: local | github | cloudflare | oss
const hostnames = {
  local: 'http://localhost:4173',
  github: 'https://syaning.github.io',
  cloudflare: 'https://khronosyn.com',
  oss: 'https://khronosyn.com',
}
const hostname = hostnames[process.env.VITE_PLATFORM] || hostnames.local

const nav = [
  {
    text: 'Tech',
    items: [
      { text: 'Posts', link: '/tech/posts/' },
      { text: 'Talks', link: '/tech/talks/' },
      { text: 'Projects', link: '/tech/projects/' },
      { text: 'Leetcode', link: '/tech/leetcode/' },
    ]
  },
  { text: 'Writing', link: '/writing/' },
  { text: 'Moments', link: '/moments/' },
]

export default {
  title: site.title,
  titleTemplate: false,
  description: site.description,
  base: '/',
  srcDir: 'src',
  lastUpdated: false,
  appearance: true,
  head: [
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: site.title, href: `${hostname}/feed.xml` }],
    ['link', { rel: 'preconnect', href: 'https://cdn.jsdelivr.net', crossorigin: '' }],
    // see https://github.com/chawyehsu/lxgw-wenkai-webfont
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/style.css',
      },
    ],
  ],
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: false,
    nav,
    // Sidebar is supplied from archive.data in theme enhanceApp
    docFooter: {
      prev: 'Prev',
      next: 'Next',
    },
    outline: [2, 3],
    giscus: {
      enabled: true,
      paths: [
        '^/tech/posts/.+',
      ],
      repo: 'syaning/syaning.github.io',
      repoId: 'MDEwOlJlcG9zaXRvcnkzMjM3MjU0Nw==',
      category: 'Blog Comments',
      categoryId: 'DIC_kwDOAe33Q84DD8OL',
      mapping: 'pathname',
      strict: '0',
      reactionsEnabled: '1',
      emitMetadata: '0',
      inputPosition: 'bottom',
      themeLight: 'noborder_light',
      themeDark: 'noborder_dark',
      lang: 'en',
    },
  },
  transformPageData(pageData) {
    const path = pageData.relativePath || ''

    if (pageData.frontmatter.title) {
      pageData.frontmatter.postMeta = true
    }

    if (path.startsWith('writing/')) {
      pageData.frontmatter.sidebar = false
      pageData.frontmatter.aside = false
      pageData.frontmatter.outline = false
    }
  },
  sitemap: {
    hostname,
  },
  async buildEnd(siteConfig) {
    await buildRss({
      outDir: siteConfig.outDir,
      hostname,
      title: site.title,
      description: site.description,
      author: site.author,
      language: site.language,
      copyrightStartYear: site.copyrightStartYear,
    })
  },
  markdown: {
    math: true,
    config(md) {
      mermaidMarkdown(md)
    },
  },
  vite: {
    plugins: [imagetools(), mermaidPlugin()],
  },
}
