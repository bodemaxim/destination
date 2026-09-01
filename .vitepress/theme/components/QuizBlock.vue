<script setup lang="ts">
import { computed, provide, reactive, ref } from 'vue'
import { quizBlockKey } from './quizBlock'

const props = defineProps<{
  unit: string
  exercise: string
}>()

let nextId = 0
const items = reactive(new Map<number, { checked: boolean; correct: boolean }>())
const finished = ref(false)

const total = computed(() => items.size)
const correct = computed(
  () => [...items.values()].filter((item) => item.checked && item.correct).length
)
const checkedCount = computed(() => [...items.values()].filter((item) => item.checked).length)
const allChecked = computed(() => total.value > 0 && checkedCount.value === total.value)

provide(quizBlockKey, {
  finished,
  register() {
    const id = ++nextId
    items.set(id, { checked: false, correct: false })
    return id
  },
  unregister(id) {
    items.delete(id)
  },
  report(id, checked, isCorrect) {
    if (finished.value) return
    const item = items.get(id)
    if (item) {
      item.checked = checked
      item.correct = isCorrect
    }
  }
})

function finish() {
  if (!allChecked.value || finished.value) return
  finished.value = true
}
</script>

<template>
  <div class="quiz-block">
    <slot />
    <div class="quiz-score" :class="{ locked: finished }">
      <p class="quiz-score-label">{{ unit }} / {{ exercise }}</p>
      <p class="quiz-score-value">Score: {{ correct }}/{{ total }}</p>
      <p v-if="!finished && !allChecked" class="quiz-score-hint">
        Check every item, then Finish to lock the score for a screenshot.
      </p>
      <button
        v-if="!finished"
        type="button"
        class="quiz-btn"
        :disabled="!allChecked"
        @click="finish"
      >
        Finish
      </button>
      <p v-else class="quiz-score-hint">Great job! Screenshot this box as proof.</p>
    </div>
  </div>
</template>

<style scoped>
.quiz-score {
  margin: 1.5rem 0 2rem;
  padding: 1.15rem 1.25rem;
  border: 2px solid var(--vp-c-brand-1);
  border-radius: 12px;
  background: var(--vp-c-bg);
}

.quiz-score.locked {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--vp-c-brand-1) 25%, transparent);
}

.quiz-score-label {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.quiz-score-value {
  margin: 0.45rem 0 0;
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  line-height: 1.2;
}

.quiz-score-hint {
  margin: 0.65rem 0 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.quiz-btn {
  margin-top: 0.85rem;
  padding: 0.4rem 0.95rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
  cursor: pointer;
}

.quiz-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
