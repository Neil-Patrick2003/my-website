import { useEffect, useRef, useState } from 'react';
import { useSound } from '../context/SoundContext';
import Marquee from './Marquee';
import AnimatedCounter from './AnimatedCounter';
import Crosshair from './Crosshair';

const ROLES = [
  'Full-Stack Developer',
  'Frontend-Leaning Engineer',
  'React & Laravel Builder',
  'Mobile + Web Craftsman',
];

export default function Hero() {
  const { play } = useSound();
  const ref = useRef(null);
  const [text, setText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const role = ROLES[roleIdx];
    let timeout;
    if (!deleting && text === role) timeout = setTimeout(() => setDeleting(true), 1800);
    else if (deleting && text === '') {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    } else {
      timeout = setTimeout(() => {
        setText(deleting ? role.slice(0, text.length - 1) : role.slice(0, text.length + 1));
      }, deleting ? 40 : 80);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIdx]);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = d.getHours().toString().padStart(2, '0');
      const mm = d.getMinutes().toString().padStart(2, '0');
      const ss = d.getSeconds().toString().padStart(2, '0');
      setTime(`${hh}:${mm}:${ss}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24"
    >
      {/* Layered background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div
        className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full blur-3xl orb-1 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(196,196,204,0.10), transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl orb-2 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(74,74,88,0.6), transparent 70%)' }}
      />
      <div className="spotlight" />
      <div className="noise" />

      {/* Corner crosshairs */}
      <Crosshair size={14} className="absolute top-24 left-8" />
      <Crosshair size={14} className="absolute top-24 right-8" />
      <Crosshair size={14} className="absolute bottom-32 left-8" />
      <Crosshair size={14} className="absolute bottom-32 right-8" />

      {/* Vertical side label */}
      <div className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 text-fog/40 font-mono text-[10px] tracking-[0.5em] uppercase pointer-events-none" style={{ writingMode: 'vertical-rl' }}>
        Portfolio · 2026
      </div>
      <div className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 text-fog/40 font-mono text-[10px] tracking-[0.5em] uppercase pointer-events-none" style={{ writingMode: 'vertical-rl' }}>
        N · P · 00
      </div>

      {/* Center content */}
      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 text-center flex-1 flex flex-col justify-center">
        {/* Top tags */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8 animate-fade-down">
          <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-stone-2 bg-ink-2/70 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-mist opacity-70 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-mist" />
            </span>
            <span className="text-fog text-[10px] tracking-[0.3em] uppercase">Available for Work</span>
          </span>
          <span className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-stone-2 bg-ink-2/70 backdrop-blur text-fog/80 text-[10px] tracking-[0.3em] uppercase font-mono">
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" strokeLinecap="round" />
            </svg>
            {time} · LOCAL
          </span>
          <span className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-stone-2 bg-ink-2/70 backdrop-blur text-fog/80 text-[10px] tracking-[0.3em] uppercase font-mono">
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Philippines
          </span>
        </div>

        {/* Name — fluid clamp() sizing so it always fits */}
        <h1
          className="font-display font-light tracking-[-0.04em] leading-[0.88] mb-6 animate-fade-up"
          style={{ animationDelay: '0.1s' }}
        >
          <span
            className="block text-gradient-strong glitch"
            data-text="Neil Patrick"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 10rem)' }}
          >
            Neil Patrick
          </span>

          {/* "Mulingbayan" rendered as a signature subtitle with side rules */}
          <span
            className="flex items-center justify-center gap-4 md:gap-6 mt-3 md:mt-4"
          >
            <span className="hidden sm:block h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-mist/40" aria-hidden />
            <span
              className="shimmer-text font-medium italic"
              style={{ fontSize: 'clamp(1.75rem, 6vw, 4.5rem)' }}
            >
              Mulingbayan
            </span>
            <span className="hidden sm:block h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-mist/40" aria-hidden />
          </span>
        </h1>

        {/* Typewriter role */}
        <div
          className="inline-flex items-center gap-3 mb-8 animate-fade-up"
          style={{ animationDelay: '0.3s' }}
        >
          <span className="text-mist text-base">▸</span>
          <span className="font-mono text-mist text-base md:text-lg tracking-wide">
            {text}
            <span className="inline-block w-0.5 h-5 bg-mist align-middle ml-1 animate-blink" />
          </span>
        </div>

        {/* Tagline */}
        <p
          className="max-w-2xl mx-auto text-fog/85 text-lg md:text-xl leading-relaxed mb-12 animate-fade-up"
          style={{ animationDelay: '0.5s' }}
        >
          I build clean, performant interfaces — exploring the edge between
          <span className="text-glow"> design</span>,
          <span className="text-glow"> motion</span>, and
          <span className="text-glow"> code</span>.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up"
          style={{ animationDelay: '0.7s' }}
        >
          <a
            href="#projects"
            onMouseEnter={() => play('hover')}
            onClick={() => play('click')}
            className="btn-primary px-8 py-4 rounded-lg text-sm font-medium tracking-[0.2em] uppercase inline-flex items-center justify-center gap-3"
          >
            View My Work
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a
            href="#contact"
            onMouseEnter={() => play('hover')}
            onClick={() => play('click')}
            className="btn-ghost px-8 py-4 rounded-lg text-sm font-medium tracking-[0.2em] uppercase"
          >
            Get In Touch
          </a>
        </div>

        {/* Stats strip with animated counters */}
        <div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 max-w-4xl mx-auto gap-px rounded-2xl overflow-hidden border border-stone-2/70 bg-stone-2/40 animate-fade-up"
          style={{ animationDelay: '0.9s' }}
        >
          <Stat label="Projects Shipped"><AnimatedCounter to={10} suffix="+" /></Stat>
          <Stat label="Years Coding"><AnimatedCounter to={4} /></Stat>
          <Stat label="Coffee Cups"><span>∞</span></Stat>
          <Stat label="Bugs Squashed"><AnimatedCounter to={100} suffix="+" /></Stat>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="relative z-10 w-full mt-12 py-5 border-y border-stone-2/40 bg-ink-2/40 backdrop-blur-sm">
        <Marquee
          items={[
            'React', 'TypeScript', 'Tailwind', 'Vite', 'Framer Motion',
            'Node.js', 'Figma', 'Web Animations', 'Three.js', 'GSAP',
          ]}
          speed="slow"
        />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-fog/40 text-[10px] tracking-[0.4em] animate-fade-in pointer-events-none" style={{ animationDelay: '1.3s' }}>
        ↓ SCROLL ↓
      </div>
    </section>
  );
}

function Stat({ label, children }) {
  return (
    <div className="card-elevated px-4 py-6 text-center hover:bg-ink-3 transition-colors">
      <div className="font-display text-glow text-3xl md:text-4xl font-light">
        {children}
      </div>
      <div className="text-fog/60 text-[10px] tracking-[0.3em] uppercase mt-2">{label}</div>
    </div>
  );
}
