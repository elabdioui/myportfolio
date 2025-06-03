import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Code2, Github, Linkedin, Moon, Sun, Download, MapPin } from 'lucide-react';
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
  }, [cursorX, cursorY]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-black to-purple-900 text-white relative overflow-hidden">
      {/* Custom Aurora Text CSS */}
      <style jsx>{`
        @keyframes aurora {
          0%, 100% {
            background-position: 0% 50%;
          }
          25% {
            background-position: 100% 50%;
          }
          50% {
            background-position: 200% 50%;
          }
          75% {
            background-position: 300% 50%;
          }
        }
        
        @keyframes aurora-border {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .aurora-text {
          background: linear-gradient(
            45deg,
            #ff6b6b,
            #4ecdc4,
            #45b7d1,
            #96ceb4,
            #feca57,
            #ff9ff3,
            #54a0ff,
            #5f27cd,
            #00d2d3,
            #ff9f43,
            #ff6b6b
          );
          background-size: 400% 400%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: aurora 8s ease-in-out infinite;
          filter: brightness(1.2) contrast(1.1);
        }
        
        .aurora-border {
          background: linear-gradient(
            45deg,
            #ff6b6b,
            #54a0ff,
            #5f27cd
          );
          background-size: 300% 300%;
          animation: aurora-border 50s ease-in-out infinite;
          border-radius: 50px;
          padding: 2px;
        }
        
        .glow-effect {
          text-shadow: 
            0 0 20px rgba(79, 172, 254, 0.5),
            0 0 40px rgba(139, 92, 246, 0.3),
            0 0 60px rgba(236, 72, 153, 0.2);
        }
      `}</style>

      {/* Custom Cursor */}
      <motion.div
        className="w-8 h-8 bg-white rounded-full fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />

      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-white rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.8 + 0.2,
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
              scale: [0.5, 1.5, 0.5],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Theme Toggle */}
      <motion.button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-3 bg-white bg-opacity-10 rounded-full backdrop-blur-sm border border-white/20"
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <Sun className="w-6 h-6 text-yellow-400" />
        ) : (
          <Moon className="w-6 h-6 text-blue-400" />
        )}
      </motion.button>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 text-center z-10 max-w-6xl mt-20 md:mt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Greeting */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Hello, I'm
          </motion.p>

          {/* Aurora Name */}
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 aurora-text glow-effect leading-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          >
            Haitham El Abdioui
          </motion.h1>

          {/* Professional Title */}
          <motion.h2 
            className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: -0.1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Software Engineering Student
          </motion.h2>

          {/* Brief Description */}
          <motion.div
            className="max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
              Passionate about creating innovative web solutions with expertise in 
              <span className="text-blue-400 font-semibold"> Full-Stack Development</span>, 
              <span className="text-purple-400 font-semibold"> Cloud Technologies</span>, and 
              <span className="text-pink-400 font-semibold"> Modern Frameworks</span>.
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm md:text-base text-gray-400">
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05, color: "#60a5fa" }}
              >
                <MapPin className="w-4 h-4" />
                <span>Casablanca, Morocco</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05, color: "#a78bfa" }}
              >
                <Code2 className="w-4 h-4" />
                <span>Available for Internship</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.a
              href="#projects"
              className="aurora-border group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="px-8 py-4 bg-black rounded-[48px] font-semibold text-white flex items-center gap-2 group-hover:bg-gray-900 transition-colors">
                <Code2 className="w-5 h-5" />
                View My Work
              </div>
            </motion.a>

            <motion.a
              href="#contact"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full font-semibold text-white hover:bg-white/20 transition-all flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
              Download CV
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            {[
              { 
                icon: <Github className="w-7 h-7" />, 
                href: "https://github.com/elabdioui",
                label: "GitHub",
                color: "hover:text-gray-300"
              },
              { 
                icon: <Linkedin className="w-7 h-7" />, 
                href: "https://www.linkedin.com/in/haithamelabdioui/",
                label: "LinkedIn",
                color: "hover:text-blue-400"
              },
              { 
                icon: <Code2 className="w-7 h-7" />, 
                href: "#projects",
                label: "Projects",
                color: "hover:text-purple-400"
              },
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                aria-label={item.label}
                className={`relative p-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 transition-all duration-300 ${item.color}`}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 360,
                  backgroundColor: "rgba(255, 255, 255, 0.1)"
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ transitionDelay: `${1.6 + index * 0.1}s` }}
              >
                {item.icon}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        initial={{ opacity: 0 }}
        style={{ opacity: 1, transitionDelay: '2s' }}
      >
        <a href="#about" className="text-white/60 hover:text-white/100 transition-colors">
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full p-1 backdrop-blur-sm"
            whileHover={{ borderColor: "rgba(255, 255, 255, 0.8)" }}
          >
            <motion.div
              className="w-1 h-2 bg-white/60 rounded-full mx-auto"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}