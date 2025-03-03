import { BlogPost } from './types';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js',
    slug: 'getting-started-with-nextjs',
    excerpt: 'A beginner’s guide to building modern web apps with Next.js.',
    content: 'Full content goes here...',
    date: '2025-02-01',
    tags: ['Next.js', 'React', 'TypeScript'],
    author: 'Humza Hussain',
  },
  {
    id: '2',
    title: 'Tailwind CSS Tips and Tricks',
    slug: 'tailwind-css-tips',
    excerpt: 'Learn how to make the most of Tailwind CSS in your projects.',
    content: 'Full content goes here...',
    date: '2025-02-15',
    tags: ['CSS', 'Tailwind', 'Web Design'],
    author: 'Humza Hussain',
  },
];