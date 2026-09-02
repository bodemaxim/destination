<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { examTasks } from '../data/examTasks'

const open = ref(false)
const wrap = ref<HTMLElement | null>(null)
const selected = ref<string[]>([])

const topics = computed(() =>
  [...new Set(examTasks.map((task) => task.topic))].sort((a, b) =>
    a.localeCompare(b)
  )
)

const rows = computed(() => {
  if (selected.value.length === 0) return examTasks
  const set = new Set(selected.value)
  return examTasks.filter((task) => set.has(task.topic))
})

function toggleOpen() {
  open.value = !open.value
}

function toggleTopic(topic: string) {
  if (selected.value.includes(topic)) {
    selected.value = selected.value.filter((item) => item !== topic)
    return
  }
  selected.value = [...selected.value, topic]
}

function clearTopics() {
  selected.value = []
}

function onDocClick(event: MouseEvent) {
  if (!wrap.value?.contains(event.target as Node)) open.value = false
}

function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape') open.value = false
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})

onUnmounted(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div class="exam-tasks">
    <div ref="wrap" class="exam-filter">
      <button
        type="button"
        class="topic-chip"
        :class="{ active: selected.length > 0 || open }"
        :aria-expanded="open"
        aria-haspopup="listbox"
        @click.stop="toggleOpen"
      >
        Topic
        <span v-if="selected.length" class="topic-count">{{ selected.length }}</span>
      </button>
      <div v-if="open" class="topic-menu" role="listbox" @click.stop>
        <button v-if="selected.length" type="button" class="topic-clear" @click="clearTopics">
          Clear
        </button>
        <label v-for="topic in topics" :key="topic" class="topic-option">
          <input
            type="checkbox"
            :checked="selected.includes(topic)"
            @change="toggleTopic(topic)"
          />
          <span>{{ topic }}</span>
        </label>
      </div>
    </div>

    <div class="exam-table-wrap">
      <table class="exam-table">
        <thead>
          <tr>
            <th>Variant</th>
            <th>Topic</th>
            <th>Type</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in rows" :key="index">
            <td>{{ task.variant }}</td>
            <td>{{ task.topic }}</td>
            <td>{{ task.type }}</td>
            <td>{{ task.number }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="exam-count">{{ rows.length }} task{{ rows.length === 1 ? '' : 's' }}</p>
  </div>
</template>

<style scoped>
.exam-filter {
  position: relative;
  display: inline-block;
  margin: 0 0 1.1rem;
}

.topic-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.28rem 0.75rem;
  border: 1px solid transparent;
  border-radius: 999px;
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
  font: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
}

.topic-chip.active {
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--vp-c-brand-1) 35%, transparent);
}

.topic-count {
  min-width: 1.15rem;
  padding: 0 0.28rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--vp-c-bg) 22%, transparent);
  font-size: 0.78rem;
  text-align: center;
}

.topic-menu {
  position: absolute;
  z-index: 20;
  top: calc(100% + 0.4rem);
  left: 0;
  min-width: 16.5rem;
  max-height: 22rem;
  overflow: auto;
  padding: 0.45rem 0.35rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg);
  box-shadow: var(--vp-shadow-3);
}

.topic-clear {
  display: block;
  width: 100%;
  margin: 0 0 0.35rem;
  padding: 0.2rem 0.4rem;
  border: none;
  background: transparent;
  color: var(--vp-c-brand-1);
  font: inherit;
  font-size: 0.85rem;
  text-align: left;
  cursor: pointer;
}

.topic-option {
  display: flex;
  align-items: flex-start;
  gap: 0.45rem;
  padding: 0.28rem 0.4rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  line-height: 1.35;
}

.topic-option:hover {
  background: var(--vp-c-bg-soft);
}

.exam-table-wrap {
  overflow-x: auto;
}

.exam-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.exam-table th,
.exam-table td {
  padding: 0.5rem 0.7rem;
  border-bottom: 1px solid var(--vp-c-divider);
  text-align: left;
  vertical-align: top;
}

.exam-table th {
  font-weight: 600;
  background: var(--vp-c-bg-soft);
}

.exam-count {
  margin: 0.75rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}
</style>
