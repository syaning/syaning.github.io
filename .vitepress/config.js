import sidebar from './sidebar'
import mathjax3 from 'markdown-it-mathjax3'

const nav = [{
  text: '💻 My',
  items: [
    { text: 'Posts', link: '/posts/' },
    { text: 'Speeches', link: '/speeches/' }
  ]
}, {
  text: '📒 Notes',
  items: [
    { text: 'Kubernetes', link: '/notes/kubernetes/' },
    { text: 'Leetcode', link: '/notes/leetcode/' },
    { text: 'Archived', link: '/notes/archived/' }
  ]
}, {
  text: '❤️ Favorites',
  items: [
    { text: 'Bookmarks', link: '/favorites/bookmarks/' },
    { text: 'macOS Apps', link: '/favorites/apps/' }
  ]
}]

export default {
  title: '🌵',
  titleTemplate: 'Alex Sun\'s Homepage',
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
  markdown: {
    config: (md) => {
      md.use(mathjax3)
    },
  },
}
