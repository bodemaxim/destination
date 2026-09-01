import { defineConfig } from 'vitepress'

export default defineConfig({
  srcDir: 'destination-b2-textbook',
  title: 'Destination B2',
  description: 'English notes and practice',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Unit 2', link: '/02-travel-and-transport/01-vocab' }
    ],
    sidebar: [
      {
        text: 'Unit 2 · Travel and transport',
        items: [
          { text: 'Vocabulary', link: '/02-travel-and-transport/01-vocab' },
          { text: 'Vocabulary guide', link: '/02-travel-and-transport/02-vocab-guide' },
          { text: 'Extra tasks', link: '/02-travel-and-transport/03-extra-tasks' }
        ]
      }
    ]
  }
})
