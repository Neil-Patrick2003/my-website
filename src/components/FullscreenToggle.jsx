import { useEffect, useState } from 'react';
import { useSound } from '../context/SoundContext';
import { getFsElement, isFsSupported, requestFs, exitFs, onFsChange } from '../utils/fullscreen';

export default function FullscreenToggle({ className = '' }) {
  const { play } = useSound();
  const [isFs, setIsFs] = useState(false);

  useEffect(() => {
    const sync = () => setIsFs(!!getFsElement());
    sync();
    return onFsChange(sync);
  }, []);

  if (!isFsSupported()) return null;

  const toggle = async () => {
    play('click');
    try {
      if (getFsElement()) await exitFs();
      else await requestFs();
    } catch (err) {
      console.warn('Fullscreen request failed:', err);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      onMouseEnter={() => play('hover')}
      aria-label={isFs ? 'Exit fullscreen' : 'Enter fullscreen'}
      title={isFs ? 'Exit fullscreen' : 'Enter fullscreen'}
      className={`group relative w-10 h-10 flex items-center justify-center rounded-lg border border-stone-2 hover:border-mist/40 bg-ink-2/60 backdrop-blur transition-all cursor-pointer ${className}`}
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-mist" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {isFs ? (
          <>
            <path d="M9 4v3a2 2 0 0 1-2 2H4" />
            <path d="M15 4v3a2 2 0 0 0 2 2h3" />
            <path d="M9 20v-3a2 2 0 0 0-2-2H4" />
            <path d="M15 20v-3a2 2 0 0 1 2-2h3" />
          </>
        ) : (
          <>
            <path d="M4 9V6a2 2 0 0 1 2-2h3" />
            <path d="M20 9V6a2 2 0 0 0-2-2h-3" />
            <path d="M4 15v3a2 2 0 0 0 2 2h3" />
            <path d="M20 15v3a2 2 0 0 1-2 2h-3" />
          </>
        )}
      </svg>
    </button>
  );
}
