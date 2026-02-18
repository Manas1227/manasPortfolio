export type TechStack = {
    field: string,
    stacks: {
        name: string
        src: string
    }[]
}

export const techGroups: TechStack[] = [
  {
    field: "Languages",
    stacks: [
      { name: "Java", src: "/tech/java.svg" },
      { name: "JavaScript", src: "/tech/javascript.svg" },
      { name: "TypeScript", src: "/tech/typescript.svg" },
      { name: "Python", src: "/tech/python.svg" },
      { name: "SQL", src: "/tech/sql.svg" },
    ],
  },
  {
    field: "Web Development",
    stacks: [
      { name: "Node.js", src: "/tech/nodejs.svg" },
      { name: "React.js", src: "/tech/react.svg" },
      { name: "Express", src: "/tech/express.svg" },
      { name: "Next.js", src: "/tech/nextjs.svg" },
      { name: "HTML", src: "/tech/html.svg" },
      { name: "CSS", src: "/tech/css.svg" },
      { name: "Socket.io", src: "/tech/socket.svg" },
    ],
  },
  {
    field: "Databases",
    stacks: [
      { name: "MySQL", src: "/tech/mysql.svg" },
      { name: "PostgreSQL", src: "/tech/postgresql.svg" },
      { name: "DynamoDB", src: "/tech/dynamodb.svg" },
      { name: "MongoDB", src: "/tech/mongodb.svg" },
      { name: "Redis", src: "/tech/redis.svg" },
    ],
  },
  {
    field: "Cloud Platforms",
    stacks: [
      { name: "AWS", src: "/tech/aws.svg" },
      { name: "IBM Cloud", src: "/tech/ibm.svg" },
      { name: "Serverless", src: "/tech/serverless.svg" },
    ],
  },
  {
    field: "Testing",
    stacks: [
      { name: "Jest", src: "/tech/jest.svg" },
      { name: "Mocha", src: "/tech/mocha.svg" },
    ]
  },
  {
    field: "Data Analytics & ML",
    stacks: [
      { name: "Pandas", src: "/tech/pandas.svg" },
      { name: "NumPy", src: "/tech/numpy.svg" },
      { name: "Scikit-Learn", src: "/tech/scikitlearn.svg" },
      { name: "Tableau", src: "/tech/tableau.svg" },
      { name: "Power BI", src: "/tech/powerbi.svg" },
    ]
  },
  {
    field: "DevOps & Tools",
    stacks: [
      { name: "Docker", src: "/tech/docker.svg" },
      { name: "Git", src: "/tech/git.svg" },
      { name: "Agile", src: "/tech/agile.svg" },
    ],
  }
];