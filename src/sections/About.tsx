import { Reveal } from '../components/Reveal';
import { useI18n } from '../i18n/I18nContext';

export function About() {
  const { t } = useI18n();
  const copy = t.about;

  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="section__inner">
        <div className="section-head">
          <p className="section-title section-head__label">{copy.label}</p>
          <div>
            <Reveal>
              <h2 id="about-title" className="display-l">
                {copy.title}
              </h2>
            </Reveal>
            <p className="lead section-head__intro">{copy.intro}</p>
          </div>
        </div>

        <div className="about__grid">
          <ol className="equation" aria-label={copy.listLabel}>
            {copy.terms.map(({ term, gloss }, i) => (
              <li key={term}>
                <span className="equation__op" aria-hidden>
                  {i === 0 ? '' : '+'}
                </span>
                <span className="equation__term">{term}</span>
                <span className="equation__gloss">{gloss}</span>
              </li>
            ))}
            <li className="equation__result">
              <span className="equation__op" aria-hidden>
                =
              </span>
              <span className="equation__term">{copy.result}</span>
            </li>
          </ol>

          <aside className="twin" aria-label={copy.twin.label}>
            <p className="label twin__label">{copy.twin.label}</p>
            <pre className="twin__node">
              <code>
                <span className="t">&lt;matteo-giordani</span>
                {copy.twin.attrs.map(([name, value]) => (
                  <span key={name}>
                    {'\n  '}
                    <span className="a">{name}</span>=<span className="s">"{value}"</span>
                  </span>
                ))}
                {'\n'}
                <span className="t">/&gt;</span>
              </code>
            </pre>
            <p className="twin__text">{copy.twin.text}</p>
            <p className="twin__note label">{copy.twin.note}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
