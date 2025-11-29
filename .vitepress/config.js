import { filters, sorters, clusters, genSidebar } from './helper'

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
  { text: 'Links', link: '/links/apps' },
]

const sidebar = genSidebar({
  '/tech/posts/': {
    sorter: sorters.byDateDesc,
    cluster: clusters.byYear,
  },
  '/tech/leetcode/': {
    title: 'LeetCode',
    sorter: sorters.byFilenameIndex,
  },
  '/writing/': {
    sorter: sorters.byDateDesc,
    cluster: clusters.byYear,
  },
  '/links/': {
    title: 'Links',
  }
})

export default {
  title: 'khronosyn',
  titleTemplate: false,
  description: 'Alex Sun\'s homepage, blog and notes.',
  base: '/',
  srcDir: 'src',
  lastUpdated: false,
  head: [
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
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
    nav,
    sidebar,
    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/syaning/syaning.github.io' },
    // ],
    footer: {
      copyright: `Copyright &copy; 2013~${new Date().getFullYear()} Alex Sun`,
    },
    outline: [2, 3],
    search: {
      provider: 'local',
    },
  },
  sitemap: {
    hostname: 'https://khronosyn.com',
  },
  markdown: {
    math: true,
  },
}
