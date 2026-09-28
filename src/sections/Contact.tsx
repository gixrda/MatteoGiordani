import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Reveal } from '../components/Reveal';
import { useI18n } from '../i18n/I18nContext';
import type { Dictionary } from '../i18n/en';

type Topic = keyof Dictionary['contact']['form']['topics'];

const TOPICS: Topic[] = ['seo', 'optimization', 'both', 'unsure'];

const EMAIL = 'mattegiordani02@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/matteogiordani02/';

/** Grows with its content; never shows a large empty box. */
function autoResize(e: ChangeEvent<HTMLTextAreaElement>) {
  const el = e.currentTarget;
  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight}px`;
}

export function Contact() {
  const { t } = useI18n();
  const copy = t.contact;
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="section__inner">
        <p className="section-title">{copy.label}</p>
        <Reveal>
          <h2 id="contact-title" className="contact__title display-xl">
            {copy.title}
          </h2>
        </Reveal>

        <div className="contact__grid">
          <div className="contact__aside">
            <p className="lead">{copy.lead}</p>
            <ul className="contact__channels">
              <li>
                <span className="label">{copy.channels.email}</span>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li>
                <span className="label">{copy.channels.linkedin}</span>
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/matteogiordani02
                </a>
              </li>
            </ul>
          </div>

          <form className="form" onSubmit={onSubmit}>
            <div className="form__row">
              <label className="field">
                <span className="field__label">{copy.form.name}</span>
                <input name="name" autoComplete="name" required />
              </label>
              <label className="field">
                <span className="field__label">{copy.form.email}</span>
                <input name="email" type="email" autoComplete="email" required />
              </label>
            </div>
            <label className="field">
              <span className="field__label">{copy.form.company}</span>
              <input name="company" autoComplete="organization" placeholder={copy.form.companyPlaceholder} />
            </label>

            <fieldset className="field field--choices">
              <legend className="field__label">{copy.form.topic}</legend>
              <div className="choices">
                {TOPICS.map((topic) => (
                  <label key={topic} className="choice">
                    <input type="radio" name="topic" value={topic} defaultChecked={topic === 'both'} />
                    <span>{copy.form.topics[topic]}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="field">
              <span className="field__label">{copy.form.message}</span>
              <textarea name="message" rows={2} onChange={autoResize} required />
            </label>

            <div className="form__submit">
              <button type="submit" className="btn btn--primary">
                {copy.form.submit}
              </button>
              <p className="form__status" role="status">
                {sent ? copy.form.sent : ''}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
