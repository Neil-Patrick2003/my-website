export default function SectionNumber({ number, position = 'right' }) {
  const pos = position === 'left'
    ? 'top-12 left-[-2vw] md:left-[-1vw]'
    : position === 'center'
    ? 'top-8 left-1/2 -translate-x-1/2'
    : 'top-8 right-[-2vw] md:right-[-1vw]';
  return (
    <div className={`section-number ${pos}`} aria-hidden>
      {number}
    </div>
  );
}
