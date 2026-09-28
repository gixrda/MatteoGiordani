import { useState } from 'react';
import { Reveal } from '../components/Reveal';

const CATEGORIES = ['All', 'SEO', 'Technical SEO', 'Front-End', 'Performance', 'Core Web Vitals', 'Growth'] as const;
type Category = (typeof CATEGORIES)[number];

interface Post {
  category: Exclude<Category, 'All'>;
  title: string;
  dek: string;
}

/** Editorial plan — titles only, no published dates or reading stats yet. */
const POSTS: Post[] = [
  {
    category: 'SEO',
    title: 'Search intent comes before keywords.',
    dek: 'The first question is what someone wants — not which words they type.',
  },
  {
    category: 'Technical SEO',
    title: 'What technical SEO covers — and what it doesn’t.',
    dek: 'Crawling, rendering and indexing, explained for business owners.',
  },
  {
    category: 'Core Web Vitals',
    title: 'LCP, INP, CLS: what each metric is really measuring.',
    dek: 'Three metrics, three different moments of a visit.',
  },
  {
    category: 'Front-End',
    title: 'Semantic HTML is an SEO decision.',
    dek: 'Structure written once serves people, assistive technology and search engines.',
  },
  {
    category: 'Performance',
    title: 'Speed starts in the template, not in a plugin.',
    dek: 'Where performance is won or lost in a real codebase.',
  },
  {
    category: 'Growth',
    title: 'Local visibility: where a small business should start.',
    dek: 'A practical order of work for businesses that depend on their area.',
  },
];

export function Insights() {
  const [filter, setFilter] = useState<Category>('All');
  const posts = filter === 'All' ? POSTS : POSTS.filter((p) => p.category === filter);

  return (
    <section id="insights" className="section insights" aria-labelledby="insights-title">
      <div className="section__inner">
        <div className="section-head">
          <p className="label section-head__label">Insights</p>
          <div>
            <Reveal>
              <h2 id="insights-title" className="display-l">
                Notes on search and the web.
              </h2>
            </Reveal>
            <p className="lead section-head__intro">
              Short, practical writing on SEO, front-end and performance — for people who run websites, not only for
              specialists.
            </p>
          </div>
        </div>

        <div className="filters" role="group" aria-label="Filter by topic">
          {CATEGORIES.map((c) => (
            <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)}>
              {c}
            </button>
          ))}
        </div>

        <ol className="posts">
          {posts.map((post, i) => (
            <li key={post.title} className={`post${i === 0 && filter === 'All' ? ' post--featured' : ''}`}>
              <a href="#insights" className="post__link">
                <span className="post__index label">{String(POSTS.indexOf(post) + 1).padStart(2, '0')}</span>
                <span className="post__category label">{post.category}</span>
                <span className="post__body">
                  <span className="post__title">{post.title}</span>
                  <span className="post__dek">{post.dek}</span>
                </span>
                <span className="post__status label">Draft · [PLACEHOLDER]</span>
                <span className="post__arrow" aria-hidden>
                  →
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
