import { TOOL_LOGOS } from '@/content/toolLogos';

/** "Tools I use every day": label + a band of logo tiles sliding right → left in a seamless loop (pauses on hover). */
export function ToolMarquee({ label, tools }: { label: string; tools: string[] }) {
  const shown = tools.filter((t) => !t.startsWith('['));
  const tiles = (hidden?: boolean) => (
    <ul aria-hidden={hidden || undefined}>
      {shown.map((t) => {
        const logo = TOOL_LOGOS[t];
        return (
          <li key={t} className="tool-tile" title={t}>
            {logo ? (
              // Trusted static SVG markup from content/toolLogos.ts. Paths without their own fill use the text colour.
              <svg viewBox={`0 0 ${logo.w} ${logo.h}`} fill="currentColor" role="img" aria-label={t} dangerouslySetInnerHTML={{ __html: logo.body }} />
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
