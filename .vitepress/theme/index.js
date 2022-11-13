import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import PostLayout from './PostLayout.vue'
import './custom.css'

export default {
  ...DefaultTheme,
  Layout() {
    return h(PostLayout)
  }
}
