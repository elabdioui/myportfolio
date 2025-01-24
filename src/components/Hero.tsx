import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Code2, Github, Linkedin, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Hero() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-black to-purple-900 text-white relative overflow-hidden">
      <motion.div
        className="w-8 h-8 bg-white rounded-full fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />

      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 bg-white rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              opacity: Math.random() * 0.5 + 0.25,
            }}
          />
        ))}
      </div>

      <motion.button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2 bg-white bg-opacity-10 rounded-full backdrop-blur-sm"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isDark ? (
          <Sun className="w-6 h-6 text-yellow-400" />
        ) : (
          <Moon className="w-6 h-6 text-blue-400" />
        )}
      </motion.button>
      
      <div className="container mx-auto px-4 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-6xl md:text-7xl font-bold mb-6"
            animate={{ 
              rotateX: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotateX: { duration: 2, repeat: Infinity },
              scale: { duration: 4, repeat: Infinity },
            }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              John Doe
            </span>
          </motion.h1>
          <motion.h2 
            className="text-3xl mb-8"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Web Development Student
          </motion.h2>

          <motion.a
            href="#projects"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-medium relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">View My Work</span>
            <motion.div
              className="absolute inset-0 bg-white opacity-20"
              initial={{ scale: 0, x: "-50%", y: "-50%" }}
              whileHover={{ scale: 1.5 }}
              transition={{ duration: 0.4 }}
            />
          </motion.a>
        </motion.div>

        <motion.div
          className="flex justify-center gap-6 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[
            { icon: <Github className="w-8 h-8" />, href: "https://github.com" },
            { icon: <Linkedin className="w-8 h-8" />, href: "https://linkedin.com" },
            { icon: <Code2 className="w-8 h-8" />, href: "#projects" },
          ].map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              className="relative p-2 bg-white bg-opacity-10 rounded-full backdrop-blur-sm"
              whileHover={{ scale: 1.1, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {item.icon}
              <motion.div
                className="absolute inset-0 bg-white rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.5, opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <a href="#about" className="text-white opacity-50 hover:opacity-100 transition-opacity">
          <motion.div
            className="w-6 h-10 border-2 border-white rounded-full p-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="w-1 h-2 bg-white rounded-full mx-auto"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}