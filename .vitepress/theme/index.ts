import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import MultipleChoice from './components/MultipleChoice.vue'
import FillBlank from './components/FillBlank.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('MultipleChoice', MultipleChoice)
    app.component('FillBlank', FillBlank)
  }
} satisfies Theme
