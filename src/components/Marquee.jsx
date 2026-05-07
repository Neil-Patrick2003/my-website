export default function Marquee({ items, speed = 'normal', className = '', separator = '◆' }) {
  const speedClass = speed === 'slow' ? 'marquee-slow' : speed === 'fast' ? 'marquee-fast' : '';
  // duplicate the list so the loop seam is invisible
  const loop = [...items, ...items];

  return (
    <div className={`marquee-mask overflow-hidden ${className}`}>
      <div className={`marquee ${speedClass}`}>
        {loop.map((it, i) => (
          <div
            key={i}
            className="flex items-center gap-6 px-6 text-fog/80 text-base whitespace-nowrap"
          >
            <span className="font-display tracking-wide">{it}</span>
            <span className="text-mist/30">{separator}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
