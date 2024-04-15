const projectsData = [
  {
    id: 1,
    name: "Planidea",
    open: true,
    complete: true,
    description: "Planidea was built to bridge the gap between skilled individuals looking to share their expertise and learners eager to engage.",
    features:
      "Successfully planned, implemented, and tested the project as a group within the She Codes Plus Cohort 2023/24, utilising agile methodology throughout the entire development process.",
    techStack: {
      main: ["Django", "Python", "JavaScript", "React"],
      sub: ["TailwindCSS"]
    },
    video: "planidea.mp4",
    demo: "https://planidea.netlify.app/",
    code: "https://github.com/SheCodesAus/2024_exception_al_frontend",
    note: "* To log in as a admin, use username: admin_2 password: Password1!<br><i>**This project was the final group project for the She Codes Plus 2023/24.</i>",
  },
  {
    id: 2,
    name: "Hackeraiser",
    open: true,
    complete: true,
    description: "A crowdfunding platform to support and share fun tech ideas/projects",
    features:
      "Full-Stack Development; Built using Django Rest Framework (DRF) for the backend and React for the frontend.<br>Project/pledge submission based on user permission.",
    techStack: {
      main: ["Python", "Django", "JavaScript", "React"],
      sub: [ "CSS"]
    },
    video: "hackeraiser.mp4",
    demo: "https://hackeraiser.netlify.app/",
    code: "https://github.com/suanTech/crowdfunding-frontend",
  },
  {
    id: 3,
    name: "project-managed",
    open: true,
    complete: false,
    description:
      "Full-stack web application for daily task and project management. <i>**work in progress</i>",
    features:
      "CRUD operations (add, read, update, delete) support for tasks and projects. <br>Implement user authorization using JWT. <br> Utilize middleware in the edge runtime to handle session management by saving and accessing cookies.",
    techStack: {
      main: ["Next.js", "TypeScript", "SCSS"],
      sub: ["Prisma"],
    },
    video: "project-managed-video.mp4",
    demo: "https://project-managed-app.vercel.app/",
    code: "https://github.com/suanTech/project-managed-app",
    note: "*** To log in as a guest, use email: user@email.com password: password",
  },
  {
    id: 4,
    name: "tiny post",
    open: false,
    complete: true,
    description:
      "Full-stack minimalist blog app that allows users to publish and share their own blog post while interacting with others using commenting system.",
    features:
      "Implement sign in with google account using NextAuth/Auth0 <br>Enhance error handling with React Query + React Hot Toast",
    techStack: {
      main: ["Next.js", "TypeScript", "SCSS"],
      sub: ["React-Query", "Prisma"],
    },
    video: "tiny-post-video.mp4",
    demo: "https://tiny-post-app.vercel.app/",
    code: "https://github.com/suanTech/tiny-post-app",
  },
  {
    id: 5,
    name: "dictionary web app",
    open: false,
    complete: true,
    description: "Dictianary web application built with React using REST API",
    features:
      "Implement error handling with form validation and a custom 404 page.<br>Apply global styles and themes to manage consistent styles.<br>Create a responsive layout for different screen sizes.<br>Integrate a dark/light theme switcher to enable users to switch between different color schemes dynamically.<br>Enable a dropdown menu for switching the body font.",
    techStack: {
      main: ["React", "styled-components"],
      sub: ["Axios", "REST API"],
    },
    video: "dictionary-video.mp4",
    demo: "https://dictionary-web-app-react.netlify.app/",
    code: "https://github.com/suanTech/react-dictionary-app",
  },
  {
    id: 6,
    name: "random password generator",
    open: false,
    complete: true,
    description: "Generate a password based on the selected inclusion options",
    features:
      "Provide multiple inclusion options for user selection.<br>Enable the ability to copy to clipboard.<br>Allow adjustable password length.",
    techStack: {
      main: ["React", "SCSS"],
    },
    video: "random-pw-generator-video.mp4",
    demo: "https://random-pw-generator-app.vercel.app/",
    code: "https://github.com/suanTech/random-pw-generator-app",
  },
];

export default projectsData;