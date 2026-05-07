let ctx = null;

function getCtx() {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    ctx = new Ctx();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

/* ============================================================
   One-shot UI effect sounds (hover, click, etc.)
   Short and quiet — fine for any speaker.
   ============================================================ */
function tone({ freq = 440, duration = 0.15, type = 'sine', volume = 0.06, attack = 0.005, release = 0.08, slideTo = null }) {
  const ac = getCtx();
  if (!ac) return;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, ac.currentTime + duration);

  gain.gain.setValueAtTime(0, ac.currentTime);
  gain.gain.linearRampToValueAtTime(volume, ac.currentTime + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + duration + release);

  osc.connect(gain);
  gain.connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + duration + release + 0.05);
}

export const sounds = {
  hover: () => tone({ freq: 720, duration: 0.04, type: 'sine', volume: 0.02, attack: 0.002, release: 0.04 }),
  click: () => {
    tone({ freq: 480, duration: 0.05, type: 'triangle', volume: 0.05 });
    tone({ freq: 960, duration: 0.06, type: 'sine', volume: 0.025, attack: 0.001 });
  },
  type: () => tone({ freq: 1100 + Math.random() * 200, duration: 0.02, type: 'square', volume: 0.012 }),
  success: () => {
    const base = 523;
    [0, 0.08, 0.16].forEach((d, i) => {
      setTimeout(() => tone({
        freq: base * Math.pow(1.25, i),
        duration: 0.18,
        type: 'sine',
        volume: 0.04,
      }), d * 1000);
    });
  },
  whoosh: () => tone({ freq: 800, slideTo: 200, duration: 0.4, type: 'sine', volume: 0.04, attack: 0.02, release: 0.2 }),
  power: () => {
    tone({ freq: 110, slideTo: 440, duration: 0.4, type: 'sawtooth', volume: 0.03, release: 0.3 });
    setTimeout(() => tone({ freq: 880, duration: 0.2, type: 'sine', volume: 0.03 }), 200);
  },
  glitch: () => {
    [0, 0.04, 0.09].forEach((d) => {
      setTimeout(() => tone({
        freq: 200 + Math.random() * 1200,
        duration: 0.03,
        type: 'square',
        volume: 0.025,
      }), d * 1000);
    });
  },
};

/* ============================================================
   Background Music — full ambient/cinematic arrangement
   - Key: A minor.  Progression: Am → F → C → G (loops every 4 bars).
   - Tempo: 72 BPM, 16 steps/bar.
   - Layers: low drone, sustained pad chord, sub-bass pluck per beat,
     arpeggio on every 16th, gentle kick on beats 1 & 3, soft hi-hat
     on the offbeats. Master volume tuned to be present but not harsh.
   ============================================================ */
let music = null;

const N = {
  A1: 55, A2: 110, A3: 220, A4: 440,
  B3: 246.94, B4: 493.88,
  C2: 65.41, C3: 130.81, C4: 261.63, C5: 523.25,
  D3: 146.83, D4: 293.66, D5: 587.33,
  E2: 82.41, E3: 164.81, E4: 329.63, E5: 659.25,
  F1: 43.65, F2: 87.31, F3: 174.61, F4: 349.23,
  G1: 49, G2: 98, G3: 196, G4: 392,
};

