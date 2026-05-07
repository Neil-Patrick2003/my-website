import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { sounds, startAmbient, stopAmbient } from '../utils/sounds';

const SoundContext = createContext(null);

export function SoundProvider({ children }) {
  const [enabled, setEnabled] = useState(false);
  const [decided, setDecided] = useState(false);

  // Sync ambient drone with enabled state
  useEffect(() => {
    if (enabled) startAmbient();
    else stopAmbient();
    return () => stopAmbient();
  }, [enabled]);

  // Pause ambient when tab is hidden, resume when visible
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) stopAmbient();
      else if (enabled) startAmbient();
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [enabled]);

  const play = useCallback((name) => {
    if (!enabled) return;
    const fn = sounds[name];
    if (fn) fn();
  }, [enabled]);

  const enableSound = useCallback(() => {
    setEnabled(true);
    setDecided(true);
    setTimeout(() => sounds.power(), 50);
  }, []);

  const disableSound = useCallback(() => {
    setEnabled(false);
    setDecided(true);
  }, []);

  const toggle = useCallback(() => {
    setEnabled((e) => {
      if (!e) setTimeout(() => sounds.power(), 0);
      return !e;
    });
  }, []);

  const value = useMemo(() => ({
    enabled, decided, play, enableSound, disableSound, toggle,
  }), [enabled, decided, play, enableSound, disableSound, toggle]);

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error('useSound must be used inside SoundProvider');
  return ctx;
}
