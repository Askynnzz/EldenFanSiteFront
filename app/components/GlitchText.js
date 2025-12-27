"use client";
import { useState, useEffect } from 'react';

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=";

export default function GlitchText({ text, className }) {
  const [display, setDisplay] = useState(text);

  const scramble = () => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iterations) return text[index];
            return LETTERS[Math.floor(Math.random() * LETTERS.length)];
          })
          .join("")
      );

      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 30);
  };

  return (
    <span onMouseEnter={scramble} className={`cursor-default ${className}`}>
      {display}
    </span>
  );
}