export function startMusic({ volume = 0.55 } = {}) {
  const ac = getCtx();
  if (!ac || music) return;

  const startNow = ac.currentTime;

  // Master chain: gain → compressor → analyser → destination
  const master = ac.createGain();
  master.gain.setValueAtTime(0, startNow);
  master.gain.linearRampToValueAtTime(volume, startNow + 2.5);

  const compressor = ac.createDynamicsCompressor();
  compressor.threshold.value = -14;
  compressor.knee.value = 18;
  compressor.ratio.value = 5;
  compressor.attack.value = 0.005;
  compressor.release.value = 0.18;

  const analyser = ac.createAnalyser();
  analyser.fftSize = 128;
  analyser.smoothingTimeConstant = 0.78;

  master.connect(compressor);
  compressor.connect(analyser);
  compressor.connect(ac.destination);

  // Lowpass filter for warmth, with a slow LFO that "breathes" the cutoff
  const filter = ac.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 2400;
  filter.Q.value = 0.7;
  filter.connect(master);

  const filterLFO = ac.createOscillator();
  const filterLFOGain = ac.createGain();
  filterLFO.frequency.value = 0.08;
  filterLFOGain.gain.value = 600;
  filterLFO.connect(filterLFOGain).connect(filter.frequency);
  filterLFO.start();

  // Continuous low drone for atmosphere
  const droneOsc = ac.createOscillator();
  const droneGain = ac.createGain();
  droneOsc.type = 'sine';
  droneOsc.frequency.value = N.A1;
  droneGain.gain.value = 0.16;
  droneOsc.connect(droneGain).connect(filter);
  droneOsc.start();

  const droneOsc2 = ac.createOscillator();
  const droneGain2 = ac.createGain();
  droneOsc2.type = 'triangle';
  droneOsc2.frequency.value = N.A2;
  droneOsc2.detune.value = -6;
  droneGain2.gain.value = 0.05;
  droneOsc2.connect(droneGain2).connect(filter);
  droneOsc2.start();

  // Tempo
  const bpm = 72;
  const beatDur = 60 / bpm;
  const stepDur = beatDur / 4;

  // Arpeggio per bar (16 steps)
  const arps = [
    [N.A3, N.C4, N.E4, N.A4, N.C5, N.E4, N.A4, N.C4, N.A3, N.C4, N.E4, N.A4, N.C5, N.E4, N.A4, N.C4],
    [N.F3, N.A3, N.C4, N.F4, N.A3, N.C4, N.F4, N.A3, N.F3, N.A3, N.C4, N.F4, N.A3, N.C4, N.F4, N.A3],
    [N.C3, N.E3, N.G3, N.C4, N.E4, N.G3, N.C4, N.E3, N.C3, N.E3, N.G3, N.C4, N.E4, N.G3, N.C4, N.E3],
    [N.G3, N.B3, N.D4, N.G4, N.B4, N.D4, N.G4, N.B3, N.G3, N.B3, N.D4, N.G4, N.B4, N.D4, N.G4, N.B3],
  ];

  const bassRoots = [N.A1, N.F1, N.C2, N.G1];

  const padChords = [
    [N.A3, N.C4, N.E4], // Am
    [N.F3, N.A3, N.C4], // F
    [N.C4, N.E4, N.G4], // C
    [N.G3, N.B3, N.D4], // G
  ];

  // 16-step drum patterns
  const kickPattern = [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]; // beats 1 & 3
  const hatPattern  = [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0]; // offbeats

  const playPluck = (freq, time, dur, vol) => {
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0, time);
    g.gain.linearRampToValueAtTime(vol, time + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    osc.connect(g).connect(filter);
    osc.start(time);
    osc.stop(time + dur + 0.05);
  };

  const playBass = (freq, time, dur) => {
    const osc = ac.createOscillator();
    const sub = ac.createOscillator();
    const g = ac.createGain();
    const f = ac.createBiquadFilter();
    osc.type = 'sawtooth';
    sub.type = 'sine';
    osc.frequency.value = freq;
    sub.frequency.value = freq;
    f.type = 'lowpass';
    f.frequency.setValueAtTime(900, time);
    f.frequency.exponentialRampToValueAtTime(160, time + dur);
    f.Q.value = 4;
    g.gain.setValueAtTime(0, time);
    g.gain.linearRampToValueAtTime(0.22, time + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    osc.connect(f);
    sub.connect(f);
    f.connect(g).connect(filter);
    osc.start(time);
    sub.start(time);
    osc.stop(time + dur + 0.05);
    sub.stop(time + dur + 0.05);
  };

  const playPad = (freqs, time, dur) => {
    freqs.forEach((freq, i) => {
      const osc = ac.createOscillator();
      const g = ac.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      osc.detune.value = (i - 1) * 5;
      g.gain.setValueAtTime(0, time);
      g.gain.linearRampToValueAtTime(0.04, time + 0.6);
      g.gain.linearRampToValueAtTime(0.04, time + dur - 0.6);
      g.gain.linearRampToValueAtTime(0.0001, time + dur);
      osc.connect(g).connect(filter);
      osc.start(time);
      osc.stop(time + dur + 0.1);
    });
  };

  const playKick = (time) => {
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(40, time + 0.12);
    g.gain.setValueAtTime(0, time);
    g.gain.linearRampToValueAtTime(0.55, time + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, time + 0.28);
    osc.connect(g).connect(master);
    osc.start(time);
    osc.stop(time + 0.32);
  };

  const playHat = (time) => {
    const buf = ac.createBuffer(1, Math.floor(ac.sampleRate * 0.05), ac.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.5;
    const src = ac.createBufferSource();
    src.buffer = buf;
    const f = ac.createBiquadFilter();
    f.type = 'highpass';
    f.frequency.value = 7000;
    const g = ac.createGain();
    g.gain.setValueAtTime(0, time);
    g.gain.linearRampToValueAtTime(0.06, time + 0.001);
    g.gain.exponentialRampToValueAtTime(0.0001, time + 0.04);
    src.connect(f).connect(g).connect(master);
    src.start(time);
  };

  // Lookahead scheduler — schedules notes ~250ms ahead, runs every 25ms
  let nextStepTime = ac.currentTime + 0.15;
  let step = 0;
  let bar = 0;

  const schedule = () => {
    if (!music) return;
    while (nextStepTime < ac.currentTime + 0.25) {
      const arp = arps[bar];
      const note = arp[step];

      if (note) {
        const accent = step % 4 === 0;
        playPluck(note, nextStepTime, accent ? 0.45 : 0.32, accent ? 0.10 : 0.06);
      }
      if (step % 4 === 0) playBass(bassRoots[bar], nextStepTime, beatDur * 0.85);
      if (step === 0) playPad(padChords[bar], nextStepTime, beatDur * 4);
      if (kickPattern[step]) playKick(nextStepTime);
      if (hatPattern[step]) playHat(nextStepTime);

      step++;
      if (step >= 16) {
        step = 0;
        bar = (bar + 1) % 4;
      }
      nextStepTime += stepDur;
    }
  };

  const intervalId = setInterval(schedule, 25);
  schedule();

  music = {
    master,
    filter,
    analyser,
    drones: [droneOsc, droneOsc2, filterLFO],
    intervalId,
  };
}

export function stopMusic() {
  const ac = getCtx();
  if (!ac || !music) return;
  const m = music;
  music = null; // mark stopped immediately so scheduler bails out

  clearInterval(m.intervalId);
  const now = ac.currentTime;
  const fadeTime = 1.5;

  m.master.gain.cancelScheduledValues(now);
  m.master.gain.setValueAtTime(m.master.gain.value, now);
  m.master.gain.linearRampToValueAtTime(0, now + fadeTime);

  const stopAt = now + fadeTime + 0.1;
  m.drones.forEach((node) => { try { node.stop(stopAt); } catch (e) { /* already stopped */ } });
  setTimeout(() => { try { m.master.disconnect(); } catch (e) {} }, (fadeTime + 0.6) * 1000);
}

export function getAnalyser() {
  return music ? music.analyser : null;
}

export function isMusicPlaying() {
  return !!music;
}

// Backwards-compatible aliases (older code paths)
export const startAmbient = startMusic;
export const stopAmbient = stopMusic;
