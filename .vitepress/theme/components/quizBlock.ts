import type { ComputedRef, InjectionKey, Ref } from 'vue'
import { computed, inject, onMounted, onUnmounted, ref, watch } from 'vue'

export type QuizBlockApi = {
  finished: Ref<boolean>
  register: () => number
  unregister: (id: number) => void
  report: (id: number, checked: boolean, correct: boolean) => void
}

export const quizBlockKey: InjectionKey<QuizBlockApi> = Symbol('quiz-block')

export function useQuizItem(
  checked: Ref<boolean>,
  isCorrect: ComputedRef<boolean>
) {
  const block = inject(quizBlockKey, null)
  const id = ref<number | null>(null)
  const finished = computed(() => block?.finished.value ?? false)

  onMounted(() => {
    if (!block) return
    id.value = block.register()
    block.report(id.value, checked.value, isCorrect.value)
  })

  onUnmounted(() => {
    if (block && id.value != null) block.unregister(id.value)
  })

  watch([checked, isCorrect], () => {
    if (block && id.value != null) block.report(id.value, checked.value, isCorrect.value)
  })

  return { finished }
}
