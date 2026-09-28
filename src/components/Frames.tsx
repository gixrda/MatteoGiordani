import type { ReactNode } from 'react';
import './Frames.css';

/**
 * Static device frames for case studies. Same material as the narrative
 * object (hairline, chrome, radius), so the portfolio reads as its continuation.
 */
export function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="frame-browser">
      <div className="frame-browser__chrome" aria-hidden>
        <span className="frame-browser__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="frame-browser__url">{url}</span>
      </div>
      <div className="frame-browser__view">{children}</div>
    </div>
  );
}

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="frame-phone">
      <span className="frame-phone__notch" aria-hidden />
      <div className="frame-phone__view">{children}</div>
    </div>
  );
}

/** Honest empty state for evidence that must come from real material. */
export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <div className="placeholder">
      <span className="label">[PLACEHOLDER]</span>
      <span className="placeholder__text">{children}</span>
    </div>
  );
}
