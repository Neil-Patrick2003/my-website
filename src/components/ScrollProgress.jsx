import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let raf = null;
    const update = () => {
      raf = null;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    };
    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-px bg-stone-2/30 pointer-events-none">
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-fog via-mist to-glow"
        style={{ width: '0%', willChange: 'width' }}
      />
    </div>
  );
}
