import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Code2, Github, Linkedin, Moon, Sun, Download, MapPin } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

export function Hero() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const [isDark, setIsDark] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
      cursorX.set(clientX - 16);
      cursorY.set(clientY - 16);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const nameCharacters = "Haitham El Abdioui".split("");
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.5,
      },
    },
  };

  const characterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  const magneticRef = useRef(null);
  const handleMagneticMove = (e) => {
    const magnetic = magneticRef.current;
    if (!magnetic) return;
    
    const { left, top, width, height } = magnetic.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = 100;
    
    if (distance < maxDistance) {
      const x = (deltaX / maxDistance) * 15;
      const y = (deltaY / maxDistance) * 15;
      magnetic.style.transform = `translate(${x}px, ${y}px)`;
    } else {
      magnetic.style.transform = 'translate(0px, 0px)';
    }
  };

  const resetMagnetic = () => {
    if (magneticRef.current) {
      magneticRef.current.style.transform = 'translate(0px, 0px)';
    }
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden"
      ref={containerRef}
    >
      {/* Stars Background */}
      <div className="absolute inset-0">
        {[...Array(200)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Nebula Effects */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`nebula-${i}`}
            className="absolute bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"
            style={{
              width: Math.random() * 500 + 300,
              height: Math.random() * 500 + 300,
              borderRadius: '50%',
              filter: 'blur(100px)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="w-8 h-8 bg-white rounded-full"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.div>

      {/* Theme Toggle */}
      <motion.button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isDark ? "moon" : "sun"}
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            {isDark ? (
              <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6 text-blue-400" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Main Content */}
      <div className="container mx-auto px-4 text-center z-10 max-w-6xl mt-20 md:mt-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
          }}
        >
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Hello, I'm
          </motion.p>

          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 aurora-text glow-effect leading-tight"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {nameCharacters.map((char, index) => (
              <motion.span
                key={index}
                variants={characterVariants}
                className="inline-block"
                style={{
                  textShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.h2 
            className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8,
              delay: 0.8,
              type: "spring",
              stiffness: 200,
            }}
          >
            Software Engineering Student
          </motion.h2>

          <motion.div
            className="max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
              Passionate about creating innovative web solutions with expertise in 
              <motion.span 
                className="text-blue-400 font-semibold"
                whileHover={{ scale: 1.1 }}
              > Full-Stack Development</motion.span>, 
              <motion.span 
                className="text-purple-400 font-semibold"
                whileHover={{ scale: 1.1 }}
              > Cloud Technologies</motion.span>, and 
              <motion.span 
                className="text-pink-400 font-semibold"
                whileHover={{ scale: 1.1 }}
              > Modern Frameworks</motion.span>.
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
            <motion.div
              ref={magneticRef}
              onMouseMove={handleMagneticMove}
              onMouseLeave={resetMagnetic}
              className="relative"
            >
              <motion.a
                href="#projects"
                className="aurora-border group block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative px-8 py-4 bg-black rounded-[48px] font-semibold text-white flex items-center gap-2 group-hover:bg-gray-900 transition-colors overflow-hidden">
                  <Code2 className="w-5 h-5" />
                  View My Work
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                    animate={{
                      x: ["0%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                </div>
              </motion.a>
            </motion.div>

            <motion.a
              href="#contact"
              className="relative px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full font-semibold text-white hover:bg-white/10 transition-all flex items-center gap-2 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
              Download CV
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 2, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
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
                className={`relative p-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 transition-all duration-300 ${item.color} overflow-hidden`}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 360,
                }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 1.6 + index * 0.1 }}
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
        animate={{ 
          y: [0, 10, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <a 
          href="#about" 
          className="text-white/60 hover:text-white/100 transition-colors"
          onMouseEnter={(e) => {
            if (magneticRef.current) {
              handleMagneticMove(e);
            }
          }}
          onMouseLeave={resetMagnetic}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full p-1 backdrop-blur-sm"
            whileHover={{ borderColor: "rgba(255, 255, 255, 0.8)" }}
          >
            <motion.div
              className="w-1 h-2 bg-white/60 rounded-full mx-auto"
              animate={{ y: [0, 16, 0] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </a>
      </motion.div>

      <style jsx>{`
        @keyframes aurora {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
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
          background-size: 200% 200%;
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
          background-size: 200% 200%;
          animation: aurora 50s ease-in-out infinite;
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
    </section>
  );
}