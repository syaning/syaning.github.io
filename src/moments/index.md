---
sidebar: false
aside: false
---

<script setup>
import { moments, ensureMomentImage } from './moments'
</script>

<Moments :moments="moments" :resolve-image="ensureMomentImage" />
