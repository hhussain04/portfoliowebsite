"use client";

import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Brain, Heart, Coffee, Book, Code, Quote, Briefcase, Award, Star } from "lucide-react";

const skills = [
  { name: "React/Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Node.js", level: 85 },
  { name: "Python", level: 80 },
  { name: "AWS", level: 75 },
];

const softSkills = [
  { name: "Problem Solving", icon: Brain },
  { name: "Team Leadership", icon: Heart },
  { name: "Communication", icon: Coffee },
  { name: "Continuous Learning", icon: Book },
  { name: "Adaptability", icon: Code },
];

const timeline = [
  {
    year: "2023",
    title: "Senior Software Engineer",
    company: "Tech Corp",
    description: "Leading development of enterprise applications",
  },
  {
    year: "2021",
    title: "Software Engineer",
    company: "StartupX",
    description: "Full stack development with modern technologies",
  },
  {
    year: "2019",
    title: "Junior Developer",
    company: "DevCo",
    description: "Started professional journey in web development",
  },
];

const testimonials = [
  {
    text: "Humza is an exceptional developer with a keen eye for detail and a deep understanding of modern web technologies.",
    author: "Sarah Johnson",
    role: "CTO, TechCorp",
  },
  {
    text: "Working with Humza was a game-changer for our project. His technical expertise and problem-solving skills are outstanding.",
    author: "Michael Chen",
    role: "Lead Developer, StartupX",
  },
  {
    text: "Humza's ability to tackle complex challenges while maintaining code quality is remarkable.",
    author: "Emily Rodriguez",
    role: "Product Manager, DevCo",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <div className="space-y-16 max-w-4xl mx-auto pt-24">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#8A2BE2] to-[#9370DB] bg-clip-text text-transparent">
          About Me
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A passionate software engineer with over 5 years of experience in building
          scalable web applications and leading development teams.
        </p>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Download Resume
        </Button>
      </motion.section>

      {/* Lunchbox Layout */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 relative"
      >
        {/* Skills Compartment */}
        <motion.div
          variants={item}
          className="bg-black/40 backdrop-blur-md rounded-2xl border border-[#8A2BE2]/20 p-6 shadow-lg shadow-[#8A2BE2]/5"
        >
          <div className="flex items-center gap-2 mb-6">
            <Star className="h-6 w-6 text-[#8A2BE2]" />
            <h2 className="text-2xl font-bold">Skills & Expertise</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Soft Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                {softSkills.map((skill) => (
                  <Card key={skill.name} className="p-4 text-center hover:border-[#8A2BE2]/50 transition-colors">
                    <skill.icon className="h-8 w-8 mx-auto mb-2 text-[#8A2BE2]" />
                    <p className="font-medium">{skill.name}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Experience Compartment */}
        <motion.div
          variants={item}
          className="bg-black/40 backdrop-blur-md rounded-2xl border border-[#8A2BE2]/20 p-6 shadow-lg shadow-[#8A2BE2]/5"
        >
          <div className="flex items-center gap-2 mb-6">
            <Briefcase className="h-6 w-6 text-[#8A2BE2]" />
            <h2 className="text-2xl font-bold">Professional Journey</h2>
          </div>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div
                key={item.year}
                className="relative pl-8 border-l-2 border-[#8A2BE2]/20"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#8A2BE2]" />
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">{item.year}</span>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.company}</p>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Compartment */}
        <motion.div
          variants={item}
          className="bg-black/40 backdrop-blur-md rounded-2xl border border-[#8A2BE2]/20 p-6 shadow-lg shadow-[#8A2BE2]/5"
        >
          <div className="flex items-center gap-2 mb-6">
            <Award className="h-6 w-6 text-[#8A2BE2]" />
            <h2 className="text-2xl font-bold">Testimonials</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 space-y-4 hover:border-[#8A2BE2]/50 transition-colors"
              >
                <Quote className="h-8 w-8 text-[#8A2BE2]/40" />
                <p className="text-lg">{testimonial.text}</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}