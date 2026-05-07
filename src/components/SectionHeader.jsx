import Reveal from './Reveal';

export default function SectionHeader({ tag, title, subtitle }) {
  return (
    <div className="max-w-3xl mx-auto text-center mb-16">
      <Reveal>
        <div className="inline-flex items-center gap-3 mb-5">
          <span className="w-8 h-px bg-mist/40" />
          <span className="text-fog text-xs tracking-[0.4em] uppercase">{tag}</span>
          <span className="w-8 h-px bg-mist/40" />
        </div>
      </Reveal>
      <Reveal delay={120}>
        <h2 className="text-4xl md:text-6xl font-light text-gradient leading-tight tracking-tight mb-4">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={240}>
          <p className="text-fog/80 text-base md:text-lg leading-relaxed">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
