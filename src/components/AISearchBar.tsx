"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Integrate with OpenAI
        console.log("Search query:", query);
    };

    return (
        <div className="fixed bottom-4 left-1/2 z-50" style={{ transform: 'translateX(-50%)' }}>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
            >
                <form onSubmit={handleSubmit} className="relative">
                    <motion.div
                        animate={{ width: isExpanded ? Math.min(window.innerWidth - 40, 500) : 60 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="glass rounded-full px-4 py-3 flex items-center gap-3 overflow-hidden"
                        style={{ transformOrigin: 'center' }}
                    >
                    <motion.button
                        type="button"
                        onClick={() => setIsExpanded(!isExpanded)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-shrink-0 text-white hover:text-cyan-400 transition-colors"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                    </motion.button>

                    <motion.input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ask AI about Manas..."
                        animate={{ opacity: isExpanded ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sm"
                        style={{ pointerEvents: isExpanded ? 'auto' : 'none' }}
                    />

                    {isExpanded && query && (
                        <motion.button
                            type="submit"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-shrink-0 text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="m9 18 6-6-6-6"/>
                            </svg>
                        </motion.button>
                    )}
                </motion.div>
            </form>
        </motion.div>
        </div>
    );
}