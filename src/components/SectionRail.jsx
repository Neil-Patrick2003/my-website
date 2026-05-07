import { useSound } from '../context/SoundContext';
import { useActiveSection } from '../utils/useActiveSection';

const SECTIONS = [
  { id: 'home',     label: 'Home',    num: '00' },
  { id: 'about',    label: 'About',   num: '01' },
  { id: 'skills',   label: 'Stack',   num: '02' },
  { id: 'projects', label: 'Work',    num: '03' },
  { id: 'contact',  label: 'Contact', num: '04' },
];

const IDS = SECTIONS.map((s) => s.id);

export default function SectionRail() {
  const { play } = useSound();
  const active = useActiveSection(IDS) || 'home';

  return (
    <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-20 flex-col gap-3">
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            onMouseEnter={() => play('hover')}
            onClick={() => play('click')}
            className="group relative flex items-center gap-3 justify-end"
          >
            <span className={`font-mono text-[10px] tracking-[0.3em] uppercase transition-all duration-300 ${
              isActive ? 'text-glow opacity-100' : 'text-fog/60 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
            }`}>
              {s.num} · {s.label}
            </span>
            <span className={`block h-px transition-all duration-300 ${
              isActive ? 'w-10 bg-glow' : 'w-5 bg-fog/40 group-hover:w-8 group-hover:bg-mist'
            }`} />
          </a>
        );
      })}
    </div>
  );
}
