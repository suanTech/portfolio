const projectsData = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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