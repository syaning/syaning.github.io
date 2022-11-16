<template>
  <div v-for="{ text, items } in postCollections">
    <h1>{{ text }}</h1>
    <ul>
      <li v-for="post in items">
        <a :href="post.link">{{ post.text }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { useData } from 'vitepress'

export default {
  props: {
    navPath: String
  },
  computed: {
    postCollections() {
      const data = useData()
      return data.theme.value.sidebar[this.navPath] || []
    }
  }
}
</script>

