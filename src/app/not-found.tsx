"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-white px-6 bg-[#4c000024]">
            <motion.div
                className="w-44 h-60 md:w-64 md:h-80 rounded-lg mb-8 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {/* Normal Image */}
                <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 1, scale: 0.8 }}
                    animate={{ opacity: 0, scale: 0.5 }}
                    transition={{
                        duration: 1.8,
                        repeat: 0,
                        ease: "easeOut",
                    }}
                    style={{
                        maskImage: "linear-gradient(to bottom, black 70%, transparent 90%)",
                        maskComposite: "intersect",
                        WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 90%)",
                        WebkitMaskComposite: "source-in",
                    }}
                >
                    <Image
                        src="/404/404_before.png"
                        alt="Normal state"
                        fill
                        className="object-contain"
                        priority
                        sizes="(max-width: 768px) 176px, 256px"
                    />
                </motion.div>

                {/* Lost Image */}
                <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 0.5, rotateY: -15 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        rotateY: 0,
                        y: [0, -10, 0],
                    }}
                    transition={{
                        opacity: { delay: 1.5, duration: 1.8 },
                        scale: { delay: 1.5, duration: 1.8 },
                        rotateY: { delay: 1.5, duration: 1.8 },
                        y: {
                            delay: 1.8,
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        },
                    }}
                    style={{
                        maskImage: "linear-gradient(to bottom, black 70%, transparent 90%)",
                        maskComposite: "intersect",
                        WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 90%)",
                        WebkitMaskComposite: "source-in",
                    }}
                >
                    <Image
                    src="/404/404_after.png"
                    alt="Lost state"
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 768px) 176px, 256px"
                    />
                </motion.div>
            </motion.div>
            {/* Text below the image */}
            <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
                className="text-center text-3x1 md:text-3xl font-bold relative z-20 -mt-16 text-white"
            >
                Uh-Ohhh<br />
                We didn't expect you to be here!
            </motion.h3>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 3.5 }}
            >
                <Link href="/" className="inline-block px-6 py-3 mt-4 rounded-xl glass hover:border-indigo-400 transition">
                    Back Home
                </Link>
            </motion.div>
        </div>
    );
}   
