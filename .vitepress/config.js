import sidebar from './sidebar'
import mathjax3 from 'markdown-it-mathjax3'

const nav = [{
  text: '💻 My',
  items: [
    { text: 'Posts', link: '/my/post/' },
    { text: 'Speeches', link: '/my/speech/' }
  ]
}, {
  text: '📒 Notes',
  items: [
    { text: 'Kubernetes', link: '/notes/kubernetes/' },
    { text: 'Rust', link: '/notes/rust/' },
    { text: 'Leetcode', link: '/notes/leetcode/' },
    { text: 'Archived', link: '/notes/archived/' }
  ]
}, {
  text: '❤️ Favorites',
  items: [
    { text: 'Bookmarks', link: '/favorites/bookmark/' },
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
    outline: [2, 3]
  },
  markdown: {
    config: (md) => {
      md.use(mathjax3)
    },
  },
}
