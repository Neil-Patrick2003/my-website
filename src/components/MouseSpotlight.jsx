import { useEffect } from 'react';

export default function MouseSpotlight() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const root = document.documentElement;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let raf = null;

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      root.style.setProperty('--mx', `${pos.x}px`);
      root.style.setProperty('--my', `${pos.y}px`);
      if (Math.abs(target.x - pos.x) > 0.5 || Math.abs(target.y - pos.y) > 0.5) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = null;
      }
    };
    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (raf == null) raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[5]"
      style={{
        background:
          'radial-gradient(680px circle at var(--mx, 50%) var(--my, 50%), rgba(220, 220, 232, 0.10), rgba(180, 180, 200, 0.04) 28%, transparent 58%)',
        willChange: 'background',
      }}
      aria-hidden
    />
  );
}
