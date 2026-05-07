import { useEffect, useRef, useState } from 'react';

// Single shared IntersectionObserver — one observer for all Reveal instances.
let sharedObserver = null;
const targets = new WeakMap();

function ensureObserver() {
  if (sharedObserver) return sharedObserver;
  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const cb = targets.get(entry.target);
          if (cb) cb();
          sharedObserver.unobserve(entry.target);
          targets.delete(entry.target);
        }
      }
    },
    { threshold: 0.15 }
  );
  return sharedObserver;
}

export default function Reveal({ children, delay = 0, className = '', as = 'div' }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    targets.set(el, () => setShown(true));
    ensureObserver().observe(el);
    return () => {
      if (sharedObserver) sharedObserver.unobserve(el);
      targets.delete(el);
    };
  }, []);

  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: shown ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </Tag>
  );
}
