import { Reveal } from '../components/Reveal';

const TERMS = [
  ['', 'Communication & Marketing', 'How a message reaches the right people.'],
  ['+', 'Informatics', 'How systems actually work.'],
  ['+', 'SEO', 'How people search, and what search engines need.'],
  ['+', 'Front-End', 'How interfaces are built — and built well.'],
  ['+', 'Sport', 'Endurance. Consistency over intensity.'],
  ['+', 'Curiosity', 'Why things work, not only that they do.'],
];

export function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="section__inner">
        <div className="section-head">
          <p className="label section-head__label">About</p>
          <div>
            <Reveal>
              <h2 id="about-title" className="display-l">
                The overlap is the point.
              </h2>
            </Reveal>
            <p className="lead section-head__intro">
              I'm Matteo. I studied how messages reach people, then how systems work. SEO and Front-End are where the
              two meet — and where I do my best work.
            </p>
          </div>
        </div>

        <div className="about__grid">
          <ol className="equation" aria-label="What I bring together">
            {TERMS.map(([op, term, gloss]) => (
              <li key={term}>
                <span className="equation__op" aria-hidden>
                  {op}
                </span>
                <span className="equation__term">{term}</span>
                <span className="equation__gloss">{gloss}</span>
              </li>
            ))}
            <li className="equation__result">
              <span className="equation__op" aria-hidden>
                =
              </span>
              <span className="equation__term">One person, both sides of the problem.</span>
            </li>
          </ol>

          <aside className="twin" aria-label="Digital twin">
            <p className="label twin__label">Digital twin · v0.1</p>
            <pre className="twin__node">
              <code>
                <span className="t">&lt;matteo-giordani</span>
                {'\n  '}
                <span className="a">role</span>=<span className="s">"seo front-end"</span>
                {'\n  '}
                <span className="a">based</span>=<span className="s">"Italy"</span>
                {'\n  '}
                <span className="a">speaks</span>=<span className="s">"it en"</span>
                {'\n  '}
                <span className="a">trains</span>=<span className="s">"endurance"</span>
                {'\n  '}
                <span className="a">open-to</span>=<span className="s">"freelance projects"</span>
                {'\n'}
                <span className="t">/&gt;</span>
              </code>
            </pre>
            <p className="twin__text">
              A person described the way I describe websites: structure first. Outside work, endurance sport keeps the
              same habit — steady, measurable progress.
            </p>
            <p className="twin__note label">Portrait: [PLACEHOLDER]</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
