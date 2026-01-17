"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const links = [
    { href: "about", label: "About" },
    { href: "projects", label: "Projects" },
    { href: "education", label: "Education" },
    { href: "ai", label: "AI" },
    { href: "contact", label: "Contact" },
]

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            setIsOpen(false);
        }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <>
            {/* Desktop NavBar */}
            <motion.nav
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            transition={{ duration: 0.6}}
            className="fixed top-6 left-1/2 z-50
                    glass px-6 py-2 rounded-2xl 
                    flex item-center justify-center gap-6
                    hidden md:flex"
            >
                {/* Brand */}
                <span className="font-bold text-lg tracking-wide nav-hover">
                    MB
                </span>

                {/* Divider */}
                <span className="w-px h-7 bg-white/20" />

                {/* Navigation Links */}
                <div className="flex gap-6 py-1 item-center text-sm">
                {links.map((link) => (
                    <a key={link.href} href={link.href} className="nav-hover">
                        {link.label}
                    </a>
                ))}
                </div>
            </motion.nav>

            {/* Mobile NavBar */}
            <motion.div
                ref={ref}
                layout
                transition={{ type: "spring", stiffness: 250, damping: 15 }}
                className="md:hidden fixed top-6 right-6 z-50
                        glass rounded-2xl overflow-hidden
                        flex flex-col"
            >
                {/* Brand Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="px-4 py-3 font-bold tracking-wide text-center nav-hover"
                >
                    MB
                </button>

                {/* Expanded Links */}
                {isOpen && (
                    <motion.div
                        layout
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-3 px-4 pb-3"
                    >
                        <span className="h-px w-full bg-white/20" />
                        {links.map((link) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-sm nav-hover"
                        >
                            {link.label}
                        </motion.a>
                        ))}
                    </motion.div>
                )}
            </motion.div>
        </>
    );
}
