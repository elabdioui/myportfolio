// Constants for better maintainability
export const SITE_CONFIG = {
  name: "Haitham El Abdioui",
  title: "Haitham El Abdioui - Software Engineering Student",
  description: "Passionate software engineering student specializing in full-stack development, cloud technologies, and modern web frameworks. Available for internship opportunities.",
  url: "https://haithamelabdioui.dev",
  author: "Haitham El Abdioui",
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "React Developer",
    "ASP.NET Developer",
    "Python Developer",
    "Cloud Technologies",
    "Web Development",
    "Morocco Developer",
    "EMSI Student",
    "Internship"
  ],
  social: {
    github: "https://github.com/elabdioui",
    linkedin: "https://www.linkedin.com/in/haithamelabdioui/",
    email: "elabdiouihaitham@gmail.com",
    discord: "haitham1620"
  },
  location: "Casablanca, Morocco",
  availability: "Available for Internship - July 2025"
} as const;

export const ANIMATION_VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8 }
  },
  fadeInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8 }
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const;