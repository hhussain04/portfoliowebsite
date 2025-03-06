"use client";

import { motion } from "framer-motion";
import { ContactForm } from "././ContactForm";
import { Mail, Phone, Github, Twitter, Linkedin } from "lucide-react";

export default function ContactPage() {
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

  return (
    <div className="space-y-16 max-w-4xl mx-auto pt-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#8A2BE2] to-[#9370DB] bg-clip-text text-transparent">
          Contact Me
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Feel free to reach out for collaborations, questions, or just to say hi! I’d love to hear from you.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6"
      >
        {/* Contact Information */}
        <motion.div
          variants={item}
          className="bg-black/40 backdrop-blur-md rounded-2xl border-2 border-[#8A2BE2]/20 p-6 shadow-lg shadow-[#8A2BE2]/5"
        >
          <h2 className="text-2xl font-bold mb-4 text-[#8A2BE2]">Get in Touch</h2>
          <div className="space-y-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-[#8A2BE2]" />
              <span>Email: <a href="mailto:hussainhumza0403@gmail.com" className="text-[#8A2BE2] hover:underline">hussainhumza0403@gmail.com</a></span>
            </div>
            <div className="flex items-center gap-2">
              <Github className="h-5 w-5 text-[#8A2BE2]" />
              <a href="https://github.com/hhussain04" target="_blank" rel="noopener noreferrer" className="text-[#8A2BE2] hover:underline">
                GitHub
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="h-5 w-5 text-[#8A2BE2]" />
              <a href="https://www.linkedin.com/in/humzahussain04/" target="_blank" rel="noopener noreferrer" className="text-[#8A2BE2] hover:underline">
                LinkedIn
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          variants={item}
          className="bg-black/40 backdrop-blur-md rounded-2xl border-2 border-[#8A2BE2]/20 p-6 shadow-lg shadow-[#8A2BE2]/5"
        >
          <h2 className="text-2xl font-bold mb-6 text-[#8A2BE2]">Send Me a Message</h2>
          <ContactForm />
        </motion.div>
      </motion.div>
    </div>
  );
}