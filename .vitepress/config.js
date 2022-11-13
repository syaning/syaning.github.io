import sidebar from './sidebar'
import mathjax3 from 'markdown-it-mathjax3'

const nav = [{
  text: '💻 My',
  items: [
    { text: 'Posts', link: '/my/post' },
    { text: 'Speeches', link: '/my/speech' }
  ]
}, {
  text: '📒 Notes',
  items: [
    { text: 'Kubernetes', link: '/notes/kubernetes/resources/node' },
    { text: 'Leetcode', link: '/notes/leetcode/1' },
    { text: 'Archived', link: '/notes/archived/' }
  ]
}, {
  text: '❤️ Favorites',
  items: [
    { text: 'Bookmarks', link: '/favorites/bookmark/ebook' },
    { text: 'macOS Apps', link: '/favorites/apps/' }
  ]
}]

export default {
  title: '🌵',
  base: '/',
  srcDir: 'src',
  lastUpdated: false,
  themeConfig: {
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
