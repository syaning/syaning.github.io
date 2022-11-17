<template>
  <div v-for="{ text, items } in collections">
    <h1>{{ text }}</h1>
    <ul>
      <li v-for="item in items">
        <a v-if="item.link" :href="item.link">{{ item.text }}</a>
        <template v-if="item.items">
          <div>{{ item.text }}</div>
          <ul>
            <li v-for="subItem in item.items">
              <a :href="subItem.link">{{ subItem.text }}</a>
            </li>
          </ul>
        </template>
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
    collections() {
      const data = useData()
      return data.theme.value.sidebar[this.navPath] || []
    }
  }
}
</script>

