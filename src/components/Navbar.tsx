import { motion, useScroll, useTransform } from 'framer-motion';
import { Home, User, Briefcase, Code, Mail, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollY } = useScroll();
  
  // Transform scroll position to navbar opacity and blur
  const navbarOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95]);
  const navbarBlur = useTransform(scrollY, [0, 100], [10, 20]);

  const navItems = [
    { id: 'hero', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <User className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills', icon: <Code className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ];

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        if (section.element) {
          const { offsetTop, offsetHeight } = section.element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 hidden md:block"
        style={{
          opacity: navbarOpacity,
        }}
      >
        <motion.div
          className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-3 shadow-2xl"
          style={{
            backdropFilter: useTransform(navbarBlur, (blur) => `blur(${blur}px)`),
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeSection === item.id
                    ? 'text-white font-semibold'
                    : 'text-white/90 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon}
                <span className="hidden lg:inline">{item.label}</span>
                
                {/* Active indicator */}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-xl border border-blue-400/20"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Navbar */}
      <motion.nav
        className="fixed top-4 right-4 z-50 md:hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-2xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </motion.div>
        </motion.button>

        {/* Mobile Menu */}
        <motion.div
          className="absolute top-16 right-0 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            scale: isOpen ? 1 : 0.8,
            y: isOpen ? 0 : -20,
          }}
          transition={{ duration: 0.3 }}
          style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        >
          <div className="py-2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full px-6 py-3 text-left text-sm font-medium transition-all duration-300 flex items-center gap-3 ${
                  activeSection === item.id
                    ? 'text-white font-semibold bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-l-2 border-blue-400'
                    : 'text-white/90 hover:text-white hover:bg-white/5'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isOpen ? 1 : 0,
                  x: isOpen ? 0 : -20,
                }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ x: 5 }}
              >
                {item.icon}
                {item.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Backdrop */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}