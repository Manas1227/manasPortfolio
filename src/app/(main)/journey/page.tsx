"use client";

import { timeline } from "@/data/timeline";
import type { EducationItem, ExperienceItem } from "@/data/timeline";
import { AnimatePresence, motion, useReducedMotion, Variants } from "framer-motion";
import { useState } from "react";

export default function TimelinePage() {
  
  const timelineItemVariants: Variants = {
    rest: { opacity: 0, y: 20 },
    inView: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
    hover: { },
  }
  
  const logoVariants: Variants = {
    rest:{ x: 10, scale: 0.5, opacity: 0 },
    hover: useReducedMotion()
      ? { x: 0, scale: 1, opacity: 1, transition: { duration: 0.15 } }
      : { x: 0, scale: 1.05, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 20 } },
  };

  const [curtainVisible, setCurtainVisible] = useState<{show: "all" | "education" | "experience" } | null >(null);

  let visibleTimelineItems = timeline;
  if (curtainVisible) {
    switch (curtainVisible.show) {
      case "education":
        visibleTimelineItems = timeline.filter(item => item.type === "education");
        break;
      case "experience":
        visibleTimelineItems = timeline.filter(item => item.type === "experience");
        break;
      default:
        visibleTimelineItems = timeline;
    }
  }
  
  return (
    <section className="min-h-screen px-6 py-24 text-white">
      <div className="max-w-5xl mx-auto gap-y-[2vh] flex flex-col">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="title"
        >
          My Journey
        </motion.h1>

        { /* Filter Buttons */ }
        <div className="flex gap-4 justify-center md:w-full-11 md:pl-11">
          <motion.button
            className={`px-4 py-2 rounded-2xl border w-1/2 ${curtainVisible?.show === "education" ? "bg-blue-500/20 border-blue-500" : "border-blue-400 hover:border-blue-600"}`}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            onClick={() => setCurtainVisible(curtainVisible?.show === "education" ? null : { show: "education" })}
          > 
            Education
          </motion.button>
          <motion.button
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={`px-4 py-2 rounded-2xl border w-1/2 ${curtainVisible?.show === "experience" ? "bg-green-500/20 border-green-500" : "border-green-400 hover:border-green-600"}`}
            onClick={() => setCurtainVisible(curtainVisible?.show === "experience" ? null : { show: "experience" })}
          >
            Experience
          </motion.button>
        </div>

        {/* Timeline Container */ }
        <AnimatePresence mode="wait">
          <motion.div
            key={curtainVisible?.show ?? "all"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative pl-10"
          >          
            {/* Vertical Line */ }
            <motion.span
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute -left-[3px] top-0 w-[2px] bg-white/20"
            />

            {/* Timeline Items */ }
            {visibleTimelineItems.map((item, index) => (
              <motion.div
                key={index}
                initial="rest"
                whileInView="inView"
                viewport={{ once: true }}
                className="relative mb-10 mt-10"
                whileHover="hover"
                whileFocus="hover"
                variants={timelineItemVariants}
              >
                
                {/* Education/Experience Color-Bar */}
                <motion.span
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 + (index * 0.3) }}
                  className={`absolute top-0 -left-11 w-[4px] h-full rounded-full 
                  ${
                    item.type === "education" ? "bg-blue-500" : "bg-green-500"
                  }`}
                />

                {/* Organization Logo on Hover */}
                <div className="hidden md:block absolute right-1/3 -top-4 pointer-events-none">
                  <motion.img
                    src={item.orgLogo}
                    alt={item.organization}
                    width={"150px"}
                    height={"100px"}
                    className="rounded-md bg-transparent"
                    aria-hidden={item.organization ? "false" : "true"}
                    variants={logoVariants}
                  />
                </div>
                
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 + (index * 0.3) }}
                  className="relative z-10"
                >
                  { item.type == "experience" && item.role.length > 1 &&(
                    <HirarchyExperienceItem item={item} />
                  )}

                  { item.type == "experience" && item.role.length == 1 &&(
                    <ExperienceItem item={item} />
                  )}

                  { item.type == "education" && (
                    <EducationItem item={item} />
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export function EducationItem({ item } : { item: EducationItem }) {
  return (
    <div className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition">
      <p className="text-white/70">
        {item.period}
      </p>
      
      <span className="flex items-center gap-2">
        <p className="text-xl font-semibold">{item.title}</p>
        {item.grade && (
          <motion.span 
            className="inline-block ml-2 px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/50"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 5 }}
          >
            {item.grade}
          </motion.span>
        )}
      </span>
      
      <span className="flex items-center">
        <motion.a 
          className="text-blue-600 group underline md:no-underline hover:underline" 
          href={item.orgUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ color: "#1e3a8a" }}
        >
          {item.organization}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="inline-block ml-1 mb-1 opacity-1 md:opacity-0 group-hover:opacity-100 transition-opacity"
            aria-hidden="true"
            whileHover={{ color: "#1e3a8a" }}
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </motion.svg>
        </motion.a>

        <span className="inline-block text-white/80 before:content-['•'] before:mx-2">
          {item.orgLocation}
        </span>
      </span>

      <ul className="mt-4 list-disc list-inside text-white/80">
        {item.description.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </div>
  )
}

export function ExperienceItem({ item } : { item: ExperienceItem}) {
  return (
    <div className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition">
      <p className="text-white/70">{item.totalPeriod}</p>
      <p className="text-xl font-semibold">{item.role[0].title}</p>

      <span className="flex items-center">
        <motion.a 
          className="text-blue-600 group underline md:no-underline hover:underline" 
          href={item.orgUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ color: "#1e3a8a" }}
        >
          {item.organization}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="inline-block ml-1 mb-1 opacity-1 md:opacity-0 group-hover:opacity-100 transition-opacity"
            aria-hidden="true"
            whileHover={{ color: "#1e3a8a" }}
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </motion.svg>
        </motion.a>

        <span className="inline-block text-white/80 before:content-['•'] before:mx-2">
          {item.orgLocation}
        </span>
      </span>

      <ul className="mt-4 list-disc list-inside text-white/80">
        {item.role[0].description?.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </div>
  )
}

export function HirarchyExperienceItem({ item } : { item: ExperienceItem}) {
  return (
    <div className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition">
      <p className="text-white/70">{item.totalPeriod}</p>
      <p className="text-xl font-semibold">{item.organization}</p>

      <span className="flex items-center">
        <motion.a 
          className="text-blue-600 group underline md:no-underline hover:underline" 
          href={item.orgUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ color: "#1e3a8a" }}
        >
          {item.organization}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="inline-block ml-1 mb-1 opacity-1 md:opacity-0 group-hover:opacity-100 transition-opacity"
            aria-hidden="true"
            whileHover={{ color: "#1e3a8a" }}
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </motion.svg>
        </motion.a>

        <span className="inline-block text-white/80 before:content-['•'] before:mx-2">
          {item.orgLocation}
        </span>
      </span>

      {item.role.map((role, i) => (
        <div key={i} className="relative ml-5 mt-4 pl-10">
          <span
            className="absolute top-0 left-0 w-1 h-full rounded-full bg-white/20"
          />
          <p className="text-lg font-medium">{role.title}</p>
          <span className="text-sm text-white/70">{role.period}</span>
          <ul className="mt-2 list-disc list-inside text-white/80">
            {role.description?.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
          { role.imageSrc && (
            <div className="mt-4 rounded-md overflow-hidden border border-white/20 max-w-fit">
              <motion.img 
                src={role.imageSrc} 
                alt={role.title} 
                className="object-cover"
                width={240}
                height={186}
                whileHover={{ scale: 1.05 }}
                onClick={() => {

                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
