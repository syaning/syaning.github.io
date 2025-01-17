import DefaultTheme from 'vitepress/theme'
import PostLayout from './components/PostLayout.vue'
import IconCalendar from './components/icons/IconCalendar.vue'
import IconLocation from './components/icons/IconLocation.vue'
import IconUsers from './components/icons/IconUsers.vue'
import NavPage from './components/NavPage.vue'
import './styles/custom.css'

export default {
  extends: DefaultTheme,
  Layout: PostLayout,
  enhanceApp({ app }) {
    app.component('IconCalendar', IconCalendar)
    app.component('IconLocation', IconLocation)
    app.component('IconUsers', IconUsers)
    app.component('NavPage', NavPage)
  }
}
