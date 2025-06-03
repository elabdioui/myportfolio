import { About } from './components/About';
import { Contact } from './components/Contact';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Projects } from './components/Projects';
import { ScrollToTop } from './components/ScrollToTop';
import { Skills } from './components/Skills';

function App() {
  return (
    <div className="font-['Poppins']">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <ScrollToTop />
    </div>
  );
}

export default App;