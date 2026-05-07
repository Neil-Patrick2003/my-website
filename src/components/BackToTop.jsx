import { useEffect, useRef } from 'react';
import { useSound } from '../context/SoundContext';

export default function BackToTop() {
  const btnRef = useRef(null);
  const { play } = useSound();

  useEffect(() => {
    let raf = null;
    let visible = false;
    const update = () => {
      raf = null;
      const shouldShow = window.scrollY > window.innerHeight * 0.8;
      if (shouldShow !== visible) {
        visible = shouldShow;
        if (btnRef.current) {
          btnRef.current.style.opacity = shouldShow ? '1' : '0';
          btnRef.current.style.transform = shouldShow ? 'translateY(0)' : 'translateY(12px)';
          btnRef.current.style.pointerEvents = shouldShow ? 'auto' : 'none';
        }
      }
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
    <button
      ref={btnRef}
      type="button"
      aria-label="Back to top"
      onMouseEnter={() => play('hover')}
      onClick={() => {
        play('click');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className="fixed bottom-20 right-6 md:bottom-24 z-30 w-11 h-11 rounded-full status-pill flex items-center justify-center text-mist hover:text-glow hover:border-mist/40 transition-colors cursor-pointer"
      style={{
        opacity: 0,
        transform: 'translateY(12px)',
        pointerEvents: 'none',
        transition: 'opacity 0.4s ease, transform 0.4s ease, color 0.2s ease, border-color 0.2s ease',
        willChange: 'opacity, transform',
      }}
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
