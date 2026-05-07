import SectionHeader from './SectionHeader';
import Reveal from './Reveal';
import Marquee from './Marquee';
import TiltCard from './TiltCard';
import SectionNumber from './SectionNumber';
import { useSound } from '../context/SoundContext';

const STACK = [
  {
    group: 'Frontend',
    icon: '◆',
    items: ['React', 'React Native', 'Vue', 'HTML5', 'CSS3'],
    note: 'Component-driven UIs across web and native — focus on motion and feel.',
  },
  {
    group: 'Languages',
    icon: '◊',
    items: ['JavaScript', 'TypeScript', 'PHP'],
    note: 'Strongly-typed where it matters, expressive everywhere else.',
  },
  {
    group: 'Styling',
    icon: '✦',
    items: ['Tailwind CSS', 'Bootstrap', 'Sass'],
    note: 'Utility-first by default, comfortable with classic CSS frameworks too.',
  },
  {
    group: 'Backend',
    icon: '⬢',
    items: ['PHP', 'Laravel', 'RESTful APIs'],
    note: 'Laravel-first — auth, queues, real-time, and clean REST APIs.',
  },
  {
    group: 'Tools',
    icon: '◈',
    items: ['Docker', 'Git', 'Postman', 'VS Code', 'PHPStorm', 'GitHub'],
    note: 'The everyday workshop — sharpened over years of daily use.',
  },
  {
    group: 'Design',
    icon: '✧',
    items: ['Figma', 'Balsamiq', 'System Design'],
    note: 'I sketch and prototype before I code — and refine while I do.',
  },
];

export default function Skills() {
  const { play } = useSound();

  return (
    <section id="skills" className="relative py-32 px-6 overflow-hidden">
      <SectionNumber number="02" position="left" />
      <div className="absolute inset-0 dot-bg opacity-40 pointer-events-none" />

      {/* Top marquee */}
      <div className="relative -mx-6 mb-20 py-4 border-y border-stone-2/40 bg-ink-2/30">
        <Marquee
          items={[
            'Building the web',
            'Crafting interfaces',
            'Obsessed with details',
            'Motion-driven design',
            'Pixel-perfect always',
            'React + Laravel',
          ]}
          speed="normal"
          separator="✦"
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <SectionHeader
          tag="02 — Stack"
          title="The tools of my trade."
          subtitle="A toolkit refined through countless late nights and rebuilt landing pages."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
          {STACK.map((s, i) => (
            <Reveal key={s.group} delay={i * 70} className="h-full">
              <TiltCard max={6} onMouseEnter={() => play('hover')} className="h-full">
                <div className="card-elevated card-gradient rounded-2xl p-7 h-full group cursor-default relative overflow-hidden flex flex-col">
                  {/* Decorative corner glyph */}
                  <div className="absolute -top-2 -right-2 text-7xl text-mist/[0.05] font-display select-none pointer-events-none group-hover:text-mist/15 transition-colors duration-700">
                    {s.icon}
                  </div>

                  {/* Header row */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <span className="text-mist text-base">{s.icon}</span>
                      <span className="font-mono text-fog/70 text-[10px] tracking-[0.4em] uppercase">
                        {s.group}
                      </span>
                    </div>
                    <span className="font-mono text-fog/40 text-[10px]">
                      {`0${i + 1}`.slice(-2)}
                    </span>
                  </div>

                  {/* Tech list */}
                  <ul className="space-y-2 mb-6">
                    {s.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-mist text-base group-hover:text-glow transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-4 group-hover:bg-mist transition-colors" />
                        <span className="font-display tracking-tight">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Note pinned to bottom for equal-height cards */}
                  <p className="mt-auto text-fog/70 text-sm leading-relaxed border-t border-stone-3/60 pt-4">
                    {s.note}
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
