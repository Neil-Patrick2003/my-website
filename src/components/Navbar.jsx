import { useEffect, useState } from 'react';
import { useSound } from '../context/SoundContext';
import { useActiveSection } from '../utils/useActiveSection';
import SoundToggle from './SoundToggle';
import NowPlaying from './NowPlaying';

const links = [
  { href: '#home',     label: 'Home' },
  { href: '#about',    label: 'About' },
  { href: '#skills',   label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact',  label: 'Contact' },
];

const SECTION_IDS = links.map((l) => l.href.slice(1));

export default function Navbar() {
  const { play } = useSound();
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(SECTION_IDS) || 'home';

  useEffect(() => {
    let raf = null;
    const update = () => {
      raf = null;
      const next = window.scrollY > 30;
      setScrolled((prev) => (prev !== next ? next : prev));
    };
    const onScroll = () => { if (raf == null) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}>
      <div className="mx-auto max-w-6xl px-6">
        <div className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${scrolled ? 'glass shadow-2xl' : ''}`}>
          {/* Logo */}
          <a
            href="#home"
            onClick={() => play('click')}
            onMouseEnter={() => play('hover')}
            className="flex items-center gap-3 group"
          >
            <span className="relative w-9 h-9 rounded-lg border border-mist/30 flex items-center justify-center group-hover:border-mist transition-colors">
              <span className="font-display text-glow text-xs font-medium tracking-tight">NP</span>
              <span className="absolute inset-0 rounded-lg border border-mist/0 group-hover:border-mist/40 group-hover:scale-110 transition-all" />
            </span>
            <span className="hidden sm:block font-mono text-mist text-xs tracking-[0.25em] uppercase">
              Neil.Patrick.M
            </span>
          </a>

          {/* Center links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onMouseEnter={() => play('hover')}
                onClick={() => play('click')}
                className={`relative px-4 py-2 text-[10px] tracking-[0.3em] uppercase transition-colors font-mono ${
                  active === l.href.slice(1) ? 'text-glow' : 'text-fog hover:text-mist'
                }`}
              >
                {l.label}
                {active === l.href.slice(1) && (
                  <span className="absolute left-1/2 -bottom-0.5 w-1 h-1 rounded-full bg-mist -translate-x-1/2 animate-pulse" />
                )}
              </a>
            ))}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2 md:gap-3">
            <NowPlaying />
            <SoundToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
