"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { withBasePath } from "@/lib/basePath";
import Link from "next/link";

const LIBRARIES = ["Next.js", "Tailwind CSS", "Framer Motion", "Github Pages"];

const GETINTOUCH = [
  {name: "Email", image: "/tech/email_wb.svg", href: "mailto:manasbhut@gmail.com"},
  {name: "LinkedIn", image: "/tech/linkedin_wb.svg", href: "https://www.linkedin.com/in/manas-bhut-6aa0931a7/"},
  {name: "GitHub", image: "/tech/github_wb.svg", href: "https://github.com/Manas1227"},
]

const LOCATION = [
  {title: "Current Location", data: "New Jersey, USA"},
  {title: "Work Preference", data: "Remote & On-site"},
  {title: "Travel", data: "Open to relocation"},
]

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      v_name: formData.get("visiter_name"),
      v_email: formData.get("visiter_email"),
      v_message: formData.get("visiter_message"),
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Contact-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if(!res.ok) throw new Error("Failed to send message.");

      setStatus("Message sent successfully!");
      form.reset();
    } catch (error) {
      setStatus("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const rowVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative min-h-screen text-white max-w-7xl mx-auto px-6 py-24 grid gap-y-[2vh]">

      {/* ROW-1 */}
      <motion.div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-16">
          {/* COL-1 HEADER */}
          <motion.h1
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={rowVariant}
              className="text-4xl md:text-5xl font-bold text-center"
          >
              Let's Connect! 📬
          </motion.h1>

          {/* COL-2 FORM */}
          <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={rowVariant}
              className="w-full flex flex-col gap-4"
          >
              <input
                type="text"
                name="visiter_name"
                placeholder="Your Name"
                maxLength={20}
                className="w-full px-4 py-3 rounded-lg bg-white/10 
                          border border-white/20 placeholder-gray-400 
                          focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <input
                type="email"
                name="visiter_email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg bg-white/10 
                          outline-none border border-white/20 placeholder-gray-400
                          focus:border-none focus:ring-2 focus:ring-teal-400
                          invalid:text-pink-400 invalid:focus:ring-pink-400 invalid:ring-pink-400 invalid:border-pink-400"
              />
              <textarea
                name="visiter_message"
                placeholder="Your Message"
                maxLength={1000}
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-white/10 
                          border border-white/20 placeholder-gray-400 
                          focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
              />
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(20,184,166,0.4)" }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-6 py-3 mt-2 bg-teal-500 rounded-lg text-black font-semibold transition-all"
              >
                {loading ? "Sending..." : "Send Message"}
              </motion.button>
              {status && status.includes("successfully") && <p className="text-sm text-teal-400 text-center mt-2">{status}</p>}
              {status && status.includes("wrong") && <p className="text-sm text-pink-400 text-center mt-2">{status}</p>}
          </motion.form>
      </motion.div>
      
      {/* ROW-2 */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_2fr_3fr] gap-6">
        {/* COL-1 Get in touch */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={rowVariant}
          className="flex flex-col items-center gap-4"
        >
          <span className="gray-m-text">
            Get in touch
          </span>

          {/* Links */}
          {GETINTOUCH.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg
                        hover:scale-110 transition-transform duration-200 hover:bg-teal-500/10
                        min-w-36"
            >
              <img src={withBasePath(link.image)} alt={link.name} className="w-5 h-5"/>
              {link.name}
            </motion.a>
          ))}

          {/* Resume */}
          <motion.a
            href={withBasePath("/Your_Resume.pdf")}
            download
            className="flex items-center px-4 py-2 bg-white/10 rounded-lg
                      hover:scale-110 transition-transform duration-200 hover:bg-teal-500 hover:text-black"
          >
            Download Resume
          </motion.a>
        </motion.div>

        {/* COL-2 Used Libraries */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={rowVariant}
          className="flex flex-col items-center gap-4"
        >
          <span className="gray-m-text">
            Made with ❤️ using
          </span>
          {LIBRARIES.map((lib) => (
            <motion.div
              key={lib}
              className="px-4 py-2
                        text-xm text-white/90 text-center
                        hover:scale-110 transition-transform duration-200 hover:bg-white/10 
                        min-w-36 rounded-lg"
            >
              {lib}
            </motion.div>
          ))}
        </motion.div>

        {/* COL-3 Location & Work */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={rowVariant}
          className="flex flex-col item-center gap-4"
        >
          <span className="gray-m-text">
            Location & Work Preferance
          </span>
          
          {LOCATION.map((l) => (
            <motion.div
              key={l.title}
              className="flex item-center justify-between px-4 py-2"
            >
              <span className="gray-s-text">{l.title}</span>
              <span>{l.data}</span>
            </motion.div>  
          ))}

          <div className="relative w-full">
            {/* Blinking Green Dot */}
            <span className="absolute -top-1 -right-1 flex border-l-8 border-b-8 border-transparent">
              <span className="absolute inset-0 rounded bg-green-400 opacity-75 animate-ping"></span>
              <span className="relative h-4 w-4 m-auto rounded-full bg-green-500"></span>
            </span>

            {/* Available Box */}
            <span className="block px-4 py-2 bg-white/5 rounded-lg text-center">
              Available to work
            </span>
          </div>
        </motion.div>
      </div>
      
      {/* ROW-3 */}
      <motion.div
        className="flex item-center justify-around items-end"
      >
        <span className="select-none">© 2026 Manas Bhut</span>
        <Link href="/">
          <motion.button
            className="
                    px-6 py-2
                    text-xm text-white/90 flex-shrink-0
                    hover:scale-110 transition-transform duration-200 hover:bg-teal-500/20 rounded-lg
                    hover:animate-pulse"
          >
            Back to Top 
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}
