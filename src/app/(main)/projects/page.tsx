"use client"

import { motion } from "framer-motion";

export default function Projects() {
    return (
        <section className="flex flex-col min-h-screen max-w-5xl gap-y-[2vh] px-6 py-24 mx-auto">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="title"
            >
                Projects coming soon! 🚀
            </motion.h1>
        </section>
    )
}