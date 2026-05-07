import SectionHeader from './SectionHeader';
import Reveal from './Reveal';
import RotatingText from './RotatingText';
import SectionNumber from './SectionNumber';
import Crosshair from './Crosshair';

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      <SectionNumber number="01" position="right" />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeader
          tag="01 — About"
          title="A full-stack dev who fell for the frontend."
        />

        <div className="grid md:grid-cols-12 gap-14 items-center">
          {/* Avatar with rotating text ring */}
          <Reveal className="md:col-span-5">
            <div className="relative aspect-square max-w-[400px] mx-auto">
              {/* Outer rotating text */}
              <div className="absolute inset-0 flex items-center justify-center text-mist/50 pointer-events-none">
                <RotatingText
                  text="◆ NEIL PATRICK MULINGBAYAN ◆ FULL-STACK DEVELOPER ◆ NEIL PATRICK MULINGBAYAN ◆ FULL-STACK DEVELOPER "
                  radius={180}
                  fontSize={11}
                  duration={32}
                />
              </div>

              {/* Inner card */}
              <div className="absolute inset-12 rounded-3xl card-elevated overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-br from-stone-3/40 via-transparent to-ink/80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="font-display text-8xl md:text-9xl font-light text-glow/90 select-none tracking-tight">
                    NP
                  </div>
                </div>
                <div className="absolute inset-3 rounded-2xl border border-mist/10 pointer-events-none" />
                {/* Corner crosshairs */}
                <Crosshair size={10} className="absolute top-3 left-3" />
                <Crosshair size={10} className="absolute top-3 right-3" />
                <Crosshair size={10} className="absolute bottom-3 left-3" />
                <Crosshair size={10} className="absolute bottom-3 right-3" />
              </div>

              {/* Floating tech tags */}
              <div className="absolute -top-2 -left-2 px-3 py-1.5 rounded-full glass text-xs tracking-widest text-mist animate-float font-mono">
                ◆ React
              </div>
              <div
                className="absolute -bottom-2 -right-2 px-3 py-1.5 rounded-full glass text-xs tracking-widest text-mist animate-float font-mono"
                style={{ animationDelay: '1.5s' }}
              >
                ✦ Laravel
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div className="md:col-span-7 space-y-6">
            <Reveal delay={150}>
              <p className="text-mist text-xl leading-relaxed font-light">
                Hi, I&apos;m <span className="text-glow font-medium">Neil Patrick Mulingbayan</span> —
                a 4th-year IT student at BSU Arasof in the Philippines, working full-stack
                with a soft spot for the frontend.
              </p>
            </Reveal>
            <Reveal delay={250}>
              <p className="text-fog/85 leading-relaxed">
                I work across the stack with <span className="text-mist">React, React Native,
                Vue, and Laravel</span> — shipping web apps, mobile apps, and the REST APIs
                that connect them. I obsess over the small details: easing curves, typography
                rhythm, and that perfectly-timed micro-interaction.
              </p>
            </Reveal>
            <Reveal delay={350}>
              <p className="text-fog/85 leading-relaxed">
                I&apos;m looking for my first professional role — bringing 10+ self-built
                projects (real estate, fintech, social, productivity) and a genuine love
                for the craft. Always learning, always shipping.
              </p>
            </Reveal>

            <Reveal delay={450}>
              <div className="flex flex-wrap gap-2 pt-4">
                {['Full-Stack', 'Frontend-leaning', 'Self-taught', 'Always shipping'].map((t) => (
                  <span
                    key={t}
                    className="px-3.5 py-1.5 rounded-full card-elevated text-fog text-xs tracking-wide hover:border-mist/40 hover:text-mist transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={550}>
              <div className="grid grid-cols-2 gap-px mt-8 rounded-xl overflow-hidden border border-stone-3/70 bg-stone-3/40">
                {[
                  { k: 'Based In', v: 'Philippines · Remote' },
                  { k: 'Focus', v: 'Full Stack' },
                  { k: 'Education', v: 'BSU Arasof · 4th yr IT' },
                  { k: 'Status', v: 'Open to first role' },
                ].map((row) => (
                  <div key={row.k} className="card-elevated px-4 py-3.5">
                    <div className="text-fog/60 text-[10px] tracking-[0.3em] uppercase">{row.k}</div>
                    <div className="text-mist text-sm mt-1 font-mono">{row.v}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
