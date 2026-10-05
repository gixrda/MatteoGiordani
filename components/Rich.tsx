// Renders copy markup: *text* → italic accent, _text_ → italic, [text] → visible placeholder.
const TOKEN = /(\*[^*]+\*|_[^_]+_|\[[^\]]+\])/g;

export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(TOKEN).map((part, i) => {
        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) return <em key={i} className="acc">{part.slice(1, -1)}</em>;
        if (part.startsWith('_') && part.endsWith('_') && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>;
        if (part.startsWith('[') && part.endsWith(']')) return <span key={i} className="ph">{part}</span>;
        return part;
      })}
    </>
  );
}

/** Plain-text version of a headline, for metadata and aria labels. */
export const plain = (text: string) => text.replace(/[*_]/g, '');
