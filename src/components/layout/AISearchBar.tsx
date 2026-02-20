"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function SearchBar( { externalSearch, onExternalHandled } : { externalSearch: boolean | null, onExternalHandled: () => void }) {
    const [status, setStatus] = useState<{type: "default" | "success" | "error", message: string}>({type: "default", message: "Powered by Google Gemini ✦ It may make mistake."});
    const [query, setQuery] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);

    { /* Sync with external trigger from Navbar's AI Search */ }
    useEffect(() => {
        if (externalSearch !== null) setIsExpanded(externalSearch);
        onExternalHandled();
    }, [externalSearch]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/ai_search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query
                })
            })
            
            const data = await res.json();
            if(!res.ok) throw new Error("Something went wrong, please try again!")
            setStatus({
                type: "success",
                message: data.answer
            })
        } catch (error) {
            const msg = error instanceof Error ? error.message : "Something went wrong, please try again."
            setStatus({
                type: "error",
                message: msg
            })
        } finally {
            setQuery("");
        }
    };

    return (
        <div className="fixed bottom-4 left-1/2 z-50" style={{ transform: 'translateX(-50%)' }}>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="relative"
            >
                <motion.form
                    onSubmit={handleSubmit}
                    animate={{ width: isExpanded ? Math.min(window.innerWidth - 40, 500) : 60 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="glass rounded-full px-4 py-3 flex justify-self-center gap-3 overflow-hidden"
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
                        name="search_query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ask AI about Manas..."
                        animate={{ opacity: isExpanded ? 1 : 0 }}
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
                </motion.form>
                { isExpanded && 
                    <motion.p 
                        key="status"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.3 }}
                        className={`text-xs text-center text-nowrap mt-1 ${status.type === "error" ? 'text-pink-400' : 'text-gray-400'}`}
                    >
                        {status.message}
                    </motion.p>
                }    
            </motion.div>
        </div>
    );
}