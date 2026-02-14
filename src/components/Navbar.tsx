"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const links = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/journey", label: "Journey" },
]

export default function Navbar( { setExpandSearch } : { setExpandSearch: (value: boolean) => void }) {

    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const router = useRouter();

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
                <div className="font-bold text-lg tracking-wide">
                    <ModifiedLink href="/">
                        MB
                    </ModifiedLink>
                </div>

                {/* Divider */}
                <span className="w-px h-7 bg-white/20" />

                {/* Navigation Links */}
                <div className="flex gap-6 py-1 item-center text-sm">
                {links.map((link) => (
                    <ModifiedLink key={link.href} href={link.href}>
                        {link.label}
                    </ModifiedLink>
                ))}
                </div>

                <div onClick={() => setExpandSearch(true)}>
                    <ModifiedLink href="#">
                        AI Search
                    </ModifiedLink>
                </div>

                <div className="text-sm bg-[#00ffc81c] rounded-lg px-2 py-1">
                    <ModifiedLink href="/contact">
                        Contact
                    </ModifiedLink>
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
                <motion.button
                    animate={{ rotate: isOpen ? 360 : 0 }}
                    transition={{ duration: 0.10 }}
                    onClick={() => {
                        if (isOpen) {
                            router.push("/");
                            setIsOpen(false);
                        } else {
                            setIsOpen(true);
                        }
                    }}
                    className="px-4 py-3 font-bold tracking-wide text-center nav-hover"
                >
                    MB
                </motion.button>

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
                                className="text-sm"
                            >
                                {link.label}
                            </motion.a>
                        ))}
                        <div className="text-sm" onClick={() => setExpandSearch(true)}>
                            AI Search
                        </div>
                        <Link href="/contact" className="text-sm bg-[#00ffc81c] rounded-lg px-2 py-1" onClick={() => setIsOpen(false)}>
                            Contact
                        </Link>
                    </motion.div>
                )}
            </motion.div>
        </>
    );
}


function ModifiedLink({ href, children } : { href: string, children: string }) {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      className="relative block overflow-hidden nav-hover"
    >
      <motion.div
        variants={{
          initial: { y: 0 },
          hovered: { y: "-100%" }
        }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute inset-0"
        variants={{
          initial: { y: "100%" },
          hovered: { y: 0 }
        }}
      >
        {children}
      </motion.div>
    </motion.a>
  );
}