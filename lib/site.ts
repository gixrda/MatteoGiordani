import { href, type Locale } from './routes';

// Facts on hand (spec §3). Values in brackets are placeholders that must stay visible until provided.

// [ADD WHEN AVAILABLE] — set NEXT_PUBLIC_SITE_URL at build time once the domain exists.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.example.com').replace(/\/$/, '');

export const PERSON = {
  name: 'Matteo Giordani',
  title: 'SEO Specialist & Front-End Developer',
  email: 'mattegiordani02@gmail.com',
  linkedin: 'https://www.linkedin.com/in/matteogiordani02/',
  instagram: null as string | null, // [ADD INSTAGRAM URL]
};

// [CALENDLY / CAL.COM URL OR FORM-ONLY — TO DECIDE]. While null, "Book a call" leads to the contact form.
export const BOOKING_URL: string | null = null;

/** Where every "Book a call" goes: the booking page once chosen, the contact form until then. */
export const bookHref = (l: Locale) => BOOKING_URL ?? href.contact(l);
