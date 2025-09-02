import { prisma } from "./lib/prisma";

async function main() {
  await prisma.job.createMany({
    data: [
      {
        title: "Frontend Developer for SaaS Dashboard",
        description:
          "We are looking for a skilled frontend developer to build a highly interactive SaaS dashboard. The dashboard should include data visualizations, real-time updates, responsive design, and integration with backend APIs. Experience with React, TypeScript, Redux, and charting libraries (like Chart.js or Recharts) is required. The role also involves performance optimization and writing clean, maintainable code.",
        category: "SOFTWARE_DEV",
        speciality: "FRONTEND_DEV",
        skills: [
          "React",
          "TypeScript",
          "Redux",
          "Chart.js",
          "Responsive Design",
        ],
        budget: 2500.0,
        numberOfProposals: 0,
        scopeSize: "MEDIUM",
        duration: "THREE_TO_SIX_MONTHS",
        experienceRequired: "INTERMEDIATE",
        connectsRequired: 15,
        clientId: "f0de3f6f-5e12-4e1b-ad20-f3819206c36f",
      },
      {
        title: "UX/UI Designer for E-commerce Website",
        description:
          "We need a creative UX/UI designer to revamp our e-commerce website. The project involves designing user flows, wireframes, high-fidelity mockups, and interactive prototypes. The designer must ensure intuitive navigation, mobile responsiveness, and visually appealing layouts. Experience with Figma, Adobe XD, and user testing is essential.",
        category: "DESIGN_CREATIVE",
        speciality: "UX_UI",
        skills: [
          "Figma",
          "Adobe XD",
          "Wireframing",
          "Prototyping",
          "User Testing",
        ],
        budget: 1000.0,
        numberOfProposals: 0,
        scopeSize: "SMALL",
        duration: "ONE_TO_THREE_MONTHS",
        experienceRequired: "INTERMEDIATE",
        connectsRequired: 10,
        clientId: "f0de3f6f-5e12-4e1b-ad20-f3819206c36f",
      },
      {
        title: "AI Chatbot Developer for Healthcare Platform",
        description:
          "We require an AI chatbot developer to create an intelligent assistant for a healthcare platform. The chatbot should handle patient queries, schedule appointments, provide symptom guidance, and integrate securely with existing APIs. Expertise in Python, NLP, machine learning models, and healthcare data compliance is required.",
        category: "SOFTWARE_DEV",
        speciality: "AI_CHATBOT",
        skills: [
          "Python",
          "NLP",
          "Machine Learning",
          "REST APIs",
          "HIPAA Compliance",
        ],
        budget: 3000.0,
        numberOfProposals: 0,
        scopeSize: "LARGE",
        duration: "MORE_THAN_SIX_MONTHS",
        experienceRequired: "EXPERT",
        connectsRequired: 20,
        clientId: "f0de3f6f-5e12-4e1b-ad20-f3819206c36f",
      },
      {
        title: "Database Developer for Analytics Platform",
        description:
          "Looking for a database expert to design and optimize a data warehouse for an analytics platform. Responsibilities include schema design, query optimization, indexing strategies, ETL pipelines, and ensuring high scalability for large datasets. Experience with PostgreSQL, MySQL, or similar relational databases, as well as knowledge of performance tuning, is required.",
        category: "DATA_SCIENCE",
        speciality: "DATABASE_DEV",
        skills: [
          "PostgreSQL",
          "MySQL",
          "ETL",
          "Indexing",
          "Query Optimization",
        ],
        budget: 2200.0,
        numberOfProposals: 0,
        scopeSize: "MEDIUM",
        duration: "THREE_TO_SIX_MONTHS",
        experienceRequired: "EXPERT",
        connectsRequired: 10,
        clientId: "f0de3f6f-5e12-4e1b-ad20-f3819206c36f",
      },
      {
        title: "Automation Engineer for Data Processing Scripts",
        description:
          "We are looking for a Python automation engineer to create scripts that clean, transform, and validate large datasets automatically. The candidate should have experience with Pandas, NumPy, ETL pipelines, and writing modular, reusable code. Knowledge of cloud storage and scheduling jobs (cron or Airflow) is a plus.",
        category: "ENGINEERING",
        speciality: "SCRIPTING_AUTOMATION",
        skills: ["Python", "Pandas", "NumPy", "ETL", "Airflow"],
        budget: 1200.0,
        numberOfProposals: 0,
        scopeSize: "SMALL",
        duration: "ONE_TO_THREE_MONTHS",
        experienceRequired: "INTERMEDIATE",
        connectsRequired: 5,
        clientId: "f0de3f6f-5e12-4e1b-ad20-f3819206c36f",
      },
    ],
  });

  console.log("✅ Jobs seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
