"use client";

import { motion, Variants } from "framer-motion";
import { withBasePath } from "@/lib/basePath";

const techGroups = [
  {
    field: "Languages",
    stacks: [
      { name: "Java", src: withBasePath("/tech/java.svg") },
      { name: "JavaScript", src: withBasePath("/tech/javascript.svg") },
      { name: "TypeScript", src: withBasePath("/tech/typescript.svg") },
      { name: "Python", src: withBasePath("/tech/python.svg") },
      { name: "SQL", src: withBasePath("/tech/sql.svg") },
    ],
  },
  {
    field: "Web Development",
    stacks: [
      { name: "Node.js", src: withBasePath("/tech/nodejs.svg") },
      { name: "React.js", src: withBasePath("/tech/react.svg") },
      { name: "Express", src: withBasePath("/tech/express.svg") },
      { name: "Next.js", src: withBasePath("/tech/nextjs.svg") },
      { name: "HTML", src: withBasePath("/tech/html.svg") },
      { name: "CSS", src: withBasePath("/tech/css.svg") },
      { name: "Socket.io", src: withBasePath("/tech/socket.svg") },
    ],
  },
  {
    field: "Databases",
    stacks: [
      { name: "MySQL", src: withBasePath("/tech/mysql.svg") },
      { name: "PostgreSQL", src: withBasePath("/tech/postgresql.svg") },
      { name: "DynamoDB", src: withBasePath("/tech/dynamodb.svg") },
      { name: "MongoDB", src: withBasePath("/tech/mongodb.svg") },
      { name: "Redis", src: withBasePath("/tech/redis.svg") },
    ],
  },
  {
    field: "Cloud Platforms",
    stacks: [
      { name: "AWS", src: withBasePath("/tech/aws.svg") },
      { name: "IBM Cloud", src: withBasePath("/tech/ibm.svg") },
      { name: "Serverless", src: withBasePath("/tech/serverless.svg") },
    ],
  },
  {
    field: "Testing",
    stacks: [
      { name: "Jest", src: withBasePath("/tech/jest.svg") },
      { name: "Mocha", src: withBasePath("/tech/mocha.svg") },
    ]
  },
  {
    field: "Data Analytics & ML",
    stacks: [
      { name: "Pandas", src: withBasePath("/tech/pandas.svg") },
      { name: "NumPy", src: withBasePath("/tech/numpy.svg") },
      { name: "Scikit-Learn", src: withBasePath("/tech/scikitlearn.svg") },
      { name: "Tableau", src: withBasePath("/tech/tableau.svg") },
      { name: "Power BI", src: withBasePath("/tech/powerbi.svg") },
    ]
  },
  {
    field: "DevOps & Tools",
    stacks: [
      { name: "Docker", src: withBasePath("/tech/docker.svg") },
      { name: "Git", src: withBasePath("/tech/git.svg") },
      { name: "Agile", src: withBasePath("/tech/agile.svg") },
    ],
  }
];

const curtainVariant: Variants = {
  hidden: {
    opacity: 0,
    scaleY: 0,
  },
  visible: (i: number) => ({
    opacity: 1,
    scaleY: 1,
    transition: {
      stiffness: 120,
      damping: 18,
      delay: i * 0.15,
    },
  }),
};


export default function AboutSection() {
  return (
    <section className="relative min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col gap-y-[2vh]">

        {/* ROW 1: GREETING */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold"
        >
          Hello <span className="inline-block animate-wave hover:animate-none">👋</span> I build scalable systems with clean UI and reliable backend.
        </motion.h1>

        {/* ROW 2: CONTENT + ANIMATION */}
        <div className="grid grid-cols-1 md:grid-cols-[5fr_2fr] gap-16 items-center">

          {/* Left: Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 text-1xl md:text-2xl"
          >
            <p className="text-gray-300 leading-relaxed">
              I’m a software developer who enjoys building reliable, 
              scalable systems and working across the backend, cloud, and overall app workflow. 
              I’ve spent the last couple of years contributing to web applications, 
              improving performance, and supporting team processes in fast‑moving environments.
            </p>

            <p className="text-gray-300 leading-relaxed">
              I’m also expanding into data analytics and machine learning through my graduate studies, 
              adding a stronger data perspective to my engineering work.
            </p>
          </motion.div>

          {/* Right: Animated visual */}
          <div className="flex item-center justify-center w-full">
            <motion.img
                src={withBasePath("/MB_About.png")}
                alt="Profile Picture"
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotateY: 0,
                    y: [0, -10, 0] // Floating animation
                }}
                transition={{ 
                    duration: 0.8, 
                    delay: 0.1,
                    y: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
                whileHover={{scale: 1.1, rotateY: 10}}
                className="w-44 h-60 md:w-64 md:h-80 rounded-lg relative z-10"
                style={{
                    maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%), linear-gradient(to right, transparent 10%, black 20%, black 80%, transparent 90%)',
                    maskComposite: 'intersect',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%)',
                    WebkitMaskComposite: 'source-in'
                }}
            />
          </div>
        </div>

        {/* ROW 3: SKILL HIERARCHY */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4">
          <span className="gray-m-text">
            Tools & technologies I worked with
          </span>

          <div
            className="w-full mx-auto overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          >
            <motion.div
              className="flex gap-4 whitespace-nowrap"
              animate={{ x: ["0%", "-80%"] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            >
              {[...techGroups, ...techGroups].map((group, idx) => (
                <motion.div
                  key={idx}
                  custom={idx}
                  variants={curtainVariant}
                  initial="hidden"
                  animate="visible"
                  style={{ transformOrigin: "right" }}
                  className="
                    w-64 flex-shrink-0
                    glass rounded-xl px-5 py-4
                    flex flex-col gap-3"
                >
                  {/* Tech field label */}
                  <span className="text-sm uppercase text-center tracking-widest text-teal-400/80">
                    {group.field}
                  </span>
          
                  {/* Stack pills */}
                  <div className="flex flex-col gap-2">
                    {group.stacks.map((tech) => (
                      <div
                        key={tech.name}
                        className="flex items-center gap-2 px-3 py-1
                                   text-xm text-white/90 flex-shrink-0
                                   hover:scale-110 transition-transform duration-200 hover:bg-white/10 rounded-full p-2"
                      >
                        <motion.img
                          src={tech.src}
                          alt={tech.name}
                          width={20}
                          height={20}
                        />
                        {tech.name}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
