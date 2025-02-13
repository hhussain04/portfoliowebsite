import './globals.css';
import type { Metadata } from 'next';
import { Inter, Roboto, Fira_Code } from 'next/font/google';
import { Navbar } from '@/components/navbar';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const roboto = Roboto({ 
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Humza Hussain - Software Developer',
  description: 'Professional portfolio of Humza Hussain, a passionate software developer specializing in modern web technologies.',
  keywords: ['Software Developer', 'Web Development', 'React', 'Next.js', 'TypeScript'],
  authors: [{ name: 'Humza Hussain' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://humzahussain.dev',
    title: 'Humza Hussain - Software Developer',
    description: 'Professional portfolio of Humza Hussain, a passionate software developer specializing in modern web technologies.',
    siteName: 'Humza Hussain Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Humza Hussain - Software Developer',
    description: 'Professional portfolio of Humza Hussain, a passionate software developer specializing in modern web technologies.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${roboto.variable} ${firaCode.variable} font-sans antialiased`}>
          <div className="relative min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
            <Toaster />
          </div>
      </body>
    </html>
  );
}