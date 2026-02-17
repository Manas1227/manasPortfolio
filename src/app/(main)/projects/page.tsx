"use client"

import { motion } from "framer-motion";
import { Project, projects } from "@/data/projects";
import { useState, useEffect, useRef } from "react";

export default function Projects() {
    return (
        <section className="flex flex-col min-h-screen max-w-5xl gap-y-[2vh] px-6 py-24 mx-auto">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="title"
            >
                My Projects with learnings and tech stack
            </motion.h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects && projects.map((project, index) => (
                    <ProjectCard project={project} key={index} index={index}/>
                ))} 
            </div>
        </section>
    )
}

export function ProjectCard({ project, index } : { project: Project, index: number}) {
    const [readMore, setReadMore] = useState(false);
    const [isOverFlowing, setIsOverFlowing] = useState(false);
    const descriptionRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        if(descriptionRef.current) {
            setIsOverFlowing(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight);
        }
    }, [project.description])
    
    return(
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition:{ duration: 0.6, delay: index * 0.2 } }}
            whileHover={{ borderColor: "rgb(255 255 255 / 0.4)", transition: {duration: 0.3, ease: "easeInOut"} }}
            className="glass p-6 rounded-lg"
        >
            <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
            <p 
                ref={descriptionRef} 
                className={`text-gray-400 text-justify ${readMore ? "" : "line-clamp-3"} ${isOverFlowing ? "" : "mb-4"}`}
            >
                {project.description}
            </p>
            {isOverFlowing && (
                <button 
                    className="text-gray-500 hover:text-gray-300 mb-4 w-full text-right text-xs" 
                    onClick={() => setReadMore((prev) => !prev)}
                >
                    {readMore ? "Read Less ↑" : "Read More ↓"}
                </button>
            )}
            <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech, techIndex) => (
                    <motion.span 
                        key={techIndex} 
                        className="glass text-sm px-2 py-1 rounded transition-all"
                        whileHover={{ backgroundColor: "transparent", borderColor: "transparent" }}
                    >
                        {tech}
                    </motion.span>
                ))}
            </div>
            {project.githubLink && (
                <a href={project.githubLink} target="_blank" className="text-blue-400 hover:underline">
                    Link to Project
                </a>
            )}
        </motion.div>
    )
}