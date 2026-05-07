import { useEffect, useRef, useState } from 'react';

export default function AnimatedCounter({ to = 0, suffix = '', duration = 1400, className = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setVal(Math.floor(eased * to));
        if (t < 1) requestAnimationFrame(tick);
        else setVal(to);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {val}{suffix}
    </span>
  );
}
