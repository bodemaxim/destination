import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import MultipleChoice from './components/MultipleChoice.vue'
import FillBlank from './components/FillBlank.vue'
import QuizBlock from './components/QuizBlock.vue'
import ExamTasksTable from './components/ExamTasksTable.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('MultipleChoice', MultipleChoice)
    app.component('FillBlank', FillBlank)
    app.component('QuizBlock', QuizBlock)
    app.component('ExamTasksTable', ExamTasksTable)
  }
} satisfies Theme
