// lib/blogData.ts

import { BlogPost } from './types';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js',
    slug: 'getting-started-with-nextjs',
    excerpt: 'A beginner’s guide to building modern web apps with Next.js.',
    content: `
      ## Introduction

      Next.js is a React framework that enables server-side rendering and static site generation for web applications.  This guide will walk you through the basics...

      ## Setting up your project
      \`\`\`bash
      npx create-next-app@latest my-next-app
      cd my-next-app
      npm run dev
      \`\`\`

      ##  Key Features

      * Server-Side Rendering (SSR)
      * Static Site Generation (SSG)
      *  ... (more content)
    `, // Markdown content (example)
    date: '2025-02-01',
    tags: ['Next.js', 'React', 'TypeScript'],
    author: 'Humza Hussain',
  },
  {
    id: '2',
    title: 'Tailwind CSS Tips and Tricks',
    slug: 'tailwind-css-tips',
    excerpt: 'Learn how to make the most of Tailwind CSS in your projects.',
    content: `
      ## Introduction to Tailwind CSS

      Tailwind CSS is a utility-first CSS framework...

      ##  Useful Tailwind Classes
      * \`text-center\`
      * \`bg-blue-500\`
      *  ... (more content)
    `,
    date: '2025-02-15',
    tags: ['CSS', 'Tailwind', 'Web Design'],
    author: 'Humza Hussain',
  },
];