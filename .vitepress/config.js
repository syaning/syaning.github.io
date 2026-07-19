import { sorters, genSidebar } from './helper'

const nav = [
  {
    text: 'Tech',
    items: [
      { text: 'Posts', link: '/tech/posts/' },
      { text: 'Talks', link: '/tech/talks/' },
      { text: 'Leetcode', link: '/tech/leetcode/' },
    ]
  },
  { text: 'Writing', link: '/writing/' },
  { text: 'Moments', link: '/moments/' },
  { text: 'Links', link: '/links/' },
]

const sidebar = genSidebar({
  '/tech/posts/': {
    sorter: sorters.byDateDesc,
  },
  '/tech/leetcode/': {
    title: 'LeetCode',
    sorter: sorters.byFilenameIndex,
  },
  '/writing/': {
    sorter: sorters.byDateDesc,
  },
})

export default {
  title: 'khronosyn',
  titleTemplate: false,
  description: 'Alex Sun\'s homepage, blog and notes.',
  base: '/',
  srcDir: 'src',
  lastUpdated: false,
  appearance: true,
  head: [
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
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
    sidebar,
    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/syaning/syaning.github.io' },
    // ],
    footer: {
      copyright: `Copyright &copy; 2013~${new Date().getFullYear()} Alex Sun`,
    },
    docFooter: {
      prev: 'Prev',
      next: 'Next',
    },
    outline: [2, 3],
    search: {
      provider: 'local',
    },
  },
  transformPageData(pageData) {
    const path = pageData.relativePath || ''
    if (path.startsWith('writing/') && path !== 'writing/index.md') {
      pageData.frontmatter.sidebar = false
      pageData.frontmatter.aside = false
      pageData.frontmatter.outline = false
    }
  },
  sitemap: {
    hostname: 'https://khronosyn.com',
  },
  markdown: {
    math: true,
  },
}
