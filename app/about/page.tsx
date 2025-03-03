"use client";

import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download, Users, Mic, Lightbulb, Clock, RefreshCw, UserCheck, Eye, Zap, Wrench, Palette,
  Quote, Briefcase, Award, Star
} from "lucide-react";
import { useState } from "react";

// Define skills with CDN SVG paths from devicon
const skills = [
  { name: "React", level: 75, icon: "https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/react/react-original.svg" },
  { name: "Next.js", level: 65, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "TypeScript", level: 80, icon: "https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/typescript/typescript-original.svg" },
  { name: "Node.js", level: 75, icon: "https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/nodejs/nodejs-original.svg" },
  { name: "Python", level: 85, icon: "https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/python/python-original.svg" },
  { name: "AWS", level: 55, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "C++", level: 35, icon: "https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/cplusplus/cplusplus-original.svg" },
  { name: "Haskell", level: 25, icon: "https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/haskell/haskell-original.svg" },
  { name: "JavaScript", level: 75, icon: "https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/javascript/javascript-original.svg" },
  { name: "HTML5", level: 100, icon: "https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/html5/html5-original.svg" },
  { name: "CSS3", level: 65, icon: "https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/css3/css3-original.svg" },
  { name: "Tailwind CSS", level: 55, icon: "https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "MongoDB", level: 20, icon: "https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/mongodb/mongodb-original.svg" },
  { name: "MySQL", level: 100, icon: "https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/mysql/mysql-original.svg" },
  { name: "Docker", level: 80, icon: "https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/docker/docker-original.svg" },
  { name: "Heroku", level: 90, icon: "https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/heroku/heroku-original.svg" },
  { name: "Linux", level: 100, icon: "https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/linux/linux-original.svg" },
  { name: "Ubuntu", level: 100, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-original.svg" },
  { name: "Git", level: 95, icon: "https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/git/git-original.svg" },
  { name: "Bash", level: 85, icon: "https://www.svgrepo.com/download/353478/bash-icon.svg" },
  { name: "Adobe Photoshop", level: 30, icon: "https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/photoshop/photoshop-original.svg" },
  { name: "Figma", level: 60, icon: "https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/figma/figma-original.svg" },
  { name: "Blender", level: 55, icon: "https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/blender/blender-original.svg" },
];

const softSkills = [
  { name: "Collaboration and Teamwork", icon: Users },
  { name: "Communication and Presentation", icon: Mic },
  { name: "Problem-solving", icon: Lightbulb },
  { name: "Time Management", icon: Clock },
  { name: "Adaptability and Learning Ability", icon: RefreshCw },
  { name: "Mentoring and Leadership", icon: UserCheck },
  { name: "Attention to Detail", icon: Eye },
  { name: "Critical Thinking", icon: Zap },
  { name: "Resourcefulness", icon: Wrench },
  { name: "Creativity and Innovation", icon: Palette },
];

const timeline = [
  {
    year: "January 2025 - Present",
    title: "Chief Technology Officer",
    company: "ApprenticeWatch",
    "info-1": "Leading the development of a cutting-edge platform for apprenticeships, overseeing a team of developers and collaborating with stakeholders to ensure alignment with business goals.",
    "info-2": "Implementing best practices in software development, including code reviews, testing, and deployment processes to ensure high-quality deliverables.",
    "info-3": "Driving innovation by researching and integrating new technologies, enhancing the platform's capabilities and user experience.",
  },
  {
    year: "November 2023 - June 2025",
    title: "Primary Computing Extracurricular Club Lead & Co-Lead",
    company: "Ada, The National College for Digital Skills",
    "info-1": "Introduced primary school students to fundamental computing concepts using micro:bits, creating engaging lesson plans to simplify complex topics such as programming and hardware interaction.",
    "info-2": "Mentored students through hands-on projects, troubleshooting code and hardware problems to cultivate problem-solving abilities and spark curiosity about technology.",
    "info-3": "",
  },
  {
    year: "October 2020 - Dec 2020",
    title: "Hardware Support Technician",
    company: "Watham Forest Town Hall",
    "info-1": "Assessed and categorised over 150 outdated laptops, using Windows troubleshooting tools to identify repairable devices and minimise waste by enabling effective resource allocation",
    "info-2": "Collaborated with a team of 4 to develop a streamlined process for identifying and repairing devices, resulting in a 30% increase in the number of laptops repaired and reused",
    "info-3": "Implemented tracking via a physical logging system to monitor the status of each device, ensuring transparency and accountability throughout the repair process",
  },
];

const testimonials = [
  {
    text: "Humza is an exceptional developer with a keen eye for detail and a deep understanding of modern web technologies.",
    author: "Farrukh Ahmad",
    role: "Founder, ApprenticeWatch",
  },
  {
    text: "Working with Humza was a game-changer for our project. His technical expertise and problem-solving skills are outstanding.",
    author: "Jamal Mitchell",
    role: "Co-Founder, ApprenticeWatch",
  },
  {
    text: "Humza's ability to tackle complex challenges while maintaining code quality is remarkable.",
    author: "Ezra Baldwin",
    role: "Backend Developer, HSBC",
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
  const [isExpanded, setIsExpanded] = useState(false);
  const initialSkillsToShow = 8;

  return (
    <div className="space-y-16 max-w-4xl mx-auto pt-24">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#8A2BE2] to-[#9370DB] bg-clip-text text-transparent underline">
          About Me
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A passionate full-stack developer with 2 years of personal experience 
          with many different technologies.
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
          className="bg-black/40 backdrop-blur-md rounded-2xl border-2 border-[#8A2BE2]/20 p-6 shadow-lg shadow-[#8A2BE2]/5" // Changed to border-2
        >
          <div className="flex items-center gap-2 mb-6">
            <Star className="h-6 w-6 text-[#8A2BE2]" />
            <h2 className="text-2xl font-bold">Skills & Expertise</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                {skills
                  .slice(0, isExpanded ? skills.length : initialSkillsToShow)
                  .map((skill) => (
                    <div key={skill.name} className="space-y-1 flex items-center gap-2">
                      <img src={skill.icon} alt={`${skill.name} icon`} className="h-5 w-5" />
                      <div className="flex-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-1.5" />
                      </div>
                    </div>
                  ))}
              </div>
              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Show Less" : `Show More (${skills.length - initialSkillsToShow})`}
              </Button>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Soft Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                {softSkills.map((skill) => (
                  <Card
                    key={skill.name}
                    className="p-4 text-center hover:border-[#8A2BE2]/50 transition-colors"
                  >
                    <skill.icon className="h-8 w-8 mx-auto mb-2 text-[#8A2BE2]" />
                    <p className="font-medium text-sm">{skill.name}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Experience Compartment */}
        <motion.div
          variants={item}
          className="bg-black/40 backdrop-blur-md rounded-2xl border-2 border-[#8A2BE2]/20 p-6 shadow-lg shadow-[#8A2BE2]/5" // Changed to border-2
        >
          <div className="flex items-center gap-2 mb-6">
            <Briefcase className="h-6 w-6 text-[#8A2BE2]" />
            <h2 className="text-2xl font-bold">Professional Journey</h2>
          </div>
          <div className="space-y-6">
            {timeline.map((item) => (
              <Card
                key={item.year}
                className="p-6 bg-black/50 border border-[#8A2BE2]/30 hover:border-[#8A2BE2]/50 transition-colors"
              >
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-muted-foreground">{item.year}</span>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-[#8A2BE2] font-medium">{item.company}</p>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    {item["info-1"] && <li className="flex items-start gap-2"><span>•</span>{item["info-1"]}</li>}
                    {item["info-2"] && <li className="flex items-start gap-2"><span>•</span>{item["info-2"]}</li>}
                    {item["info-3"] && <li className="flex items-start gap-2"><span>•</span>{item["info-3"]}</li>}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Compartment */}
        <motion.div
          variants={item}
          className="bg-black/40 backdrop-blur-md rounded-2xl border-2 border-[#8A2BE2]/20 p-6 shadow-lg shadow-[#8A2BE2]/5" // Changed to border-2
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