import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import PostLayout from './components/PostLayout.vue'
import NavPage from './components/NavPage.vue'
import './styles/custom.css'

export default {
  ...DefaultTheme,
  Layout() {
    return h(PostLayout)
  },
  enhanceApp({ app }) {
    app.component('NavPage', NavPage)
  }
}
