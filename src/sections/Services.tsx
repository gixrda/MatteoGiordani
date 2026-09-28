import { Reveal } from '../components/Reveal';

const CAPABILITIES = [
  {
    index: '01',
    name: 'SEO',
    claim: 'Get found.',
    text: 'Understanding how people search — then shaping the site so the right pages answer them, and search engines can read every one.',
    topics: [
      'Technical SEO',
      'On-page SEO',
      'Keyword research',
      'Search Console',
      'Information architecture',
      'Internal linking',
      'SEO audits',
    ],
  },
  {
    index: '02',
    name: 'Website Optimization',
    claim: 'Perform better.',
    text: 'Working directly in the front-end: faster loading, stable layouts, clearer interfaces and changes shipped in the codebase — not left in a report.',
    topics: [
      'Core Web Vitals',
      'Front-End optimization',
      'Performance',
      'UX',
      'Responsive design',
      'Technical implementation',
    ],
  },
];

const FLOW = [
  ['Diagnose', 'Audit, priorities and evidence from Search Console and real-user data.'],
  ['Implement', 'Front-End and on-page changes, made directly in the website.'],
  ['Verify', 'Checked against the same data — so progress is measured, not assumed.'],
];

export function Services() {
  return (
    <section id="services" className="section services" aria-labelledby="services-title">
      <div className="section__inner">
        <div className="section-head">
          <p className="label section-head__label">Services</p>
          <div>
            <Reveal>
              <h2 id="services-title" className="display-l">
                Two capabilities.
                <br />
                One system.
              </h2>
            </Reveal>
            <p className="lead section-head__intro">
              Search visibility and website quality are usually sold separately. I treat them as one problem, and work
              on both sides of it.
            </p>
          </div>
        </div>

        <div className="services__split">
          {CAPABILITIES.map((c, i) => (
            <article key={c.name} className="capability" aria-labelledby={`cap-${i}`}>
              <p className="capability__name label">
                <span>{c.index}</span>
                {c.name}
              </p>
              <h3 id={`cap-${i}`} className="capability__claim display-l">
                {c.claim}
              </h3>
              <p className="capability__text">{c.text}</p>
              <ul className="capability__topics">
                {c.topics.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="services__flow">
          <p className="label">Where they meet</p>
          <ol className="flow">
            {FLOW.map(([step, text], i) => (
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
