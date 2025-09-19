
import {
  logo,
  backend,
  creator,
  mobile,
  web,
  github,
  menu,
  close,
  css,
  gearXpert,
  project2,
  project3,
  mysql,
  express,
  aws,
  mui,

  gsap,
  framer,
  figma,
  git,
  html,
  javascript,
  mongodb,
  nodejs,
  reactjs,
  redux,
  tailwind,
  threejs,
  firstTestimonial,
  secondTestimonial,
  thirdTestimonial,
} from '../assets'

import codiea from "../assets/company/codiea.png"
import enigmatix from '../assets/company/enigmatix.png'
import coding from '../assets/company/codingf.png'
// Import Tekisky separately
import tekisky from "../assets/company/tekisky.png";


export const navLinks = [


  {
    id: "about",
    title: "About",

  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "MERN-Stack Developer",
    icon: web,
  },
  {
    title: "Frontend Developer",
    icon: web,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Scaleable Designing",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  // {
  //   name: "Redux",
  //   icon: redux,
  // },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Material-UI",
    icon: mui,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "MySQL",
    icon: mysql,
  },
  
  {
    name: "Git",
    icon: git,
  },
  {
    name: "GitHub",
    icon: github,
  },
  
  // {
  //   name: "Framer Motion",
  //   icon: framer,
  // },
  
  
];


const experiences = [


  {
  title: "MERN Stack Developer (Associate)",
    company_name: "Coding First",
    iconBg: "#141414",
    icon:coding,
    date: "may 2025 - present",
    points: [
      "Built full-stack web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js).",
      "Designed and developed real-world features like authentication, CRUD operations, and dashboards.",
      "Ensured applications were scalable, responsive, and optimized for performance.",
      "Worked on end-to-end development, from database design to front-end integration.",
    ],
    },
   {

    title: "Front-End Developer",
    company_name: "Enigmatix.io",
    iconBg: "#383E56",
    icon:enigmatix,
    date: "May 2025 - Present",
    points: [
      "Developing interactive user interfaces using React.js for real-world projects.",
      "Implementing responsive designs to ensure cross-device compatibility.",
      "Collaborating with team members to debug and enhance application features.",
      "Focusing on writing clean, reusable, and maintainable React components.",
    ],
  },

  {
    title: "Junior Front-End Developer",
    company_name: "Codiea.io",
    iconBg: "#1E293B",
    icon: codiea,
    date: "2024",
    points: [
      "Learned the fundamentals of web development including HTML, CSS, and JavaScript.",
      "Built static and responsive web pages as the foundation of front-end skills.",
      "Practiced converting designs into functional, user-friendly interfaces.",
      "Gained confidence in creating clean layouts and interactive elements.",
    ],
  },
];


const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Huzaif proved me wrong.",
    name: "MD Mustaqeem",
    designation: "Ecommerce",
    company: "QuickMart",
    image: firstTestimonial,
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Huzaif does.",
    name: "Abdul Raheman",
    designation: "Ecommerce Business",
    company: "justbuyz",
    image: secondTestimonial,
  },
  {
    testimonial:
      "After Huzaif optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "James Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: thirdTestimonial,
  },
];

const projects = [
  
  {
    name: "Game1Pro (MERN + WebSockets)",
    description:
      "A real-time gaming results platform built with the MERN stack, integrated with WebSockets for live score updates, game queues, and interactive features. The site is deployed and live at game1pro.com.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "emailJs",
        color: "green-text-gradient",
      },
      {
        name: "Gsap",
        color: "pink-text-gradient",
      },
    ],
    image: gearXpert,
    source_code_link: "https://github.com/",
  },
  {
    name: "Real-Time Chat Application (MERN + Authentication):",
    description:
      "A chat app built with the MERN stack and Socket.IO, enabling instant messaging across multiple rooms with a secure login and authentication system powered by JWT.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "express",
        color: "white-text-gradient",
      },
      {
        name: "node",
        color: "green-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
    ],
    image: project3,
    source_code_link: "https://github.com/",
  },
  {
    name: "E-Commerce Store (MERN Stack)",
    description:
      "A full-stack online shopping application built with MongoDB, Express.js, React, and Node.js. It features product listings from a JSON/database, an interactive cart with live count and total price updates, and a seamless user experience with modern UI components.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "Css",
        color: "white-text-gradient",
      },
      {
        name: "node",
        color: "pink-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },

    ],
    image: project2,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
