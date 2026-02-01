"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CursorDot() {
    const [enabled, setEnabled] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, { damping: 15, stiffness: 150, restDelta: 0.001  });
    const smoothY = useSpring(mouseY, { damping: 15, stiffness: 150, restDelta: 0.001  });

    useEffect(() => {
        const media = window.matchMedia("(pointer: fine)");
        setEnabled(media.matches);

        const handleChange = () => setEnabled(media.matches);
        media.addEventListener("change", handleChange);

        return () => media.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
        if (!enabled) return;

        const move = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, [enabled, mouseX, mouseY]);

    if (!enabled) return null;

    return (
        <motion.div
        style={{
            translateX: smoothX,
            translateY: smoothY,
        }}
        className="
            fixed top-0 left-0 z-[9999]
            w-6 h-6 rounded-full
            bg-white
            pointer-events-none
            mix-blend-difference"
        />
    );
}
