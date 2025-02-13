'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { cn } from '@/lib/utils';

const snippets = [
  'import React, { useState, useEffect } from "react";',
  'const App = () => <div>Hello, World!</div>;',
  'console.log("Hello, World!");',
  'const sum = (a, b) => a + b;',
  'fetch("https://api.example.com/data")',
  'const [state, setState] = useState(initialState);',
  'useEffect(() => { console.log("Component mounted"); }, []);',
  'const handleClick = () => { alert("Button clicked!"); };',
  'const data = await fetch("https://api.example.com/data").then(res => res.json());',
  'const multiply = (x, y) => x * y;',
];

export function Terminal() {
  const [currentSnippet, setCurrentSnippet] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSnippet((prev) => (prev + 1) % snippets.length);
    }, 5000); // Change snippet every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white p-4 rounded-lg shadow-lg max-w-6xl mx-auto h-96">
      <div className="outline outline-2 outline-purple-500 h-96 rounded-lg">
        <div className="bg-gray-500 rounded-t-lg flex items-center justify-between p-2">
          <div className="flex space-x-2"></div>
          <div className="flex-1 text-center text-purple-400 font-mono text-l">$ ~ visitor@terminal</div>
          <div></div>
        </div>
        <div className="bg-gray-900 rounded-b-lg p-8 text-purple-400 font-mono text-lg overflow-y-auto h-92">
          <TypeAnimation
            sequence={[snippets[currentSnippet].split('\n').join('\n'), 6000, '']}
            wrapper="div"
            cursor={true}
            repeat={Infinity}
            className="whitespace-pre-wrap"
          />
        </div>
      </div>
    </div>
  );
}