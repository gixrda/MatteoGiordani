import { Reveal } from '../components/Reveal';
import { useI18n } from '../i18n/I18nContext';

export function Services() {
  const { t } = useI18n();
  const copy = t.services;

  return (
    <section id="services" className="section services" aria-labelledby="services-title">
      <div className="section__inner">
        <div className="section-head">
          <p className="section-title section-head__label">{copy.label}</p>
          <div>
            <Reveal>
              <h2 id="services-title" className="display-l">
                {copy.title[0]}
                <br />
                {copy.title[1]}
              </h2>
            </Reveal>
            <p className="lead section-head__intro">{copy.intro}</p>
          </div>
        </div>

        <div className="services__split">
          {copy.capabilities.map((c, i) => (
            <article key={i} className="capability" aria-labelledby={`cap-${i}`}>
              <p className="capability__name label">
                <span>{String(i + 1).padStart(2, '0')}</span>
                {c.name}
              </p>
              <h3 id={`cap-${i}`} className="capability__claim display-l">
                {c.claim}
              </h3>
              <p className="capability__text">{c.text}</p>
              <ul className="capability__topics">
                {c.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="services__flow">
          <p className="section-title">{copy.flowLabel}</p>
          <ol className="flow">
            {copy.flow.map(({ step, text }, i) => (
              <li key={step}>
                <span className="flow__index label">{String(i + 1).padStart(2, '0')}</span>
                <span className="flow__step">{step}</span>
                <span className="flow__text">{text}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
