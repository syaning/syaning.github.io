<script setup lang="ts">
interface ProjectLink {
  text: string
  href: string
}

interface ProjectItem {
  name: string
  description: string
  links: ProjectLink[]
  cover?: string
}

const { projects } = defineProps<{
  projects: ProjectItem[]
}>()
</script>

<template>
  <div class="projects">
    <article
      v-for="project in projects"
      :key="project.name"
      class="project"
    >
      <div class="project-title-row">
        <span class="project-name">{{ project.name }}</span>
        <div v-if="project.links.length" class="project-links">
          <a
            v-for="link in project.links"
            :key="link.href"
            class="project-link"
            :href="link.href"
            target="_blank"
            rel="noreferrer"
          >{{ link.text }}</a>
        </div>
      </div>

      <p class="project-desc">{{ project.description }}</p>

      <img
        v-if="project.cover"
        class="project-cover"
        :src="project.cover"
        alt=""
        loading="lazy"
        decoding="async"
      />
    </article>
  </div>
</template>

<style scoped>
.projects {
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
  margin: 16px 0 40px;
}

.project {
  display: block;
  max-width: 100%;
}

.project-title-row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem 1rem;
  margin: 0 0 8px;
}

.project-name {
  font-size: 1.05rem;
  line-height: 1.45;
  color: var(--vp-c-text-1);
}

.project-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
}

.project-link {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  text-decoration: none !important;
  transition: color 0.15s ease;
}

.project-link:hover {
  color: var(--vp-c-brand-1);
}

.project-desc {
  margin: 0 0 12px;
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}

.project-cover {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top left;
  border-radius: 2px;
  background-color: var(--vp-c-bg-soft);
  opacity: 0.92;
}
</style>
