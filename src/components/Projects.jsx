import SectionHeader from './SectionHeader';
import Reveal from './Reveal';
import TiltCard from './TiltCard';
import SectionNumber from './SectionNumber';
import { useSound } from '../context/SoundContext';

// TODO: replace each project's `link` with the real GitHub repo or live demo URL.
const PROJECTS = [
  {
    num: '01',
    title: 'RealSync',
    desc: 'A real-time real-estate platform with live property updates, listing management, and instant agent messaging powered by Laravel Reverb.',
    stack: ['React', 'Laravel', 'Reverb'],
    year: '2025',
    type: 'Real Estate',
    link: '#',
    featured: true,
  },
  {
    num: '02',
    title: 'Fitness Hub',
    desc: 'A workout-tracking platform with custom routines, progress logs, and a clean Blade-rendered UI.',
    stack: ['Laravel', 'Blade', 'Tailwind'],
    year: '2025',
    type: 'Wellness',
    link: '#',
  },
  {
    num: '03',
    title: 'Clover Bank',
    desc: 'A mobile-first banking app with secure transactions, account management, and real-time updates over a Laravel REST API.',
    stack: ['React Native', 'Laravel', 'REST API'],
    year: '2024',
    type: 'Mobile · Fintech',
    link: '#',
  },
  {
    num: '04',
    title: 'Nutri Safari',
    desc: 'A nutrition platform with a React + Laravel web dashboard and a Flutter companion mobile app.',
    stack: ['React', 'Laravel', 'Flutter'],
    year: '2024',
    type: 'Web + Mobile',
    link: '#',
  },
  {
    num: '05',
    title: 'Job Finder',
    desc: 'A streamlined job-board built on Laravel + Blade with employer dashboards and applicant tracking.',
    stack: ['Laravel', 'Blade'],
    year: '2024',
    type: 'Web App',
    link: '#',
  },
  {
    num: '06',
    title: 'CSR Tracker',
    desc: 'A React Native app for monitoring customer-service interactions and SLA compliance on the go.',
    stack: ['React Native'],
    year: '2024',
    type: 'Mobile',
    link: '#',
  },
  {
    num: '07',
    title: 'Twitter Clone',
    desc: 'A social-feed clone with posts, follows, and threads — React Native frontend on a Laravel REST API.',
    stack: ['React Native', 'Laravel', 'REST API'],
    year: '2024',
    type: 'Mobile · Social',
    link: '#',
  },
];

function ProjectCard({ p, featured = false }) {
  const { play } = useSound();
  const initials = p.title.split(' ').map((w) => w[0]).join('');
  const isExternal = p.link && p.link !== '#' && /^https?:\/\//.test(p.link);

  return (
    <TiltCard max={featured ? 5 : 8} onMouseEnter={() => play('hover')} className="h-full">
      <a
        href={p.link || '#'}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noreferrer noopener' : undefined}
        onClick={() => play('click')}
        aria-label={`View project: ${p.title}`}
        className={`card-elevated card-gradient rounded-2xl p-7 h-full flex flex-col group cursor-pointer relative overflow-hidden block ${featured ? 'lg:p-10' : ''}`}
      >
        {/* Browser mock visual */}
        <div className={`relative rounded-xl mb-6 overflow-hidden border border-stone-3 bg-ink ${featured ? 'aspect-[16/8]' : 'aspect-[16/10]'}`}>
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-stone-3 bg-ink-3/90">
            <div className="flex gap-1.5">
              <span className="window-dot" />
              <span className="window-dot" />
              <span className="window-dot" />
            </div>
            <div className="font-mono text-[10px] text-fog/60 tracking-wide">
              {p.title.toLowerCase().replace(/\s/g, '-')}.app
            </div>
            <div className="w-8" />
          </div>

          <div className="absolute top-9 inset-x-0 bottom-0 grid-bg flex items-center justify-center bg-gradient-to-br from-stone-3/40 via-transparent to-ink/60">
            <div className={`font-display font-light text-mist/70 tracking-tighter select-none ${featured ? 'text-9xl md:text-[10rem]' : 'text-7xl md:text-8xl'}`}>
              {initials}
            </div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
            <span className="text-glow text-sm tracking-widest uppercase flex items-center gap-2">
              Visit Project
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </span>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-fog/50 text-xs tracking-widest">
              {p.num} / {p.type} / {p.year}
            </span>
            {featured && (
              <span className="font-mono text-glow text-[10px] tracking-[0.3em] uppercase border border-mist/30 px-2 py-0.5 rounded">
                Featured
              </span>
            )}
            {!featured && (
              <svg
                className="w-5 h-5 text-fog group-hover:text-glow group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
              >
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            )}
          </div>
          <h3 className={`font-display font-medium text-glow tracking-tight group-hover:text-white transition-colors mb-3 ${featured ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'}`}>
            {p.title}
          </h3>
          <p className={`text-fog/85 leading-relaxed mb-5 ${featured ? 'text-base max-w-2xl' : 'text-sm'}`}>{p.desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {p.stack.map((t) => (
              <span
                key={t}
                className="font-mono px-2.5 py-1 rounded-md text-[10px] tracking-widest uppercase bg-stone-2 border border-stone-3 text-fog group-hover:border-mist/40 group-hover:text-mist transition-colors"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </a>
    </TiltCard>
  );
}

export default function Projects() {
  const { play } = useSound();
  const featured = PROJECTS[0];
  const rest = PROJECTS.slice(1);

  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden">
      <SectionNumber number="03" position="right" />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeader
          tag="03 — Selected Work"
          title="Projects worth showing."
          subtitle="A few things I've built — each one taught me something new."
        />

        {/* Featured project — full width */}
        <Reveal>
          <div className="mb-6">
            <ProjectCard p={featured} featured />
          </div>
        </Reveal>

        {/* Remaining projects — 2-up grid, equal heights */}
        <div className="grid md:grid-cols-2 gap-6 auto-rows-fr">
          {rest.map((p, i) => (
            <Reveal key={p.title} delay={i * 80} className="h-full">
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>

        {/* CTA strip */}
        <Reveal delay={300}>
          <div className="mt-14 text-center">
            <a
              href="#contact"
              onMouseEnter={() => play('hover')}
              onClick={() => play('click')}
              className="inline-flex items-center gap-3 text-mist hover:text-glow underline-anim text-sm tracking-[0.3em] uppercase"
            >
              Have a project in mind?
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
