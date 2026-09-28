import { useState } from 'react';
import { Reveal } from '../components/Reveal';
import { useI18n } from '../i18n/I18nContext';
import type { Dictionary } from '../i18n/en';

type Category = keyof Dictionary['insights']['categories'];

const CATEGORIES: Category[] = ['all', 'seo', 'technical', 'frontend', 'performance', 'cwv', 'growth'];

/** Editorial plan — titles only, no published dates or reading stats yet. */
export function Insights() {
  const { t } = useI18n();
  const copy = t.insights;
  const [filter, setFilter] = useState<Category>('all');
  const indexed = copy.posts.map((post, i) => ({ ...post, index: i + 1 }));
  const posts = filter === 'all' ? indexed : indexed.filter((p) => p.category === filter);

  return (
    <section id="insights" className="section insights" aria-labelledby="insights-title">
      <div className="section__inner">
        <div className="section-head">
          <p className="section-title section-head__label">{copy.label}</p>
          <div>
            <Reveal>
              <h2 id="insights-title" className="display-l">
                {copy.title}
              </h2>
            </Reveal>
            <p className="lead section-head__intro">{copy.intro}</p>
          </div>
        </div>

        <div className="filters" role="group" aria-label={copy.filterLabel}>
          {CATEGORIES.map((c) => (
            <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)}>
              {copy.categories[c]}
            </button>
          ))}
        </div>

        <ol className="posts">
          {posts.map((post, i) => (
            <li key={post.index} className={`post${i === 0 && filter === 'all' ? ' post--featured' : ''}`}>
              <a href="#insights" className="post__link">
                <span className="post__index label">{String(post.index).padStart(2, '0')}</span>
                <span className="post__category label">{copy.categories[post.category as Category]}</span>
                <span className="post__body">
                  <span className="post__title">{post.title}</span>
                  <span className="post__dek">{post.dek}</span>
                </span>
                <span className="post__status label">{copy.status}</span>
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
