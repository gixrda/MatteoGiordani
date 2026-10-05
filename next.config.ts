import type { NextConfig } from 'next';

// Static export: every page is pre-rendered to `out/`, which can be uploaded to Plesk as-is.
const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // ~10 KB gz of CSS in total: inlining removes the render-blocking stylesheet requests.
  experimental: { inlineCss: true },
};

export default config;
