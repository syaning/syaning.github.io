import DefaultTheme from 'vitepress/theme'
import { Icon } from '@iconify/vue'
import NavPage from './components/NavPage.vue'
import PostLayout from './components/PostLayout.vue'
import './styles/custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Icon', Icon)
    app.component('NavPage', NavPage)
    app.component('post', PostLayout)
  }
}
