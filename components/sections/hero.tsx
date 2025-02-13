"use client";

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { Terminal } from './terminal';

export function HeroSection() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-[#8A2BE2] to-[#9370DB] text-transparent bg-clip-text">
              Humza Hussain
            </span>
          </h1>
            <h2 className="text-2xl md:text-3xl text-muted-foreground">
            <TypeAnimation
              sequence={[
              'Full Stack Developer',
              1500,
              'CTO @ ApprenticeWatch',
              1500,
              'Problem Solver',
              1500,
              'Cat Lover',
              1500,
              ]}
              wrapper="span"
              speed={40}
              repeat={Infinity}
            />
            </h2>
          <p className="text-lg text-muted-foreground max-w-lg">
            A software engineer based in London, passionate about building impactful digital solutions and continuously learning new technologies.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-[#8A2BE2] hover:bg-[#9370DB]">
              <Link href="/projects">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="border-[#8A2BE2] text-[#8A2BE2] hover:bg-[#8A2BE2] hover:text-white"
            >
              <Link href="/contact">Contact Me</Link>
            </Button>
          </div>
          <div className="flex gap-4 pt-4">
            <Button 
              variant="ghost" 
              size="icon" 
              asChild
              className="text-[#8A2BE2] hover:bg-[#8A2BE2]/10"
            >
              <Link
                href="https://github.com/hhussain04"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub Profile</span>
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              asChild
              className="text-[#8A2BE2] hover:bg-[#8A2BE2]/10"
            >
              <Link
                href="https://linkedin.com/in/humzahussain04"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn Profile</span>
              </Link>
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <Terminal />
        </motion.div>
      </div>
    </section>
  );
}