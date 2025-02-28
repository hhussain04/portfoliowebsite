'use client';

import React, { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';


const snippets = [
  'import React, { useState, useEffect } from "react";',
  'const App = () => <div>Hello, World!</div>;',
  'console.log("Hello, World!");',
  'const sum = (a, b) => a + b;',
  'fetch("https://hhussain04.live/data")',
  'const [state, setState] = useState(initialState);',
  'useEffect(() => { console.log("Component mounted"); }, []);',
  'const handleClick = () => { alert("Button clicked!"); };',
  'const data = await fetch("https://hhussain04.live/data").then(res => res.json());',
  'const multiply = (x, y) => x * y;',
];

export function Terminal() {
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [displayedSnippets, setDisplayedSnippets] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSnippet((prev) => (prev + 1) % snippets.length);
      setDisplayedSnippets((prev) => [...prev, snippets[currentSnippet]]);
    }, 2000); // Change snippet every 2 seconds

    return () => clearInterval(interval);
  }, [currentSnippet]);

  useEffect(() => {
    const terminalElement = document.getElementById('terminal-content');
    if (terminalElement) {
      terminalElement.scrollTop = terminalElement.scrollHeight;
    }
  }, [displayedSnippets]);

  return (
    <div className="bg-background text-foreground p-4 rounded-lg shadow-lg max-w-6xl mx-auto h-96 overflow-hidden">
      <div className="outline outline-2 outline-ring h-full rounded-lg overflow-hidden">
        <div className="bg-card rounded-t-lg flex items-center justify-between p-2">
          <div className="flex space-x-2"></div>
          <div className="flex-1 text-center text-primary font-mono text-l">$ ~ visitor@terminal</div>
          <div></div>
        </div>
        <div
          id="terminal-content"
          className="bg-card-background rounded-b-lg p-8 text-primary font-mono text-lg overflow-y-auto h-full"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', pointerEvents: 'none' }}
        >
          {displayedSnippets.map((snippet, index) => (
            <div key={index} className="whitespace-pre-wrap mb-4">
              <TypeAnimation
                sequence={[snippet.split('\n').join('\n'), 6000, '']}
                wrapper="div"
                cursor={true}
                repeat={1}
                className="whitespace-pre-wrap"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}