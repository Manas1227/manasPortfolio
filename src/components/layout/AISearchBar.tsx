"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from 'react-markdown';

export default function SearchBar( { externalSearch, onExternalHandled } : { externalSearch: boolean | null, onExternalHandled: () => void }) {
    const [error, setError] = useState<{message: string} | null>(null);
    const [query, setQuery] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [messages, setMessages] = useState<{role: "visiter" | "ai", text: string}[] >([]);
    const [isLoading, setIsLoading] = useState(false);

    { /* Sync with external trigger from Navbar's AI Search */ }
    useEffect(() => {
        if (externalSearch !== null) setIsExpanded(externalSearch);
        onExternalHandled();
    }, [externalSearch]);
    
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if(messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [messages])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        e.preventDefault();
        
        // add visiter's question to the messages
        setMessages(prev => [...prev, { role: "visiter", text: query}]);
        try {
            const res = await fetch("/api/ai_search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query
                })
            })

            const data = await res.json();
            
            if(!res.ok) throw new Error(data.error || "Something went wrong, please try again!");
            
            // add ai's response to the messages
            setMessages(prev => [...prev, { role: "ai", text: data.answer}]);
            
            // Set the Error state to null after success response in case any previous errors have occured.
            setError(null);
        } catch (error) {
            const msg = error instanceof Error ? error.message : "Something went wrong, please try again."
            setError({ message: msg })
        } finally {
            setIsLoading(false);
            // Clear the input value from the search bar
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
                {/* Conversation window for messages */}
                { isExpanded && (
                    <motion.div 
                        ref={messagesEndRef}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: messages.length > 0 ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
                        className="glass flex flex-col rounded-2xl p-3 mb-2 w-[calc(100vw-40px)] max-w-2xl max-h-80 overflow-y-auto space-y-3"
                    >
                        {messages?.map((m, i) => (
                            <div
                                key={i}
                                className={`max-w-[75%] p-3 rounded-xl text-white ${
                                    m.role === "visiter"
                                        ? "ml-auto bg-green-900/80"
                                        : "mr-auto bg-blue-900/80"
                                }`}
                                >
                                <ReactMarkdown>{m.text}</ReactMarkdown>
                            </div>
                        ))}
                    </motion.div>
                )}

                {/* AI search input bar */}
                <motion.form
                    onSubmit={handleSubmit}
                    animate={{ width: isExpanded ? Math.min(window.innerWidth - 40, 500) : 60 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`
                        glass rounded-full px-4 py-3 flex justify-self-center gap-3 overflow-hidden
                        ${isLoading ? "border-blue-400 animate-pulse bg-transparent" : ""}`}
                    style={{ transformOrigin: 'center' }}
                >
                    {/* Shimmer animation while waiting for the AI response */}
                    {isLoading && (
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%", opacity: [1, 0.5, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: [0.4, 0, 0.6, 1] }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
                        />
                    )}
                    
                    {/* Initial search icon responsible for expanding the search bar */}
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
                        value={isLoading ? "Thinking..." : query}
                        disabled={isLoading}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ask AI about Manas..."
                        animate={{ opacity: isExpanded ? 1 : 0 }}
                        className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sm"
                        style={{ pointerEvents: isExpanded ? 'auto' : 'none' }}
                    />

                    {isExpanded && query && (
                        <motion.button
                            type="submit"
                            disabled={isLoading}
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

                {/* Information - Warning/Error tagline in bottom */}
                { isExpanded && 
                    <motion.p 
                        key="status"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.3 }}
                        className={`text-xs text-center text-nowrap mt-1 ${error ? 'text-pink-400' : 'text-gray-400'}`}
                    >
                        {error ? error.message : "Powered by Google Gemini ✦ It may make mistake."}
                    </motion.p>
                }    
            </motion.div>
        </div>
    );
}