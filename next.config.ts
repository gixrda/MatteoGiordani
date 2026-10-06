import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

// Static export: every page is pre-rendered to `out/` (Vercel or any static host).
// createMDX: blog posts are MDX files in content/blog, imported by the post routes.
const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // ~10 KB gz of CSS in total: inlining removes the render-blocking stylesheet requests.
  experimental: { inlineCss: true },
};

export default createMDX()(config);
