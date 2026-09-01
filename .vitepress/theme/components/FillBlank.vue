<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  sentence?: string
  answer: string | string[]
}>()

const value = ref('')
const checked = ref(false)

const parts = computed(() => (props.sentence ?? '').split('___'))

const accepted = computed(() =>
  (Array.isArray(props.answer) ? props.answer : [props.answer]).map(normalize)
)

function normalize(text: string) {
  return text.trim().toLowerCase().replace(/\s+/g, ' ')
}

const isCorrect = computed(
  () => checked.value && accepted.value.includes(normalize(value.value))
)

const canonical = computed(() =>
  Array.isArray(props.answer) ? props.answer[0] : props.answer
)

function check() {
  if (!value.value.trim()) return
  checked.value = true
}

function reset() {
  value.value = ''
  checked.value = false
}
</script>

<template>
  <div class="quiz quiz-fill" :class="{ 'is-correct': isCorrect, 'is-wrong': checked && !isCorrect }">
    <p class="quiz-sentence">
      <template v-if="sentence">
        <template v-for="(part, index) in parts" :key="index">
          <span>{{ part }}</span>
          <input
            v-if="index < parts.length - 1"
            v-model="value"
            class="quiz-input"
            type="text"
            autocomplete="off"
            spellcheck="false"
            :disabled="checked"
            :aria-label="sentence"
            @keydown.enter="check"
          />
        </template>
      </template>
      <slot v-else />
    </p>
    <div v-if="!sentence" class="quiz-input-row">
      <input
        v-model="value"
        class="quiz-input"
        type="text"
        autocomplete="off"
        spellcheck="false"
        :disabled="checked"
        @keydown.enter="check"
      />
    </div>
    <div class="quiz-actions">
      <button type="button" class="quiz-btn" :disabled="!value.trim() || checked" @click="check">
        Check
      </button>
      <button v-if="checked" type="button" class="quiz-btn quiz-btn-ghost" @click="reset">
        Try again
      </button>
    </div>
    <p v-if="checked" class="quiz-feedback" :class="isCorrect ? 'ok' : 'bad'">
      {{ isCorrect ? 'Correct.' : `The answer is “${canonical}”.` }}
    </p>
  </div>
</template>

<style scoped>
.quiz {
  margin: 1.25rem 0;
  padding: 1rem 1.1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}

.quiz-sentence {
  margin: 0;
  line-height: 1.8;
}

.quiz-input {
  display: inline-block;
  min-width: 8.5rem;
  margin: 0 0.25rem;
  padding: 0.15rem 0.4rem;
  border: none;
  border-bottom: 2px solid var(--vp-c-brand-1);
  background: transparent;
  color: var(--vp-c-text-1);
  font: inherit;
}

.quiz-input:disabled {
  opacity: 0.85;
}

.quiz-input-row {
  margin-top: 0.6rem;
}

.quiz-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.85rem;
}

.quiz-btn {
  padding: 0.35rem 0.8rem;
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

.quiz-btn-ghost {
  background: transparent;
  color: var(--vp-c-brand-1);
}

.quiz-feedback {
  margin: 0.7rem 0 0;
  font-size: 0.95rem;
}

.quiz-feedback.ok {
  color: var(--vp-c-brand-1);
}

.quiz-feedback.bad {
  color: var(--vp-c-text-2);
}
</style>
