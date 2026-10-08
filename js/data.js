/**
 * Portfolio content — edit this file to personalize the site.
 * Leave arrays empty or set section visibility flags to hide sections.
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Abdhul",
    displayName: "ABDHUL",
    role: "Student & Aspiring Software Developer",
    tagline: "Learning. Building. Improving.",
    email: "abdhul456@gmail.com",
    status: "Currently learning & building",
    bio:
      "Hi, I'm Abdhul, a student passionate about software development and technology. I enjoy learning new technologies, solving problems, and building useful digital experiences. I'm continuously improving my skills and turning what I learn into practical projects.",
    aboutIntro:
      "I'm a student focused on software development, combining coursework with hands-on projects. I care about writing clean code, understanding fundamentals, and growing into a capable developer who can contribute to real teams and products.",
  },

  navigation: [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "journey", label: "Journey" },
    { id: "contact", label: "Contact" },
  ],

  skills: [
    {
      category: "Languages & Markup",
      items: ["HTML", "CSS", "JavaScript", "Python"],
    },
    {
      category: "Tools & Frameworks",
      items: ["React", "TypeScript", "Git", "VS Code"],
    },
    {
      category: "Strengths",
      items: ["Responsive Design", "Problem Solving"],
    },
  ],

  projects: [
    {
      name: "Project Title One",
      description:
        "Brief description of what this project does and what you learned while building it. Replace with your own project details.",
      technologies: ["HTML", "CSS", "JavaScript"],
      liveUrl: "#",
      sourceUrl: "#",
    },
    {
      name: "Project Title Two",
      description:
        "Another placeholder project card. Describe the problem you solved and the outcome once you add a real project.",
      technologies: ["Python", "Git"],
      liveUrl: "#",
      sourceUrl: "#",
    },
    {
      name: "Project Title Three",
      description:
        "Use this template for portfolio pieces, coursework highlights, or personal experiments you want recruiters to see.",
      technologies: ["JavaScript", "Responsive Design"],
      liveUrl: "#",
      sourceUrl: "#",
    },
  ],

  learningJourney: [
    {
      title: "Programming Fundamentals",
      description: "Core concepts, logic, and problem-solving basics.",
    },
    {
      title: "Web Development",
      description: "HTML, CSS, JavaScript, and building for the browser.",
    },
    {
      title: "Building Projects",
      description: "Applying skills through small apps and portfolio work.",
    },
    {
      title: "Advanced Learning",
      description: "Frameworks, tooling, and deepening software craft.",
    },
  ],

  footer: {
    credit: "Designed & Built by Abdhul",
    copyright: "© 2026 Abdhul. All rights reserved.",
  },

  meta: {
    pageTitle: "Abdhul | Student & Aspiring Software Developer",
    themeColor: "#3b82f6",
  },
};
