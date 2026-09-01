<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  question: string
  options: string[]
  answer: string
}>()

const selected = ref<string | null>(null)
const checked = ref(false)

const isCorrect = computed(
  () => checked.value && selected.value === props.answer
)

function check() {
  if (selected.value == null) return
  checked.value = true
}

function reset() {
  selected.value = null
  checked.value = false
}
</script>

<template>
  <div class="quiz quiz-mc" :class="{ 'is-correct': isCorrect, 'is-wrong': checked && !isCorrect }">
    <p class="quiz-question">{{ question }}</p>
    <div class="quiz-options" role="radiogroup">
      <label
        v-for="option in options"
        :key="option"
        class="quiz-option"
        :class="{
          selected: selected === option,
          correct: checked && option === answer,
          wrong: checked && selected === option && option !== answer
        }"
      >
        <input
          type="radio"
          :name="question"
          :value="option"
          :disabled="checked"
          :checked="selected === option"
          @change="selected = option"
        />
        <span>{{ option }}</span>
      </label>
    </div>
    <div class="quiz-actions">
      <button type="button" class="quiz-btn" :disabled="selected == null || checked" @click="check">
        Check
      </button>
      <button v-if="checked" type="button" class="quiz-btn quiz-btn-ghost" @click="reset">
        Try again
      </button>
    </div>
    <p v-if="checked" class="quiz-feedback" :class="isCorrect ? 'ok' : 'bad'">
      {{ isCorrect ? 'Correct.' : `The answer is “${answer}”.` }}
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

.quiz-question {
  margin: 0 0 0.75rem;
  font-weight: 600;
}

.quiz-options {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.quiz-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.55rem;
  border-radius: 8px;
  cursor: pointer;
}

.quiz-option.selected {
  background: var(--vp-c-bg-alt);
}

.quiz-option.correct {
  background: color-mix(in srgb, var(--vp-c-brand-1) 18%, transparent);
}

.quiz-option.wrong {
  background: color-mix(in srgb, #e11 16%, transparent);
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
