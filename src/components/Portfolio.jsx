import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';
import Cursor from './Cursor';
import ScrollProgress from './ScrollProgress';
import MouseSpotlight from './MouseSpotlight';
import SectionRail from './SectionRail';
import CoordinateDisplay from './CoordinateDisplay';
import SoundVisualizer from './SoundVisualizer';
import BackToTop from './BackToTop';

export default function Portfolio() {
  return (
    <div className="relative min-h-screen bg-ink text-mist animate-fade-in">
      <div className="bg-fixed-layer" aria-hidden />
      <MouseSpotlight />
      <ScrollProgress />
      <Cursor />
      <SectionRail />
      <CoordinateDisplay />
      <SoundVisualizer />
      <BackToTop />
      <Navbar />
      <main>
        <Hero />
        <div className="divider" />
        <About />
        <div className="divider" />
        <Skills />
        <div className="divider" />
        <Projects />
        <div className="divider" />
        <Contact />
      </main>
    </div>
  );
}
