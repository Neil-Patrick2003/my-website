import { useSound } from '../context/SoundContext';

export default function SoundToggle({ className = '' }) {
  const { enabled, toggle, play } = useSound();

  return (
    <button
      onClick={() => { toggle(); play('click'); }}
      onMouseEnter={() => play('hover')}
      title={enabled ? 'Sound on — click to mute' : 'Sound off — click to enable'}
      className={`group relative w-10 h-10 flex items-center justify-center rounded-lg border border-stone-2 hover:border-mist/40 bg-ink-2/60 backdrop-blur transition-all cursor-pointer ${className}`}
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-mist" fill="currentColor">
        <path d="M3 10v4a1 1 0 0 0 1 1h3l4 4a1 1 0 0 0 1.7-.7V5.7a1 1 0 0 0-1.7-.7L7 9H4a1 1 0 0 0-1 1z" />
        {enabled ? (
          <>
            <path d="M16 8.5a4.5 4.5 0 0 1 0 7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M19 5.5a8.5 8.5 0 0 1 0 13" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <line x1="16" y1="8" x2="22" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        )}
        
        {!enabled && <line x1="22" y1="8" x2="16" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />}
      </svg>
      {enabled && (
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-mist animate-pulse" />
      )}
    </button>
  );
}
