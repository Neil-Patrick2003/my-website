import { useState, useEffect } from 'react';
import { useSound } from '../context/SoundContext';

export default function LoginScreen({ onEnter }) {
  const { play } = useSound();
  const [name, setName] = useState('');
  const [stage, setStage] = useState('idle'); // idle | authenticating | granted
  const [bootLines, setBootLines] = useState([]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (stage !== 'idle') return;
    play('click');
    setStage('authenticating');
    const lines = [
      '> initializing secure handshake...',
      '> verifying credentials...',
      '> decrypting portfolio matrix...',
      '> access granted.',
    ];
    lines.forEach((l, i) => {
      setTimeout(() => {
        setBootLines((b) => [...b, l]);
        play('type');
      }, 400 + i * 450);
    });
    setTimeout(() => {
      play('success');
      setStage('granted');
    }, 400 + lines.length * 450 + 200);
    setTimeout(() => {
      play('whoosh');
      onEnter();
    }, 400 + lines.length * 450 + 1100);
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Enter' && stage === 'idle') handleSubmit();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, name]);

  return (
    <div className={`fixed inset-0 z-40 flex items-center justify-center bg-ink overflow-hidden ${stage === 'granted' ? 'animate-fade-in' : ''}`}>
      {/* layered background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute -top-32 left-1/4 w-[420px] h-[420px] rounded-full blur-3xl orb-1" style={{ background: 'radial-gradient(circle, rgba(196,196,204,0.07), transparent 70%)' }} />
      <div className="absolute bottom-0 right-1/4 w-[520px] h-[520px] rounded-full blur-3xl orb-2" style={{ background: 'radial-gradient(circle, rgba(138,138,150,0.05), transparent 70%)' }} />
      <div className="noise" />

      {/* corner brackets */}
      <CornerBrackets />

      <div className={`relative z-10 w-full max-w-md mx-6 transition-all duration-500 ${stage === 'granted' ? 'opacity-0 scale-110' : 'opacity-100'}`}>
        {/* Logo / monogram */}
        <div className="text-center mb-10 animate-fade-down">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl border border-stone-3 mb-4 relative">
            <span className="text-2xl font-light text-glow tracking-tight">NP</span>
            <div className="absolute inset-0 rounded-xl border border-mist/30 animate-glow-pulse" />
          </div>
          <p className="text-fog text-xs tracking-[0.3em] uppercase">Neil Patrick Mulingbayan</p>
          <p className="text-mist/60 text-xs mt-1 tracking-widest">— portfolio access —</p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 relative overflow-hidden scanline animate-fade-up">
          {stage === 'idle' && (
            <>
              <label className="block text-fog text-xs tracking-widest uppercase mb-3">
                Identifier
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); play('type'); }}
                placeholder="guest"
                className="themed w-full px-4 py-3 rounded-lg text-sm font-mono"
                autoFocus
              />

              <button
                type="submit"
                onMouseEnter={() => play('hover')}
                className="btn-primary w-full mt-6 py-3.5 rounded-lg text-sm font-medium tracking-[0.2em] uppercase cursor-pointer"
              >
                Enter Portfolio
              </button>

              <div className="mt-5 flex items-center gap-3 text-fog/60 text-xs">
                <div className="h-px flex-1 bg-stone-2" />
                <span className="tracking-widest">or press enter</span>
                <div className="h-px flex-1 bg-stone-2" />
              </div>
            </>
          )}

          {stage !== 'idle' && (
            <div className="font-mono text-sm text-mist min-h-[180px]">
              <div className="flex items-center gap-2 mb-4 text-fog text-xs">
                <span className="w-2 h-2 rounded-full bg-mist animate-pulse" />
                <span className="tracking-widest uppercase">Authenticating</span>
              </div>
              {bootLines.map((line, i) => (
                <div key={i} className="animate-fade-up text-fog/90 mb-1.5">
                  {line}
                </div>
              ))}
              {stage === 'authenticating' && (
                <span className="inline-block w-2 h-4 bg-mist align-middle animate-blink ml-1" />
              )}
            </div>
          )}
        </form>

        <p className="text-center text-fog/40 text-xs mt-6 tracking-widest">
          v1.0 · DARK MODE · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}

function CornerBrackets() {
  const c = 'absolute w-8 h-8 border-mist/30';
  return (
    <>
      <div className={`${c} top-6 left-6 border-t border-l`} />
      <div className={`${c} top-6 right-6 border-t border-r`} />
      <div className={`${c} bottom-6 left-6 border-b border-l`} />
      <div className={`${c} bottom-6 right-6 border-b border-r`} />
    </>
  );
}
