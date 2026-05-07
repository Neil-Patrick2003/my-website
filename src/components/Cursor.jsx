import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: target.x, y: target.y };
    const trail = { x: target.x, y: target.y };
    let raf = null;

    const tick = () => {
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;
      trail.x += (target.x - trail.x) * 0.07;
      trail.y += (target.y - trail.y) * 0.07;
      if (ringRef.current) ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`;
      if (trailRef.current) trailRef.current.style.transform = `translate(${trail.x}px, ${trail.y}px)`;

      const settled =
        Math.abs(target.x - ring.x) < 0.4 &&
        Math.abs(target.y - ring.y) < 0.4 &&
        Math.abs(target.x - trail.x) < 0.4 &&
        Math.abs(target.y - trail.y) < 0.4;
      if (settled) { raf = null; return; }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      if (raf == null) raf = requestAnimationFrame(tick);
    };
    const onOver = (e) => {
      const interactive = e.target.closest('a, button, input, [role="button"]');
      if (ringRef.current) ringRef.current.classList.toggle('cursor-active', !!interactive);
      if (trailRef.current) trailRef.current.classList.toggle('cursor-active-trail', !!interactive);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <>
      <div ref={trailRef} className="cursor-trail fixed top-0 left-0 w-28 h-28 rounded-full pointer-events-none z-[99] hidden md:block" aria-hidden />
      <div ref={ringRef}  className="cursor-ring  fixed top-0 left-0 w-11 h-11 rounded-full border-2 pointer-events-none z-[100] hidden md:block" aria-hidden />
      <div ref={dotRef}   className="cursor-dot   fixed top-0 left-0 w-2  h-2  rounded-full pointer-events-none z-[101] hidden md:block" aria-hidden />
      <style>{`
        .cursor-dot {
          background: #ffffff;
          margin-left: -4px;
          margin-top: -4px;
          box-shadow: 0 0 12px rgba(255,255,255,0.8), 0 0 24px rgba(255,255,255,0.35);
          will-change: transform;
        }
        .cursor-ring {
          margin-left: -22px;
          margin-top: -22px;
          border-color: rgba(230, 230, 240, 0.85);
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(2px);
          box-shadow: 0 0 18px rgba(220, 220, 232, 0.2);
          transition: width 0.25s ease, height 0.25s ease, margin 0.25s ease, border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
          will-change: transform;
        }
        .cursor-ring.cursor-active {
          width: 68px; height: 68px;
          margin-left: -34px; margin-top: -34px;
          border-color: rgba(255, 255, 255, 1);
          background: rgba(255, 255, 255, 0.07);
          box-shadow: 0 0 32px rgba(255, 255, 255, 0.35);
        }
        .cursor-trail {
          margin-left: -56px;
          margin-top: -56px;
          background: radial-gradient(circle, rgba(220, 220, 232, 0.22), transparent 70%);
          transition: width 0.4s ease, height 0.4s ease, margin 0.4s ease, opacity 0.3s ease;
          will-change: transform;
        }
        .cursor-trail.cursor-active-trail {
          width: 180px; height: 180px;
          margin-left: -90px; margin-top: -90px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.22), transparent 70%);
        }
      `}</style>
    </>
  );
}
