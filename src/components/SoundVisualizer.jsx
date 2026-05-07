import { useEffect, useRef } from 'react';
import { useSound } from '../context/SoundContext';
import { getAnalyser } from '../utils/sounds';

const BAR_COUNT = 28;

export default function SoundVisualizer() {
  const { enabled } = useSound();
  const containerRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    const container = containerRef.current;
    if (!container) return;
    const bars = Array.from(container.querySelectorAll('.viz-bar'));
    let raf = null;
    let buffer = null; // allocated once when analyser is ready

    const tick = () => {
      if (document.hidden) {
        // Pause work entirely when tab is hidden
        raf = requestAnimationFrame(tick);
        return;
      }
      const an = getAnalyser();
      if (!an) {
        for (const b of bars) b.style.transform = 'scaleY(0.05)';
      } else {
        if (!buffer || buffer.length !== an.frequencyBinCount) {
          buffer = new Uint8Array(an.frequencyBinCount);
        }
        an.getByteFrequencyData(buffer);
        const len = buffer.length;
        for (let i = 0; i < bars.length; i++) {
          const idx = Math.floor((i / BAR_COUNT) * len * 0.6);
          const raw = buffer[idx] / 255;
          const v = raw > 0.05 ? Math.min(1, Math.pow(raw, 1.4) * 1.4) : 0.05;
          bars[i].style.transform = `scaleY(${v})`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="hidden md:flex fixed bottom-6 right-6 z-30 status-pill rounded-md px-3 py-2 items-end gap-[3px] h-9">
      <div ref={containerRef} className="flex items-end gap-[2px] h-5">
        {Array.from({ length: BAR_COUNT }).map((_, i) => (
          <span
            key={i}
            className="viz-bar inline-block w-[2px] h-full rounded-[1px] bg-gradient-to-t from-stone-3 via-mist to-glow origin-bottom"
            style={{ transform: 'scaleY(0.05)', transition: 'transform 60ms linear', willChange: 'transform' }}
          />
        ))}
      </div>
      <span className="font-mono text-[10px] tracking-widest text-fog/70 ml-1 mb-0.5">FREQ</span>
    </div>
  );
}
