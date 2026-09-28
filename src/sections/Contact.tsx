import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Reveal } from '../components/Reveal';

const TOPICS = ['SEO', 'Website optimization', 'Both', 'Not sure yet'];

const CHANNELS = [
  { label: 'Email', value: 'hello@[PLACEHOLDER]', href: 'mailto:hello@example.com' },
  { label: 'LinkedIn', value: '[PLACEHOLDER]', href: '#contact' },
  { label: 'Instagram', value: '[PLACEHOLDER]', href: '#contact' },
];

/** Grows with its content; never shows a large empty box. */
function autoResize(e: ChangeEvent<HTMLTextAreaElement>) {
  const el = e.currentTarget;
  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight}px`;
}

export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="section__inner">
        <p className="label">Contact</p>
        <Reveal>
          <h2 id="contact-title" className="contact__title display-xl">
            Let's build something that gets found.
          </h2>
        </Reveal>

        <div className="contact__grid">
          <div className="contact__aside">
            <p className="lead">
              Have a website that could perform better? Tell me where it stands today and what it should achieve.
            </p>
            <ul className="contact__channels">
              {CHANNELS.map((c) => (
                <li key={c.label}>
                  <span className="label">{c.label}</span>
                  <a href={c.href}>{c.value}</a>
                </li>
              ))}
            </ul>
          </div>

          <form className="form" onSubmit={onSubmit}>
            <div className="form__row">
              <label className="field">
                <span className="field__label">Name</span>
                <input name="name" autoComplete="name" required />
              </label>
              <label className="field">
                <span className="field__label">Email</span>
                <input name="email" type="email" autoComplete="email" required />
              </label>
            </div>
            <label className="field">
              <span className="field__label">Company / Website</span>
              <input name="company" autoComplete="organization" placeholder="your-business.it" />
            </label>

            <fieldset className="field field--choices">
              <legend className="field__label">What can I help you with?</legend>
              <div className="choices">
                {TOPICS.map((t) => (
                  <label key={t} className="choice">
                    <input type="radio" name="topic" value={t} defaultChecked={t === 'Both'} />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="field">
              <span className="field__label">Message</span>
              <textarea name="message" rows={2} onChange={autoResize} required />
            </label>

            <div className="form__submit">
              <button type="submit" className="btn btn--primary">
                Send message
              </button>
              <p className="form__status" role="status">
                {sent ? 'Thanks. This is a mockup — the form isn’t connected yet, so nothing was sent.' : ''}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
