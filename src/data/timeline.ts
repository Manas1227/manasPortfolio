export type EducationItem = {
    type: "education";
    period: string;
    title: string;
    grade: string;
    organization: string;
    orgUrl: string;
    orgLocation: string;
    description: string[];
    orgLogo: string;
}

export type ExperienceItem = {
    type: "experience";
    totalPeriod: string;
    organization: string;
    orgUrl: string;
    orgLocation: string;
    role: {
        title: string;
        period: string;
        description?: string[];
        imageSrc?: string;
    }[];
    orgLogo: string;
}

export type TimelineItem = EducationItem | ExperienceItem;

export const timeline: TimelineItem[] = [
  {
    type: "experience",
    totalPeriod: "December 2024 – Present",
    organization: "Uber Technologies Inc.",
    orgUrl: "https://www.uber.com/",
    orgLocation: "Remote, USA", 
    orgLogo: "/timeline/uber.svg",
    role: [
        {
            title: "Software Developer",
            period: "December 2024 – Present",
            description: [
                "Built a real‑time LLM intent‑classification system with Python and OpenAI, automating thousands of daily routing decisions.",
                "Scaled event‑driven pipelines using Node.js and Kafka to handle millions of daily events efficiently.",
                "Designed a GraphQL federation layer with TypeScript and Apollo to unify 14+ services and cut cross‑service latency.",
                "Developed demand‑forecasting models with scikit‑learn to support data‑driven surge pricing decisions.",
                "Reduced API latency from 900 ms to 140 ms through Redis caching and optimized query execution.",
            ],
        }
    ]

  },{
    type: "education",
    period: "January 2024 - December 2025",
    title: "M.S. in Computer Science",
    grade: "GPA: 3.75/4.0",
    organization: "New Jersey Institute of Technology",
    orgUrl: "http://www.njit.edu/",
    orgLocation: "Newark, NJ",
    orgLogo: "/timeline/njit.svg",
    description: [
        "Studied advanced topics in Java programming, database design, cloud computing, and operating systems.",
        "Strengthened core CS foundations through data structures, algorithms, and higher‑level internet protocols.",
        "Expanded into data analytics, machine learning, data mining, and artificial intelligence through hands‑on coursework.",

    ],
  },{
    type: "experience",
    totalPeriod: "April 2023 - December 2023",
    organization: "JP Morgan Chase",
    orgUrl: "https://www.jpmorganchase.com/",
    orgLocation: "Remote, USA", 
    orgLogo: "/timeline/jpmorgan.svg",
    role: [
        {
            title: "Software Developer",
            period: "April 2023 - December 2023",
            description: [
                "Built microservices and UI workflows using Java, Spring Boot, React, and PostgreSQL to significantly reduce daily sync times.",
                "Automated CI/CD pipelines with GitLab, Docker, and Terraform to accelerate releases and improve deployment reliability.",
                "Implemented LLM‑powered document processing using OpenAI and LangChain to streamline legal reviews.",
                "Led a full‑stack migration from monolith to Kubernetes microservices with Helm deployments and team mentorship.",
            ],
        }
    ]

  },{
    type: "experience",
    totalPeriod: "June 2021 - March 2023",
    organization: "Techflitter Solutions Pvt. Ltd.",
    orgUrl: "https://thetfpl.com/",
    orgLocation: "Ahmedabad, India",
    orgLogo: "/timeline/tfpl.png",
    role: [
        {
            title: "Node.js Developer",
            period: "June 2021 - March 2023",
            description: [
                "Developed scalable SaaS features using Node.js and AWS services.",
                "Optimized DynamoDB queries and serverless functions for faster performance.",
                "Ensured reliable, stable releases through thorough unit, functional, and integration testing.",
                "Worked in an agile environment to deliver improvements quickly and collaboratively.",
            ],
        },
    ],
    },{
        type: "experience",
        totalPeriod: "January 2021 - June 2021",
        organization: "Raven Technolabs Pvt. Ltd.",
        orgUrl: "https://www.raventechnolabs.com/",
        orgLocation: "Ahmedabad, India",
        orgLogo: "/timeline/raven.svg",
        role: [
            {
                title: "MERN Stack Intern",
                period: "January 2021 - June 2021",
                description: [
                    "Developed REST APIs with Node.js and contributed to front‑end features using React.js, HTML, and CSS.",
                    "Supported the development of a CRM tool for managing PDF invoices and customer workflows.",
                ],
            },
        ],
    },{
        type: "education",
        period: "June 2017 - April 2021",
        title: "B.Tech in Computer Engineering",
        grade: "Grade: 8.27/10",
        organization: "Ganpat University",
        orgUrl: "https://www.ganpatuniversity.ac.in/",
        orgLocation: "Mehsana, India",
        orgLogo: "/timeline/guni.svg",
        description: [
            "Studied core computing fundamentals, from systems and architecture to data structures and software design.",
            "Built hands‑on projects using C/C++, Java, web technologies, and Android development.",
            "Gained experience across hardware and software to understand how systems operate end‑to‑end.",
        ],
    },
];