'use client';

import { useEffect, useState } from 'react';
import { Icon } from './Icon';

export function ThemeToggle({ label }: { label: string }) {
  const [light, setLight] = useState(false);
  useEffect(() => setLight(document.documentElement.dataset.theme === 'light'), []);

  const toggle = () => {
    const next = light ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {}
    setLight(!light);
  };

  return (
    <button role="switch" aria-checked={light} className="theme-toggle" onClick={toggle}>
      <span className="theme-knob"><Icon name="moon" size={11} /></span>
      <span className="vh">{label}</span>
    </button>
  );
}
