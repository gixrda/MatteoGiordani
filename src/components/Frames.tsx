import type { ReactNode } from 'react';
import './Frames.css';

/**
 * Static device frame for projects. Same material as the narrative
 * object (hairline, radius), so the portfolio reads as its continuation.
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="frame-phone">
      <span className="frame-phone__notch" aria-hidden />
      <div className="frame-phone__view">{children}</div>
    </div>
  );
}
