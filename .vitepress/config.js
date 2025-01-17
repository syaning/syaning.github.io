import mathjax3 from 'markdown-it-mathjax3'
import { filters, sorters, clusters, genSidebar } from './helper'

const nav = [
  {
    text: 'Tech',
    items: [
      { text: 'Posts', link: '/posts/' },
      { text: 'Speeches', link: '/speeches/' },
      { text: 'Leetcode', link: '/leetcode/' },
    ]
  },
  { text: 'Essay', link: '/essay/' },
  { text: 'Collections', link: '/collections/apps' }
]

const sidebar = {
  ...genSidebar('/posts/', {
    filter: filters.allMdButIndex,
    sorter: sorters.byDateDesc,
    cluster: clusters.byYear,
  }),
  ...genSidebar('/essay/', {
    filter: filters.allMdButIndex,
    sorter: sorters.byDateDesc,
    cluster: clusters.byYear,
  }),
  ...genSidebar('/leetcode/', {
    title: 'LeetCode',
    filter: filters.allMdButIndex,
    sorter: sorters.byFilenameIndex,
  }),
  ...genSidebar('/collections/', {
    title: 'Collections',
  })
}

export default {
  title: '🌵',
  titleTemplate: 'khronosyn',
  description: 'Alex Sun\'s homepage, blog and notes.',
  base: '/',
  srcDir: 'src',
  lastUpdated: false,
  head: [
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    logo: '/logo.svg',
    nav,
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/syaning/syaning.github.io' },
    ],
    footer: {
      copyright: `Copyright &copy; 2013~${new Date().getFullYear()} Alex Sun`
    },
    outline: [2, 3],
    search: {
      provider: 'local'
    }
  },
  sitemap: {
    hostname: 'https://khronosyn.com'
  },
  markdown: {
    config: (md) => {
      md.use(mathjax3)
    },
  },
}
