import DefaultTheme from 'vitepress/theme'
import { Icon } from '@iconify/vue'
import PostLayout from './components/PostLayout.vue'
import NavPage from './components/NavPage.vue'
import './styles/custom.css'

export default {
  extends: DefaultTheme,
  Layout: PostLayout,
  enhanceApp({ app }) {
    app.component('Icon', Icon)
    app.component('NavPage', NavPage)
  }
}
