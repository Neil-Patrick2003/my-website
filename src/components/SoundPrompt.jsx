import { useSound } from '../context/SoundContext';

export default function SoundPrompt({ onDecide }) {
  const { enableSound, disableSound } = useSound();

  const choose = (withSound) => {
    if (withSound) enableSound();
    else disableSound();
    setTimeout(onDecide, 350);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0c] animate-fade-in overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-stone-3/10 blur-3xl orb-1" style={{ background: 'radial-gradient(circle, rgba(196,196,204,0.08), transparent 70%)' }} />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full blur-3xl orb-2" style={{ background: 'radial-gradient(circle, rgba(138,138,150,0.06), transparent 70%)' }} />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="noise" />

      <div className="relative z-10 max-w-md w-full mx-6 animate-scale-in">
        <div className="glass rounded-2xl p-10 text-center relative overflow-hidden">
          {/* Animated speaker icon */}
          <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-fog/20 animate-slow-spin" />
            <div className="absolute inset-2 rounded-full border border-fog/10" style={{ animation: 'slow-spin 16s linear infinite reverse' }} />
            <svg viewBox="0 0 24 24" className="w-10 h-10 text-mist relative z-10" fill="currentColor">
              <path d="M3 10v4a1 1 0 0 0 1 1h3l4 4a1 1 0 0 0 1.7-.7V5.7a1 1 0 0 0-1.7-.7L7 9H4a1 1 0 0 0-1 1z" />
              <path d="M16 8.5a4.5 4.5 0 0 1 0 7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M19 5.5a8.5 8.5 0 0 1 0 13" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
          </div>

          <h2 className="text-2xl font-light tracking-wide text-glow mb-2">Welcome</h2>
          <p className="text-fog text-sm mb-8 leading-relaxed">
            This experience is designed with sound.<br />
            Would you like to enable audio?
          </p>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => choose(true)}
              className="btn-primary px-6 py-3 rounded-lg text-sm font-medium tracking-wide cursor-pointer"
            >
              Enable Sound
            </button>
            <button
              onClick={() => choose(false)}
              className="px-6 py-3 rounded-lg text-sm font-medium tracking-wide cursor-pointer text-fog hover:text-mist transition-colors border border-stone-2 hover:border-stone-3"
            >
              Continue Muted
            </button>
          </div>

          <p className="text-fog/50 text-xs mt-6">You can toggle sound anytime</p>
        </div>
      </div>
    </div>
  );
}
