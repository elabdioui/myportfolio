import { useEffect } from 'react';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Projects } from './components/Projects';
import { ScrollToTop } from './components/ScrollToTop';
import { Skills } from './components/Skills';
import { SEOHead } from './components/SEO/SEOHead';
import { StarField } from './components/UI/StarField';
import { SITE_CONFIG } from './utils/constants';

function App() {
  useEffect(() => {
    // Performance optimization: Remove unused CSS
    const removeUnusedStyles = () => {
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
      stylesheets.forEach(sheet => {
        if (sheet.getAttribute('href')?.includes('unused')) {
          sheet.remove();
        }
      });
    };

    // Lazy load non-critical resources
    const lazyLoadResources = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        observer.observe(img);
      });
    };

    removeUnusedStyles();
    lazyLoadResources();
  }, []);

  return (
    <>
      <SEOHead 
        title={SITE_CONFIG.title}
        description={SITE_CONFIG.description}
        keywords={SITE_CONFIG.keywords}
        url={SITE_CONFIG.url}
      />
      
      <div className="font-['Poppins'] bg-[#0B1120] relative min-h-screen">
        {/* Optimized Animated Stars Background */}
        <StarField count={100} className="fixed inset-0 z-0" />

        {/* Content */}
        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </main>
          <ScrollToTop />
        </div>

        {/* Add animation keyframes */}
        <style>{`
          @keyframes twinkle {
            0% { opacity: 0.3; transform: scale(1); }
            100% { opacity: 0.8; transform: scale(1.5); }
          }
        `}</style>
      </div>
    </>
  );
}

export default App;