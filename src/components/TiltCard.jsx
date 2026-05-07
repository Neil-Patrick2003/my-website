import { useRef, useEffect } from 'react';

export default function TiltCard({ children, className = '', max = 8, glare = true, onMouseEnter }) {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);
  const stateRef = useRef({ rx: 0, ry: 0, gx: 50, gy: 50, raf: null, pending: false });

  useEffect(() => () => {
    if (stateRef.current.raf) cancelAnimationFrame(stateRef.current.raf);
  }, []);

  const apply = () => {
    const inner = innerRef.current;
    const s = stateRef.current;
    s.raf = null;
    s.pending = false;
    if (!inner) return;
    inner.style.setProperty('--rx', `${s.rx}deg`);
    inner.style.setProperty('--ry', `${s.ry}deg`);
    inner.style.setProperty('--gx', `${s.gx}%`);
    inner.style.setProperty('--gy', `${s.gy}%`);
  };

  const onMove = (e) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const s = stateRef.current;
    s.rx = (x - 0.5) * 2 * max;
    s.ry = -(y - 0.5) * 2 * max;
    s.gx = x * 100;
    s.gy = y * 100;
    if (!s.pending) {
      s.pending = true;
      s.raf = requestAnimationFrame(apply);
    }
  };

  const onLeave = () => {
    const s = stateRef.current;
    s.rx = 0; s.ry = 0;
    if (!s.pending) {
      s.pending = true;
      s.raf = requestAnimationFrame(apply);
    }
  };

  return (
    <div
      ref={wrapRef}
      className={`tilt-wrap ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={onMouseEnter}
    >
      <div ref={innerRef} className="tilt-inner relative h-full">
        {children}
        {glare && <div className="tilt-glare" />}
      </div>
    </div>
  );
}
