import SectionHeader from './SectionHeader';
import Reveal from './Reveal';
import Marquee from './Marquee';
import SectionNumber from './SectionNumber';
import { useSound } from '../context/SoundContext';

const EMAIL = 'neilpatrickbautistamulingbayan@gmail.com';
const SOCIALS = [
  { label: 'GitHub',      href: 'https://github.com/Neil-Patrick2003', handle: '@Neil-Patrick2003' },
  { label: 'LinkedIn',    href: null,                                  handle: 'Coming soon' },
  { label: 'Twitter / X', href: null,                                  handle: 'Coming soon' },
  { label: 'Email',       href: `mailto:${EMAIL}`,                     handle: EMAIL },
];

export default function Contact() {
  const { play } = useSound();

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      <SectionNumber number="04" position="left" />
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeader
          tag="04 — Contact"
          title="Let's build something."
          subtitle="Open to freelance, collaborations, and conversations about the web."
        />

        <Reveal>
          <div className="card-elevated card-gradient rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="relative">
              <p className="font-mono text-fog/60 text-xs tracking-[0.3em] uppercase mb-6">
                — Reach out at —
              </p>

              <a
                href={`mailto:${EMAIL}`}
                onMouseEnter={() => play('hover')}
                onClick={() => play('click')}
                className="font-display inline-block text-3xl md:text-5xl lg:text-6xl font-light text-gradient-strong hover:text-glow transition-colors mb-6 tracking-tight underline-anim break-all"
              >
                {EMAIL}
              </a>

              <p className="text-fog/70 text-sm md:text-base mb-10 max-w-md mx-auto">
                Drop a message — I usually reply within a day. Always open to interesting
                projects, collaborations, and conversations about the web.
              </p>

              <a
                href={`mailto:${EMAIL}`}
                onMouseEnter={() => play('hover')}
                onClick={() => play('click')}
                className="btn-primary inline-flex items-center gap-3 px-8 py-4 rounded-lg text-sm font-medium tracking-[0.2em] uppercase"
              >
                Send Message
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mt-14">
                {SOCIALS.map((s) => {
                  const isLink = !!s.href;
                  const isExternal = isLink && /^https?:\/\//.test(s.href);
                  const Tag = isLink ? 'a' : 'div';
                  const linkProps = isLink
                    ? {
                        href: s.href,
                        target: isExternal ? '_blank' : undefined,
                        rel: isExternal ? 'noreferrer noopener' : undefined,
                        onMouseEnter: () => play('hover'),
                        onClick: () => play('click'),
                      }
                    : { 'aria-label': `${s.label} — coming soon` };
                  return (
                    <Tag
                      key={s.label}
                      {...linkProps}
                      className={`card-elevated rounded-xl px-4 py-4 text-left group ${isLink ? '' : 'opacity-70 cursor-default'}`}
                    >
                      <div className="text-[10px] tracking-[0.3em] uppercase text-fog/60 mb-1 flex items-center gap-2">
                        <span>{s.label}</span>
                        {!isLink && (
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-mist/40 animate-pulse" />
                        )}
                      </div>
                      <div className={`text-sm transition-colors truncate font-mono ${
                        isLink ? 'text-mist group-hover:text-glow' : 'text-fog italic'
                      }`}>
                        {s.handle}
                      </div>
                    </Tag>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Big name marquee */}
        <div className="my-20 -mx-6 py-6 border-y border-stone-2/40">
          <Marquee
            items={['NEIL PATRICK MULINGBAYAN', 'NEIL PATRICK MULINGBAYAN', 'NEIL PATRICK MULINGBAYAN', 'NEIL PATRICK MULINGBAYAN']}
            speed="normal"
            separator="—"
          />
        </div>

        {/* Footer */}
        <Reveal delay={200}>
          <footer className="pt-8 border-t border-stone-2/60 flex flex-col md:flex-row items-center justify-between gap-3 text-fog/60 text-xs tracking-widest font-mono">
            <div>© {new Date().getFullYear()} NEIL PATRICK MULINGBAYAN · CRAFTED WITH CARE</div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-mist animate-pulse" />
              <span>ALL SYSTEMS OPERATIONAL</span>
            </div>
          </footer>
        </Reveal>
      </div>
    </section>
  );
}
