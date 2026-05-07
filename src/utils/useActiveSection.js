import { useEffect, useState } from 'react';

const subscribers = new Set();
let observer = null;
let active = '';
const ratios = new Map(); // id -> intersectionRatio

function notify() {
  let bestId = '';
  let bestRatio = 0;
  for (const [id, r] of ratios) {
    if (r > bestRatio) { bestRatio = r; bestId = id; }
  }
  if (bestId !== active) {
    active = bestId;
    subscribers.forEach((cb) => cb(active));
  }
}

function ensureObserver(ids) {
  if (observer) return;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
      }
      notify();
    },
    { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: '-20% 0px -50% 0px' }
  );
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  }
}

export function useActiveSection(ids) {
  const [, force] = useState(0);

  useEffect(() => {
    ensureObserver(ids);
    const cb = () => force((n) => n + 1);
    subscribers.add(cb);
    return () => { subscribers.delete(cb); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return active;
}
