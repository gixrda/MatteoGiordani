import { Reveal } from '../components/Reveal';
import { BrowserFrame, PhoneFrame, Placeholder } from '../components/Frames';

const META = [
  ['Role', '[PLACEHOLDER]'],
  ['Scope', 'SEO · Front-End · Website optimization'],
  ['Period', '[PLACEHOLDER]'],
  ['Stack', '[PLACEHOLDER]'],
];

const STORY = [
  {
    title: 'Context',
    body: '[PLACEHOLDER] The starting point: the business, its search landscape and the technical state of the website.',
  },
  {
    title: 'What I did',
    list: [
      'Technical SEO — [PLACEHOLDER: verified scope]',
      'Front-End implementation — [PLACEHOLDER]',
      'Performance & UX — [PLACEHOLDER]',
    ],
  },
  {
    title: 'Evidence',
    body: '[PLACEHOLDER] Verified results only — from Search Console, field data or documented before/after. Nothing is shown until it can be sourced.',
  },
];

export function SelectedWork() {
  return (
    <section id="work" className="section work" aria-labelledby="work-title">
      <div className="section__inner">
        <div className="section-head">
          <p className="label section-head__label">Selected work</p>
          <div>
            <Reveal>
              <h2 id="work-title" className="display-l">
                Work that shows both sides.
              </h2>
            </Reveal>
            <p className="lead section-head__intro">
              Each case shows the search problem and the website work behind it. Evidence is published only when it can
              be verified.
            </p>
          </div>
        </div>

        <article id="ezdirect" className="case" aria-labelledby="case-ezdirect">
          <header className="case__head">
            <span className="case__index label">01</span>
            <h3 id="case-ezdirect" className="case__title display-l">
              ezdirect.it
            </h3>
            <ul className="case__tags" aria-label="Disciplines">
              <li>SEO</li>
              <li>Front-End</li>
              <li>Website optimization</li>
            </ul>
          </header>

          <Reveal className="case__visual">
            <BrowserFrame url="ezdirect.it">
              <Placeholder>Homepage screenshot — ezdirect.it, full width, current version.</Placeholder>
            </BrowserFrame>
          </Reveal>

          <dl className="case__meta">
            {META.map(([k, v]) => (
              <div key={k}>
                <dt className="label">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          <div className="case__story">
            {STORY.map((s) => (
              <div key={s.title}>
                <h4 className="case__story-title">{s.title}</h4>
                {s.body && <p>{s.body}</p>}
                {s.list && (
                  <ul>
                    {s.list.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="case__pair">
            <figure>
              <div className="case__pair-frame">
                <Placeholder>Before — shown only where documented evidence exists.</Placeholder>
              </div>
              <figcaption className="label">Before</figcaption>
            </figure>
            <figure>
              <div className="case__pair-frame">
                <Placeholder>After — the implemented change, same view.</Placeholder>
              </div>
              <figcaption className="label">After</figcaption>
            </figure>
          </div>

          <a className="link-arrow case__link" href="#ezdirect">
            View case study <span aria-hidden>→</span>
          </a>
        </article>

        <article className="case case--secondary" aria-labelledby="case-trainly">
          <div className="case__side">
            <p className="case__index label">
              02 <span className="case__kind">Personal project</span>
            </p>
            <h3 id="case-trainly" className="case__title display-m">
              Trainly
            </h3>
            <p className="case__intro">
              A running companion I design and build on my own. It's where I practise product thinking end to end —
              from what runners actually need, to data, interface and growth.
            </p>
            <ul className="case__tags case__tags--small" aria-label="Focus">
              <li>Product thinking</li>
              <li>Running</li>
              <li>Data</li>
              <li>UX</li>
              <li>Front-End</li>
              <li>Growth</li>
            </ul>
            <p className="case__note">Personal project — not a client engagement. Status: [PLACEHOLDER]</p>
          </div>
          <div className="case__device">
            <PhoneFrame>
              <div className="trainly" aria-label="Trainly interface concept">
                <p className="trainly__label label">This week</p>
                <p className="trainly__title">Build the base.</p>
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
                <p className="trainly__foot label">Concept UI · [PLACEHOLDER]</p>
              </div>
            </PhoneFrame>
          </div>
        </article>
      </div>
    </section>
  );
}
