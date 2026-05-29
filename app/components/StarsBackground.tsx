'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function StarsBackground() {
  const [stars, setStars] = useState<{top:number,left:number}[]>([]);

  useEffect(() => {
    // generate 30 stars positions once, after client mount
    const generated = Array.from({ length: 30 }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
    }));
    setStars(generated);
  }, []);

  return (
    <>
      {stars.map((s, i) => (
        <motion.div
          key={i}
          className="absolute bg-cyan-400 rounded-full w-1.5 h-1.5 opacity-50"
          style={{ top: `${s.top}%`, left: `${s.left}%` }}
          animate={{
            y: [0, -5, 0], // simple vertical floating
            x: [0, 5, 0],  // simple horizontal floating
          }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 3 + Math.random() * 2, // vitesse plus rapide
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}
