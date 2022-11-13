---
aside: false
lastUpdated: false
---

<script setup>
import { VPTeamMembers } from 'vitepress/theme'
import avatar from './img/avatar.jpg'

const homeIcon = '<svg width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16.612 2.214a1.01 1.01 0 0 0-1.242 0L1 13.419l1.243 1.572L4 13.621V26a2.004 2.004 0 0 0 2 2h20a2.004 2.004 0 0 0 2-2V13.63L29.757 15L31 13.428ZM18 26h-4v-8h4Zm2 0v-8a2.002 2.002 0 0 0-2-2h-4a2.002 2.002 0 0 0-2 2v8H6V12.062l10-7.79l10 7.8V26Z"/></svg>'
const bilibiliIcon = '<svg width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574c1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76c1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373c.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373c.347 0 .662.151.929.4c.267.249.391.551.391.907c0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773c-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893c.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773c.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894c-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373c.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96c-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947c.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373c.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96c-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96c.249-.249.56-.373.933-.373Z"/></svg>'

const members = [
  {
    avatar,
    name: 'Alex Sun',
    title: 'syaningv(at)gmail.com',
    links: [
      { icon: { svg: homeIcon }, link: 'https://syaning.github.io' },
      { icon: 'github', link: 'https://github.com/syaning' },
      { icon: { svg: bilibiliIcon }, link: 'https://space.bilibili.com/501788540' },
    ]
  }
]
</script>

### About

Hi there~ 🍀

<VPTeamMembers size="small" :members="members" />

### Experience

- 2020.06~Present, [Alibaba Cloud](https://www.aliyun.com/)
- 2018.07~2020.06, [YITU](http://www.yitutech.com/)
- 2017.04~2018.06, [Eleme](https://www.ele.me/)
- 2015.07~2017.03, [SAP Labs China](https://www.sap.com/china/index.html)
- 2011.09~2015.06, [Software School](http://www.software.fudan.edu.cn/), [Fudan University](https://www.fudan.edu.cn/)
