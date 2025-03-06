import { BlogPost } from './types';
import { generateSlug } from './utils';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js',
    slug: generateSlug('Next.js Basics'), // Updated to a shorter, cleaner slug
    excerpt: 'A beginner’s guide to building modern web apps with Next.js - from a self-taught developer’s perspective.',
    content: `
      ## Introduction
  
      Next.js is a React framework that enables server-side rendering and static site generation for web applications. This guide will walk you through the basics of building modern web apps using Next.js, written from the perspective of a self-taught developer. Whether you're new to web development or looking to level up your skills, Next.js offers a powerful yet approachable way to create fast, scalable applications.
  
      ## Setting up your project
  
      Getting started with Next.js is straightforward. Open your terminal and run the following commands to create a new project:
  
      \`\`\`bash
      npx create-next-app@latest my-next-app
      cd my-next-app
      npm run dev
      \`\`\`
  
      This will scaffold a new Next.js project, navigate into the project directory, and start the development server. Visit \`http://localhost:3000\` in your browser to see your app in action!
  
      ## Key Features
  
      Next.js shines because of its powerful features, which simplify web development without sacrificing flexibility. Here are some highlights:
  
      * **Server-Side Rendering (SSR):** Render pages on the server for faster initial page loads and better SEO.
      * **Static Site Generation (SSG):** Pre-render pages at build time for lightning-fast performance and scalability.
      * **File-based Routing:** Create pages effortlessly by adding files to the \`pages\` directory—no complex routing configuration needed.
      * **API Routes:** Build backend functionality directly within your Next.js app using API routes.
  
      These features make Next.js an excellent choice for both small projects and large-scale applications. As a self-taught developer, I’ve found its simplicity and built-in tools incredibly empowering for learning and building real-world apps.
  
      ## Why Next.js?
  
      From my experience, Next.js strikes a balance between ease of use and advanced capabilities. It abstracts away much of the complexity of setting up a React app (like configuring Webpack or handling SSR yourself) while still giving you full control when you need it. Plus, the community and documentation are top-notch—perfect for beginners figuring things out on their own.
  
      Stay tuned for more in-depth sections in this guide, where I’ll cover building your first page, fetching data, and deploying your app!
    `,
    date: '2025-02-01',
    tags: ['Next.js', 'React', 'TypeScript'],
    author: 'Humza Hussain',
  },
  {
    id: '2',
    title: 'Tailwind CSS Tips and Tricks',
    slug: generateSlug('Tailwind Tips'), // Updated to a shorter, cleaner slug
    excerpt: 'Learn how to make the most of Tailwind CSS in your projects.',
    content: `
      ## Introduction to Tailwind CSS

      Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML. It’s incredibly flexible and speeds up development by providing a set of pre-designed utility classes. In this post, I’ll share some tips and tricks to help you maximize its potential in your projects.

      ## Useful Tailwind Classes

      Here are some of my favorite Tailwind classes to get you started:

      * \`text-center\`: Aligns text to the center—perfect for headings or buttons.
      * \`bg-blue-500\`: Sets a vibrant blue background color with a mid-range shade.
      * \`p-4\`: Adds padding on all sides (1rem by default).
      * \`hover:bg-gray-700\`: Changes the background to a dark gray on hover—great for interactive elements.

      ## Customizing Tailwind

      Want to go beyond the defaults? You can extend Tailwind by editing the \`tailwind.config.js\` file. For example, add custom colors like this:

      \`\`\`javascript
      module.exports = {
        theme: {
          extend: {
            colors: {
              'custom-blue': '#1E3A8A',
            },
          },
        },
      };
      \`\`\`

      Then use it in your project with \`bg-custom-blue\`! Stay tuned for more advanced tips in future posts.
    `,
    date: '2025-02-15',
    tags: ['CSS', 'Tailwind', 'Web Design'],
    author: 'Humza Hussain',
  },
  {
    id: '3',
    title: 'Understanding Python PEP 8 Standards',
    slug: generateSlug('Python PEP 8'), // Short, clean slug
    excerpt: 'A practical guide to writing clean, readable Python code with PEP 8 standards.',
    content: `
      ## Introduction

      PEP 8 is Python’s official style guide, designed to improve the readability and consistency of Python code. As a self-taught programmer, I’ve found adhering to PEP 8 to be a game-changer for writing clean, professional code that others (and future me) can easily understand. In this post, I’ll break down the key principles of PEP 8 and share practical examples.

      ## Core Guidelines

      Here are some essential PEP 8 rules to follow:

      * **Indentation:** Use 4 spaces per indentation level (no tabs!).
      * **Line Length:** Limit lines to 79 characters for better readability.
      * **Naming Conventions:** Use \`snake_case\` for variables and functions, \`CamelCase\` for classes.
      * **Whitespace:** Add a single space around operators (e.g., \`x = 5\` instead of \`x=5\`) and after commas.

      ## Example Code

      Here’s a quick before-and-after example:

      **Before (Messy Code):**
      \`\`\`python
      def calculateTotal(x,y):return x+y
      myList=[1,2,3]
      \`\`\`

      **After (PEP 8 Compliant):**
      \`\`\`python
      def calculate_total(x, y):
          return x + y

      my_list = [1, 2, 3]
      \`\`\`

      The second version is much easier to read, right? Proper spacing, meaningful names, and consistent indentation make a huge difference.

      ## Why PEP 8 Matters

      Following PEP 8 isn’t just about rules—it’s about collaboration and maintainability. When your code is consistent and readable, it’s easier to debug, share with others, or revisit months later. For beginners like me, it’s also a great way to build good habits early on. Stick around for more Python tips in future posts!
    `,
    date: '2025-03-01',
    tags: ['Python', 'PEP 8', 'Programming'],
    author: 'Humza Hussain',
  },
];