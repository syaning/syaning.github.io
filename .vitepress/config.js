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
  { text: 'Links', link: '/links/' },
]

const sidebar = genSidebar({
  '/tech/posts/': {
    sorter: sorters.byDateDesc,
    dirs: [
      '2026', '2025', '2023', '2022', '2021', '2020',
      '2019', '2018', '2017', '2016', '2015',
    ],
  },
  '/tech/leetcode/': {
    title: 'LeetCode',
    sorter: sorters.byFilenameIndex,
  },
  '/writing/': {
    sorter: sorters.byDateDesc,
    cluster: clusters.byYear,
  },
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
