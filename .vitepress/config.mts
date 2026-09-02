import { defineConfig } from 'vitepress'

export default defineConfig({
  srcDir: 'destination-b2-textbook',
  base: process.env.GITHUB_ACTIONS ? '/destination/' : '/',
  title: 'Destination B2',
  description: 'English notes and practice',
  themeConfig: {
    nav: [
      { text: 'Exam tasks', link: '/exam-tasks' },
      { text: 'Home', link: '/' },
      { text: 'Unit 2', link: '/02-travel-and-transport/01-vocab' },
      { text: 'Unit 4', link: '/04-hobbies-sport-and-games/01-vocab' },
      { text: 'Unit 6', link: '/06-science-and-technology/01-vocab' },
      { text: 'Unit 8', link: '/08-the-media/01-vocab' },
      { text: 'Unit 10', link: '/10-people-and-society/01-vocab' }
    ],
    sidebar: [
      { text: 'Exam tasks', link: '/exam-tasks' },
      {
        text: 'Unit 2 · Travel and transport',
        items: [
          { text: 'Vocabulary', link: '/02-travel-and-transport/01-vocab' },
          { text: 'Vocabulary guide', link: '/02-travel-and-transport/02-vocab-guide' },
          { text: 'Extra tasks', link: '/02-travel-and-transport/03-extra-tasks' }
        ]
      },
      {
        text: 'Unit 4 · Hobbies, sport and games',
        items: [
          { text: 'Vocabulary', link: '/04-hobbies-sport-and-games/01-vocab' },
          { text: 'Vocabulary guide', link: '/04-hobbies-sport-and-games/02-vocab-guide' },
          { text: 'Extra tasks', link: '/04-hobbies-sport-and-games/03-extra-tasks' }
        ]
      },
      {
        text: 'Unit 6 · Science and technology',
        items: [
          { text: 'Vocabulary', link: '/06-science-and-technology/01-vocab' },
          { text: 'Vocabulary guide', link: '/06-science-and-technology/02-vocab-guide' },
          { text: 'Extra tasks', link: '/06-science-and-technology/03-extra-tasks' }
        ]
      },
      {
        text: 'Unit 8 · The media',
        items: [
          { text: 'Vocabulary', link: '/08-the-media/01-vocab' },
          { text: 'Vocabulary guide', link: '/08-the-media/02-vocab-guide' },
          { text: 'Extra tasks', link: '/08-the-media/03-extra-tasks' }
        ]
      },
      {
        text: 'Unit 10 · People and society',
        items: [
          { text: 'Vocabulary', link: '/10-people-and-society/01-vocab' },
          { text: 'Vocabulary guide', link: '/10-people-and-society/02-vocab-guide' },
          { text: 'Extra tasks', link: '/10-people-and-society/03-extra-tasks' }
        ]
      }
    ]
  }
})
