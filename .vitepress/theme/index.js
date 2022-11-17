import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import PostLayout from './components/PostLayout.vue'
import NavPage from './components/NavPage.vue'
import Speeches from './components/Speeches.vue'
import IconCalendar from './components/icons/IconCalendar.vue'
import IconLocation from './components/icons/IconLocation.vue'
import IconUsers from './components/icons/IconUsers.vue'
import './styles/custom.css'

export default {
  ...DefaultTheme,
  Layout() {
    return h(PostLayout)
  },
  enhanceApp({ app }) {
    app.component('NavPage', NavPage)
    app.component('Speeches', Speeches)
    app.component('IconCalendar', IconCalendar)
    app.component('IconLocation', IconLocation)
    app.component('IconUsers', IconUsers)
  }
}
