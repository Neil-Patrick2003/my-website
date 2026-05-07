export default function RotatingText({ text, radius = 100, fontSize = 11, duration = 22, className = '' }) {
  const size = radius * 2 + 40;
  const id = `rotating-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={{ animation: `slow-spin ${duration}s linear infinite` }}
    >
      <defs>
        <path
          id={id}
          d={`M ${size / 2}, ${size / 2} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          fill="none"
        />
      </defs>
      <text fill="currentColor" fontSize={fontSize} letterSpacing="3" fontFamily="Space Grotesk, sans-serif">
        <textPath href={`#${id}`} startOffset="0">{text}</textPath>
      </text>
    </svg>
  );
}
