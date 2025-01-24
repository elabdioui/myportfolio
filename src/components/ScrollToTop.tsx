import { motion, useScroll } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsVisible(latest > 100);
    });
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      whileHover={{ scale: 1.1 }}
      onClick={scrollToTop}
    >
      <ArrowUp className="w-6 h-6" />
    </motion.button>
  );
}