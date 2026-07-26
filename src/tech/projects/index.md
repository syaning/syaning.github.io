---
aside: false
lastUpdated: false
sidebar: false
---

<script setup>
import teaCover from './img/tea-idle.png'
import slimCover from './img/slim-demo.png'

const projects = [
  {
    name: 'Tea',
    description: 'An ultra-lightweight macOS menu bar app to keep your Mac awake.',
    links: [
      { text: 'GitHub', href: 'https://github.com/syaning/Tea' },
      { text: 'Releases', href: 'https://github.com/syaning/Tea/releases' },
    ],
    cover: teaCover,
  },
  {
    name: 'slim',
    description: 'A slim Jekyll theme with only the essentials.',
    links: [
      { text: 'GitHub', href: 'https://github.com/syaning/slim' },
      { text: 'Demo', href: 'https://syaning.github.io/slim/' },
    ],
    cover: slimCover,
  },
]
</script>

<Projects :projects="projects" />
