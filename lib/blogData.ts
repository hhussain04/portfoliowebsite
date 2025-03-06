import { BlogPost } from './types';
import { generateSlug } from './utils';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js',
    slug: generateSlug('Next.js Basics'),
    excerpt: 'A beginner’s guide to building modern web apps with Next.js - from a self-taught developer’s perspective.',
    content: {
      sections: [
        {
          heading: { level: 2, text: 'Introduction' },
          paragraphs: [
            'Next.js is a powerful React framework that brings server-side rendering (SSR) and static site generation (SSG) to the table, making it a go-to choice for developers building modern, performant web applications. As a self-taught developer, I’ve found Next.js to be an incredible tool for creating fast, scalable, and SEO-friendly apps without drowning in configuration headaches. In this guide, I’ll walk you through the essentials of getting started with Next.js, sharing insights from my own journey of learning and experimenting with this framework. Whether you’re just dipping your toes into web development or looking to improve your skills, this post will give you a solid foundation to kick off your Next.js adventure.',
            'We’ll cover everything from setting up your first project to exploring its standout features, all explained in a way that cuts through the jargon and gets to the heart of why Next.js is worth your time. Let’s dive in!',
          ],
        },
        {
          heading: { level: 2, text: 'Setting up your project' },
          paragraphs: [
            'Starting a Next.js project is refreshingly simple, even if you’re new to the ecosystem. Open your terminal and run these commands to get up and running:',
            'Here’s what’s happening: `npx create-next-app@latest my-next-app` scaffolds a new project with all the necessary files and dependencies. The `cd my-next-app` command moves you into the project folder, and `npm run dev` fires up the development server. Head to `http://localhost:3000` in your browser, and voilà—you’ll see the default Next.js welcome page! From here, you can start tweaking files in the `pages` directory to see your changes reflected instantly thanks to Next.js’s hot reloading.',
            'Pro tip: If you prefer TypeScript (and I recommend you give it a go for better code safety), add the `--typescript` flag when creating your app: `npx create-next-app@latest my-next-app --typescript`. It’s a small step that pays off big time as your projects grow.',
          ],
          codeBlocks: [
            {
              language: 'bash',
              code: `npx create-next-app@latest my-next-app
cd my-next-app
npm run dev`,
            },
          ],
        },
        {
          heading: { level: 2, text: 'Key Features' },
          paragraphs: [
            'Next.js isn’t just another React framework—it’s packed with features that streamline development and boost performance. Here’s a rundown of what makes it shine, based on my hands-on experience:',
            'These features aren’t just buzzwords—they solve real problems. SSR and SSG let you optimise for speed and search engine visibility, whilst file-based routing eliminates the need for messy routing libraries. API routes are a game-changer for prototyping backend logic without spinning up a separate server. For a self-taught dev like me, this all adds up to a framework that’s approachable yet powerful enough to scale with your ambitions.',
          ],
          lists: [
            {
              ordered: false,
              items: [
                '**Server-Side Rendering (SSR):** Pages render on the server, delivering fully-formed HTML to the browser for faster first loads and better SEO. Perfect for content-heavy sites like blogs or e-commerce platforms.',
                '**Static Site Generation (SSG):** Pre-render pages at build time, serving static files that load lightning-fast and scale effortlessly. Think landing pages or documentation sites.',
                '**File-based Routing:** Drop a file like `about.js` into the `pages` directory, and it’s instantly a route (`/about`). No config, no fuss—just pure simplicity.',
                '**API Routes:** Need a quick backend? Create a file in `pages/api`, and you’ve got a serverless endpoint. I’ve used this for contact forms and data fetching without leaving my Next.js app.',
              ],
            },
          ],
        },
        {
          heading: { level: 2, text: 'Why Next.js?' },
          paragraphs: [
            'So, why did Next.js click for me? It’s the sweet spot between simplicity and control. Setting up a React app from scratch means wrestling with Webpack, Babel, and SSR configs—Next.js handles all that out of the box, letting you focus on building. But it’s not a straitjacket; you can still customise everything when you’re ready to dig deeper. The community is another huge win—tons of tutorials, plugins, and the official docs are gold for solo learners like me.',
            'This is just the start! In future posts, I’ll dive into practical stuff like building dynamic pages, fetching data with `getStaticProps` and `getServerSideProps`, and deploying your app to platforms like Vercel (the folks behind Next.js). Stick around if you want to improve your web dev game!',
          ],
        },
      ],
    },
    date: '2025-02-01',
    tags: ['Next.js', 'React', 'TypeScript'],
    author: 'Humza Hussain',
  },
  {
    id: '2',
    title: 'Tailwind CSS Tips and Tricks',
    slug: generateSlug('Tailwind Tips'),
    excerpt: 'Learn how to make the most of Tailwind CSS in your projects.',
    content: {
      sections: [
        {
          heading: { level: 2, text: 'Introduction to Tailwind CSS' },
          paragraphs: [
            'Tailwind CSS is a utility-first CSS framework that’s taken the web dev world by storm—and for good reason. Unlike traditional frameworks like Bootstrap, which give you pre-built components, Tailwind hands you a massive toolbox of small, composable utility classes. You style right in your HTML, building custom designs without wrestling with CSS files or overriding defaults. As someone who’s self-taught, I love how Tailwind speeds up prototyping whilst still letting me craft unique looks.',
            'In this post, I’ll share some of my favourite tips and tricks for getting the most out of Tailwind. From must-know classes to customising the framework for your needs, this guide will help you hit the ground running and maybe even rethink how you approach styling.',
          ],
        },
        {
          heading: { level: 2, text: 'Useful Tailwind Classes' },
          paragraphs: [
            'Tailwind’s strength lies in its utility classes—small, single-purpose tools you combine to create complex designs. Here are some I lean on constantly, along with how I use them:',
            'These are just the tip of the iceberg. Tailwind’s naming is intuitive—think `property-value` (e.g., `text-lg` for larger text)—so once you get the hang of it, you’ll be chaining classes like a pro. Experiment with combinations like `p-4 bg-blue-500 rounded-lg` for a padded, blue, rounded button in seconds.',
          ],
          lists: [
            {
              ordered: false,
              items: [
                '`text-centre`: Centres text—great for headings, buttons, or aligning content in a card.',
                '`bg-blue-500`: A vibrant mid-tone blue background. Tailwind’s colour system goes from 50 (light) to 900 (dark), so you can tweak shades easily.',
                '`p-4`: Adds 1rem (16px by default) of padding on all sides. I use this for spacing out elements without custom CSS.',
                '`hover:bg-grey-700`: Switches the background to a dark grey on hover. Pair it with transitions like `transition-colours` for smooth effects.',
              ],
            },
          ],
        },
        {
          heading: { level: 2, text: 'Customising Tailwind' },
          paragraphs: [
            'Out of the box, Tailwind is awesome, but customising it takes things to the next level. The `tailwind.config.js` file is your playground—here’s how to add your own flair. Say you want a custom brand colour:',
            'After a quick rebuild (`npm run dev`), you can use `bg-custom-blue` anywhere in your project. You can extend spacing, fonts, breakpoints, and more—check the docs for the full scoop. I’ve used this to match client branding perfectly without leaving Tailwind’s ecosystem.',
            'Another trick: enable “just-in-time” mode by adding `mode: "jit"` to your config. It generates styles on-demand, slashing build times and letting you use arbitrary values like `w-[150px]` for one-off sizes. It’s a game-changer for rapid iteration.',
          ],
          codeBlocks: [
            {
              language: 'javascript',
              code: `module.exports = {
  mode: 'jit', // Optional: enables Just-In-Time mode
  theme: {
    extend: {
      colours: {
        'custom-blue': '#1E3A8A',
      },
    },
  },
};`,
            },
          ],
        },
        {
          heading: { level: 2, text: 'Pro Tips for Workflow' },
          paragraphs: [
            'To wrap up, here’s a bonus tip: pair Tailwind with a component-based framework like React or Vue. Break your UI into reusable pieces, then style them with Tailwind classes. For example, a `<Button>` component with `px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700` gives you a consistent, tweakable button across your app.',
            'Tailwind’s learning curve is shallow, but the real magic happens when you start thinking in utilities. Play with the official playground (tailwindcss.com/play), browse the community components at Tailwind UI, and soon you’ll wonder how you ever styled without it. More advanced tricks—like responsive variants and dark mode—are coming in future posts, so stay tuned!',
          ],
        },
      ],
    },
    date: '2025-02-15',
    tags: ['CSS', 'Tailwind', 'Web Design'],
    author: 'Humza Hussain',
  },
  {
    id: '3',
    title: 'Understanding Python PEP 8 Standards',
    slug: generateSlug('Python PEP 8'),
    excerpt: 'A practical guide to writing clean, readable Python code with PEP 8 standards.',
    content: {
      sections: [
        {
          heading: { level: 2, text: 'Introduction' },
          paragraphs: [
            'PEP 8 is Python’s official style guide, penned by Guido van Rossum himself, and it’s all about making your code clean, consistent, and readable. As a self-taught programmer, I stumbled into PEP 8 whilst trying to make sense of messy codebases—both mine and others’. It’s been a lifeline for writing Python that’s not just functional but actually pleasant to revisit or share. In this post, I’ll unpack the core of PEP 8, show you practical examples, and explain why it’s worth adopting, especially if you’re learning solo.',
            'Think of PEP 8 as guardrails, not a rulebook to memorise. It’s less about perfection and more about clarity—making your code speak for itself. Let’s break it down and see how it can improve your Python game.',
          ],
        },
        {
          heading: { level: 2, text: 'Core Guidelines' },
          paragraphs: [
            'PEP 8 covers a lot, but a handful of rules stand out for everyday coding. Here’s what I focus on to keep my code sharp:',
            'These might feel nitpicky at first, but they add up. Consistent indentation prevents bugs, shorter lines keep your eyes from wandering, and clear naming saves you from deciphering `myvar` six months later. Whitespace, especially, is a quiet hero—those tiny gaps make dense code breathe.',
          ],
          lists: [
            {
              ordered: false,
              items: [
                '**Indentation:** Use 4 spaces per level—no tabs! Python relies on indentation for blocks, so consistency here is non-negotiable.',
                '**Line Length:** Cap lines at 79 characters. It forces you to break up complex logic and keeps code readable on any screen.',
                '**Naming Conventions:** Stick to `snake_case` for functions and variables (e.g., `calculate_total`), and `CamelCase` for classes (e.g., `MyClass`). Descriptive names beat cryptic ones every time.',
                '**Whitespace:** Add a space around operators (`x = 5`, not `x=5`) and after commas (`my_list = [1, 2, 3]`). It’s subtle but transformative.',
              ],
            },
          ],
        },
        {
          heading: { level: 2, text: 'Example Code' },
          paragraphs: [
            'Let’s see PEP 8 in action with a before-and-after. Here’s a sloppy snippet I might’ve written early on, followed by its polished PEP 8 version:',
            'The first version works, but it’s a chore to parse—cramped, vague, and inconsistent. The second one? It’s night and day: readable, intentional, and easier to debug. Tools like `flake8` or `black` can auto-format this for you, but understanding the “why” behind PEP 8 makes you a better coder.',
          ],
          codeBlocks: [
            {
              language: 'python',
              code: `def calculateTotal(x,y):return x+y
myList=[1,2,3]`,
            },
            {
              language: 'python',
              code: `def calculate_total(price, tax):
    return price + tax

my_list = [1, 2, 3]`,
            },
          ],
        },
        {
          heading: { level: 2, text: 'Why PEP 8 Matters' },
          paragraphs: [
            'PEP 8 isn’t about pleasing some style police—it’s about your future self and anyone else who touches your code. Readable code is maintainable code. When I revisit a project after months away, PEP 8 formatting means I’m not decoding my own chaos. For teams or open-source work, it’s even bigger—consistent style lets everyone jump in without a learning curve.',
            'For beginners, it’s also a fast track to pro habits. Following PEP 8 early on builds discipline and makes your code look legit, whether it’s for a portfolio or a job interview. Pair it with a linter like `pylint` to catch slip-ups, and you’re golden. Next time, I’ll dig into more Python best practices—like docstrings and type hints—so keep an eye out if you’re hooked on writing cleaner code!',
          ],
        },
      ],
    },
    date: '2025-03-01',
    tags: ['Python', 'PEP 8', 'Programming'],
    author: 'Humza Hussain',
  },
];