"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

 useEffect(() => {
    if (mounted && clickCount === 1) {
      router.push('/minigame');
    }
  }, [clickCount, router, mounted]);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  const menuVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95,
      y: -20
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  if (!mounted) return null;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative top-4 left-0 right-0 z-50 px-4"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between bg-black backdrop-blur-md rounded-2xl border border-[#8A2BE2]/20 p-4">
          <div
            onClick={() => setClickCount(clickCount + 1)}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="relative flex items-center w-12 h-12 overflow-hidden bg-transparent rounded-lg">
              {/* HH Letters */}
              <span className="absolute top-0.5 left-1 text-3xl font-bold text-[#8A2BE2]">H</span>
              <span className="absolute bottom-0.5 right-0 text-3xl font-bold text-[#7A1EB2]">H</span>
            </div>
            <span className="absolute bottom-2 left-12 text-xs text-[#8A2BE2]">Humza Hussain</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-[#8A2BE2] transition-colors relative group"
              >
                {item.label}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#8A2BE2] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#8A2BE2] hover:bg-[#8A2BE2]/10"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-20 left-4 right-4 bg-black/80 backdrop-blur-md rounded-xl border border-[#8A2BE2]/20 p-4 shadow-lg shadow-[#8A2BE2]/10 md:hidden"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-muted-foreground hover:text-[#8A2BE2] transition-colors px-4 py-2 rounded-lg hover:bg-[#8A2BE2]/10"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}