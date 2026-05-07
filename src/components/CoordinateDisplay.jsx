import { useEffect, useRef } from 'react';

export default function CoordinateDisplay() {
  const xRef = useRef(null);
  const yRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    let raf = null;
    let x = 0;
    let y = 0;

    const apply = () => {
      raf = null;
      if (xRef.current) xRef.current.textContent = x.toString().padStart(4, '0');
      if (yRef.current) yRef.current.textContent = y.toString().padStart(4, '0');
    };
    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (raf == null) raf = requestAnimationFrame(apply);
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="hidden md:block fixed bottom-6 left-6 z-30 status-pill rounded-md px-3 py-2 font-mono text-[10px] tracking-widest text-fog/70 pointer-events-none select-none">
      <span className="text-mist">▣</span>{' '}
      X<span ref={xRef} className="text-glow ml-1 mr-3 inline-block w-10 text-right">0000</span>
      Y<span ref={yRef} className="text-glow ml-1 inline-block w-10 text-right">0000</span>
    </div>
  );
}
