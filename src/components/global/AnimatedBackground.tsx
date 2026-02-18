"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function AnimatedBackground() {
  const [circleCount, setCircleCount] = useState(10); // Default to 10 to avoid SSR issues
  const [circlePositions, setCirclePositions] = useState<number[][]>([]);

  useEffect(() => {
    const updateCircleCount = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        const count = Math.max(10, Math.floor(width / 50));
        setCircleCount(count);
        
        // Generate positions for all circles
        const positions = Array.from({ length: count }, () => [
          Math.random() * 100, // top
          Math.random() * 100  // left
        ]);
        setCirclePositions(positions);
      }
    };

    updateCircleCount();
    window.addEventListener("resize", updateCircleCount);

    return () => window.removeEventListener("resize", updateCircleCount);
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", overflow: "hidden", background: "#000000", zIndex: -1 }}>
      {circlePositions.map((position, i) => (
        <motion.div
          key={i}
          animate={{ y: ["0%", "100%"], x: ["0%", "50%"] }}
          transition={{ duration: 10 + i, repeat: Infinity, repeatType: "mirror" }}
          style={{
            position: "fixed",
            top: `${position[0]}%`,
            left: `${position[1]}%`,
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: `rgba(0, 255, 200, 0.11)`,
          }}
        />
      ))}
    </div>
  );
}