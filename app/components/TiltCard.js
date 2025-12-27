// components/TiltCard.js
"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function TiltCard({ children, className }) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the movement
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  function onMouseMove(e) {
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate rotation based on distance from center
    x.set(e.clientY - centerY);
    y.set(e.clientX - centerX);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Transform mouse position to rotation degrees
  const rotateX = useTransform(mouseX, [-200, 200], [15, -15]); // Inverse for 3D feel
  const rotateY = useTransform(mouseY, [-200, 200], [-15, 15]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative transition-all duration-200 ease-linear ${className}`}
    >
      <div style={{ transform: "translateZ(50px)" }}>
        {children}
      </div>
    </motion.div>
  );
}