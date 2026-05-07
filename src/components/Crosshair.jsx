export default function Crosshair({ size = 12, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={`text-fog/40 ${className}`}
      aria-hidden
    >
      <line x1="0" y1="6" x2="12" y2="6" />
      <line x1="6" y1="0" x2="6" y2="12" />
      <circle cx="6" cy="6" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
