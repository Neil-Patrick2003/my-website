import { useSound } from '../context/SoundContext';

export default function NowPlaying() {
  const { enabled } = useSound();
  if (!enabled) return null;

  return (
    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink-2/60 border border-stone-2 text-mist text-[10px] tracking-[0.25em] uppercase">
      <span className="flex items-end gap-0.5 h-3 text-mist">
        <span className="eq-bar" />
        <span className="eq-bar" />
        <span className="eq-bar" />
        <span className="eq-bar" />
      </span>
      <span>Now Playing</span>
    </div>
  );
}
