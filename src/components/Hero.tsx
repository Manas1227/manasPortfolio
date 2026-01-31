"use client";

import { withBasePath } from "@/lib/basePath";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Hero() {
    const [reloadkey, setReloadkey] = useState(0);
    return(
        <section className="min-h-screen flex flex-col justify-center items-center px-6 relative">
            {/* Remounting the component to continue the floating effect of animation */}
            <DraggableImage
                key={reloadkey}
                isReload={reloadkey > 0}
                onReload={() => setReloadkey( k => k + 1)}
            />

            {/* Name */}
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

            {/* Tag Line */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-4 text-gray-400 text-lg md:text-xl text-center"
            >
                Aspiring Software Developer | Tech Enthusiast | Lifelong Learner
            </motion.p>
        </section>
    )
}

function DraggableImage({ onReload, isReload }: { onReload: () => void; isReload: boolean }) {
    const [hoverEnabled, setHoverEnabled] = useState(true);
    return (
        <motion.img
            src={withBasePath("/MB_HeadShot.png")}
            alt="Profile Picture"
            initial={isReload ? false : { opacity: 0, scale: 0.8, rotateY: -15 }}
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
            whileHover={hoverEnabled ? {scale: 1.1, rotateY: 10} : {}}
            className="w-44 h-60 md:w-64 md:h-80 rounded-lg mb-8 relative z-10"
            style={{
                maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%), linear-gradient(to right, transparent 10%, black 20%, black 80%, transparent 90%)',
                maskComposite: 'intersect',
                WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%)',
                WebkitMaskComposite: 'source-in'
            }}
            drag
            whileDrag={{scale: 1}}
            dragDirectionLock
            dragConstraints={{top: 0, bottom: 0, right: 0, left: 0}}
            dragTransition={{ bounceStiffness: 3000, bounceDamping: 15}}
            dragElastic={0.5}
            onDragEnd={() => {
                setTimeout(onReload, 1000)
                setHoverEnabled(false);
            }}
        />
    )
}