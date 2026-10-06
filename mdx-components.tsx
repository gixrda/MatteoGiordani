import type { MDXComponents } from 'mdx/types';

// Required by @next/mdx in the App Router. Post typography comes from `.prose` in styles/post.css.
const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return components;
}
