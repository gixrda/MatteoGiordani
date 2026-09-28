import { Reveal } from '../components/Reveal';
import { PhoneFrame } from '../components/Frames';
import { useI18n } from '../i18n/I18nContext';

export function SelectedWork() {
  const { t } = useI18n();
  const copy = t.work;
  const trainly = copy.trainly;

  return (
    <section id="work" className="section work" aria-labelledby="work-title">
      <div className="section__inner">
        <div className="section-head">
          <p className="section-title section-head__label">{copy.label}</p>
          <div>
            <Reveal>
              <h2 id="work-title" className="display-l">
                {copy.title}
              </h2>
            </Reveal>
            <p className="lead section-head__intro">{copy.intro}</p>
          </div>
        </div>

        <article className="case case--project" aria-labelledby="case-trainly">
          <div className="case__side">
            <p className="case__index label">
              01 <span className="case__kind">{trainly.kind}</span>
            </p>
            <h3 id="case-trainly" className="case__title display-m">
              Trainly
            </h3>
            <p className="case__intro">{trainly.intro}</p>
            <ul className="case__tags" aria-label={trainly.focusLabel}>
              {trainly.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <p className="case__note">{trainly.note}</p>
          </div>
          <div className="case__device">
            <PhoneFrame>
              <div className="trainly" aria-label={trainly.uiLabel}>
                <p className="trainly__label label">{trainly.week}</p>
                <p className="trainly__title">{trainly.headline}</p>
                <svg className="trainly__route" viewBox="0 0 200 120" aria-hidden>
                  <path d="M12 96 C 40 40, 70 110, 100 64 S 160 20, 188 42" />
                  <circle cx="12" cy="96" r="4" />
                  <circle cx="188" cy="42" r="4" />
                </svg>
                <div className="trainly__bars" aria-hidden>
                  {[38, 0, 56, 30, 0, 78, 44].map((h, i) => (
                    <span key={i} style={{ height: `${Math.max(h, 6)}%` }} className={h === 0 ? 'is-rest' : undefined} />
                  ))}
                </div>
                <p className="trainly__foot label">{trainly.foot}</p>
              </div>
            </PhoneFrame>
          </div>
        </article>
      </div>
    </section>
  );
}
