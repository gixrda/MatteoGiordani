import { TOOL_LOGOS } from '@/content/toolLogos';

/** "Tools I use every day": label + a band of logo tiles scrolling sideways (34 s loop, pauses on hover, static with reduced motion). */
export function ToolMarquee({ label, tools }: { label: string; tools: string[] }) {
  const shown = tools.filter((t) => !t.startsWith('['));
  const tiles = (hidden?: boolean) => (
    <ul aria-hidden={hidden || undefined}>
      {shown.map((t) => {
        const logo = TOOL_LOGOS[t];
        return (
          <li key={t} className="tool-tile" title={t}>
            {logo ? (
              <svg viewBox="0 0 24 24" fill={logo.hex} role="img" aria-label={t}><path d={logo.path} /></svg>
            ) : (
              <b>{t}</b>
            )}
          </li>
        );
      })}
    </ul>
  );
  return (
    <div className="marquee">
      <p className="cap">{label}</p>
      <div className="marquee-track">
        {tiles()}
        {tiles(true)}
      </div>
    </div>
  );
}
