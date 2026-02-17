export type Project = {
    title: string;
    description: string;
    techStack: string[];
    githubLink?: string;
}

export const projects: Project[] = [
    {
        title: "Personal Portfolio Website",
        description: "A personal portfolio website built with Next.js and Tailwind CSS to showcase my projects and skills.",
        techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "Resend"],
        githubLink: "https://github.com/Manas1227/manasPortfolio"
    },
    {
        title: "Cluedo Game Board",
        description: "A command-line version of the classic board game Cluedo (Clue) implemented in Python using object-oriented design. Players (human or AI) move between rooms, make suggestions, disprove others, and attempt to solve the mystery of who committed the crime, with what weapon, and in which room.",
        techStack: ["Python", "pytest"],
        githubLink: "https://github.com/Manas1227/cluedo_game"
    },
    {
        title: "Wine Quality Prediction",
        description: "Developed a scalable wine quality prediction model on AWS using Spark, implementing parallel data processing, cloud-based ML training and containerized environments for portable, reproducible deployment.",
        techStack: ["Python", "PySpark", "Spark MLlib", "Apache Spark", "AWS", "Docker"],
        githubLink: "https://github.com/Manas1227/cs643-853-pa2-mb2332"
    },
    {
        title: "MenWed Showroom: Automated Customer Engagement App",
        description: "I built a specialized Customer Relationship Management tool that does more than just store data. It ensures long-term relationships by capturing key dates like engagement and wedding anniversaries at the point of sale, the app acts as a digital personal assistant for the brand.",
        techStack: ["Java", "Android Studio", "Firebase", "XML"],
    },
]