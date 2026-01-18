"use client";

import { withBasePath } from "@/lib/basePath";
import { motion } from "framer-motion";

export default function Hero() {
    return(
        <section className="min-h-screen flex flex-col justify-center items-center px-6 relative">
            <motion.img
                src={withBasePath("/MB_HeadShot.png")}
                alt="Profile Picture"
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotateY: 0,
                    y: [0, -10, 0] // Floating animation
                }}
                transition={{ 
                    duration: 0.8, 
                    delay: 0.1,
                    y: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
                className="w-44 h-60 md:w-64 md:h-80 rounded-lg mb-8 relative z-10"
                style={{
                    maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%), linear-gradient(to right, transparent 10%, black 20%, black 80%, transparent 90%)',
                    maskComposite: 'intersect',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%)',
                    WebkitMaskComposite: 'source-in'
                }}
            />

            <motion.h1
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl md:text-7xl font-bold relative z-20 -mt-16 text-white"
            >
                <span className="inline-block transform hover:scale-110 transition-transform duration-300 text-indigo-400">M</span>
                <span className="inline-block">anas </span>
                <span> </span>
                <span className="inline-block transform hover:scale-110 transition-transform duration-300 text-indigo-400">B</span>
                <span className="inline-block">hut</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-4 text-gray-400 text-lg md:text-xl"
            >
                Aspiring Software Developer | Tech Enthusiast | Lifelong Learner
            </motion.p>
        </section>
    )
}