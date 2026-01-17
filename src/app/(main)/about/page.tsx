'use client';

import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <section className="min-h-screen flex flex-col justify-center items-center px-6 relative">
            <motion.h1
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl md:text-7xl font-bold relative z-20 text-white mb-8"
            >
                About Me
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-4 text-gray-400 text-lg md:text-xl max-w-3xl text-center"
            >
                I'm Manas Bhut, an aspiring software developer with a passion for technology and innovation. I love exploring new programming languages, frameworks, and tools to create impactful projects. When I'm not coding, you can find me reading tech blogs, experimenting with AI, or hiking in nature.
            </motion.p>
        </section>
    );
}