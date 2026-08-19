import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import Archive from './components/Archive.vue'
import PostMeta from './components/PostMeta.vue'
import Talks from './components/Talks.vue'
import Projects from './components/Projects.vue'
import Moments from './components/Moments.vue'
import { enhanceMermaid } from 'vitepress-plugin-mermaid-viewer/client'
import { data as archiveData } from './archive.data'
import { toArchiveSidebars } from './archive'
import './styles/custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(PostMeta),
    })
  },
  enhanceApp({ app, siteData }) {
    // Dev wraps @siteData in readonly(), so nested mutation is ignored.
    // Replace the ref value with a plain copy that includes real sidebars.
    const current = siteData.value
    siteData.value = {
      ...current,
      themeConfig: {
        ...current.themeConfig,
        sidebar: toArchiveSidebars(archiveData),
      },
    }

    app.component('Archive', Archive)
    app.component('Talks', Talks)
    app.component('Projects', Projects)
    app.component('Moments', Moments)
    enhanceMermaid(app)
  },
}
