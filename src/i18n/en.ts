/**
 * English copy. Every visible string of the interface lives here;
 * `it.ts` must provide the same shape (enforced by the Dictionary type).
 */
export const en = {
  meta: {
    title: 'Matteo Giordani — SEO Specialist & Front-End Developer',
    description: 'I build websites that rank, perform and convert. I help businesses get found on Google.',
  },
  skipLink: 'Skip to content',
  nav: {
    primary: 'Primary',
    mobile: 'Mobile',
    language: 'Language',
    menu: 'Menu',
    close: 'Close',
    links: { work: 'Work', about: 'About', insights: 'Insights', contact: 'Contact' },
  },

  /* ---------------- Narrative ---------------- */
  narrativeLabel: 'How a website gets better',
  hero: {
    role: 'SEO Specialist & Front-End Developer',
    title: 'I build websites that rank, perform and convert.',
    lead: 'I help businesses get found on Google.',
    primary: 'Get in touch',
    secondary: 'View my work',
    cue: 'Scroll — watch the website build itself',
  },
  intro: {
    kicker: 'From unfinished to found',
    title: 'The website builds itself while you scroll.',
  },
  scenes: {
    discover: {
      label: 'Discover',
      title: "Being online isn't the same as being found.",
      body: 'Most websites exist. Few are found by the people already searching for what they offer.',
    },
    understand: {
      label: 'Understand',
      title: 'Before optimizing a website, understand how people search.',
      body: 'Queries reveal intent. Intent decides what each page should be — and where it belongs in the site.',
    },
    optimize: {
      label: 'Optimize',
      title: 'Make the website understandable to search engines — and to people.',
      body: 'Semantic hierarchy, metadata, internal links, indexability. The structure nobody sees — and everybody depends on.',
    },
    build: {
      label: 'Build',
      title: "I don't stop at the audit. I can build the fix.",
      body: 'The person who finds the problem also writes the components, the layout and the CSS that solve it. Nothing lost in a hand-off.',
    },
    perform: {
      label: 'Perform',
      title: 'Lighter. Faster. Stable.',
      statesLabel: 'Performance states',
      states: ['Heavy', 'Cleaner', 'Lighter', 'Faster'],
      vitals: [
        { abbr: 'LCP', name: 'Loading', text: 'The main content appears early.' },
        { abbr: 'INP', name: 'Responsiveness', text: 'The page reacts without delay.' },
        { abbr: 'CLS', name: 'Visual stability', text: 'Nothing moves unexpectedly.' },
      ],
      note: 'Core Web Vitals, shown as concepts — not measured scores.',
    },
    convert: {
      label: 'Convert',
      title: "A website shouldn't only rank. It should work.",
      body: 'Clear hierarchy, one obvious next step, a journey that ends in a conversation. This is where SEO, Front-End and UX meet.',
      journeyLabel: 'User journey',
      steps: ['Search', 'Land', 'Act'],
    },
  },
  rail: { label: 'Chapters', skip: 'Skip intro' },
  complete: {
    label: '07 — Complete',
    title: 'The website is ready.',
    lead: "You've just watched it being built. Now you're using it.",
  },

  /** The illustrative business site inside the object — not a client. */
  demo: {
    domain: 'your-business.it',
    path: '/strength-training',
    untitled: 'untitled',
    brand: ['your', 'business'],
    search: 'strength training near me',
    queries: [
      { q: 'strength training near me', intent: 'local' },
      { q: 'how to start lifting weights', intent: 'informational' },
      { q: 'personal trainer cost', intent: 'commercial' },
      { q: 'your-business opening hours', intent: 'navigational' },
    ],
    roles: { navigation: 'navigation', landing: 'landing page · local', service: 'service page', guide: 'guide' },
    head: {
      title: 'Strength training in [City] — your-business',
      description: 'Small-group and personal coaching…',
    },
    nav: ['Services', 'Guides', 'Pricing', 'Contact'],
    book: 'Book',
    eyebrow: 'Strength studio · [City]',
    h1: ['Strength training,', 'close to home.'],
    text: 'Small-group sessions and personal coaching, for every level.',
    cta: 'Book a free session',
    cards: [
      { kind: 'Service', title: 'Personal training', text: 'One-to-one coaching, planned around you.' },
      { kind: 'Service', title: 'Small groups', text: 'Up to six people. Same attention.' },
      { kind: 'Guide', title: 'Start lifting safely', text: 'A first-month plan for beginners.' },
    ],
    footer: ['Hours', 'Location', 'FAQ', 'Contact'],
  },

  /* ---------------- Sections ---------------- */
  services: {
    label: 'Services',
    title: ['Two capabilities.', 'One system.'],
    intro:
      'Search visibility and website quality are usually sold separately. I treat them as one problem, and work on both sides of it.',
    capabilities: [
      {
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
    ],
    flowLabel: 'Where they meet',
    flow: [
      { step: 'Diagnose', text: 'Audit, priorities and evidence from Search Console and real-user data.' },
      { step: 'Implement', text: 'Front-End and on-page changes, made directly in the website.' },
      { step: 'Verify', text: 'Checked against the same data — so progress is measured, not assumed.' },
    ],
  },
  work: {
    label: 'Selected work',
    title: 'Work that shows both sides.',
    intro: 'Selected projects. Client case studies are added only when their results can be verified.',
    trainly: {
      kind: 'Personal project',
      intro:
        'A running companion I design and build on my own. It’s where I practise product thinking end to end — from what runners actually need, to data, interface and growth.',
      focusLabel: 'Focus',
      tags: ['Product thinking', 'Running', 'Data', 'UX', 'Front-End', 'Growth'],
      note: 'Personal project — not a client engagement. Status: [PLACEHOLDER]',
      uiLabel: 'Trainly interface concept',
      week: 'This week',
      headline: 'Build the base.',
      foot: 'Concept UI · [PLACEHOLDER]',
    },
  },
  about: {
    label: 'About',
    title: 'The overlap is the point.',
    intro:
      "I'm Matteo. I studied how messages reach people, then how systems work. SEO and Front-End are where the two meet — and where I do my best work.",
    listLabel: 'What I bring together',
    terms: [
      { term: 'Communication & Marketing', gloss: 'How a message reaches the right people.' },
      { term: 'Informatics', gloss: 'How systems actually work.' },
      { term: 'SEO', gloss: 'How people search, and what search engines need.' },
      { term: 'Front-End', gloss: 'How interfaces are built — and built well.' },
      { term: 'Sport', gloss: 'Endurance. Consistency over intensity.' },
      { term: 'Curiosity', gloss: 'Why things work, not only that they do.' },
    ],
    result: 'One person, both sides of the problem.',
    twin: {
      label: 'Digital twin · v0.1',
      attrs: [
        ['role', 'seo front-end'],
        ['based', 'Italy'],
        ['speaks', 'it en'],
        ['trains', 'endurance'],
        ['open-to', 'freelance projects'],
      ],
      text: 'A person described the way I describe websites: structure first. Outside work, endurance sport keeps the same habit — steady, measurable progress.',
      note: 'Portrait: [PLACEHOLDER]',
    },
  },
  insights: {
    label: 'Insights',
    title: 'Notes on search and the web.',
    intro:
      'Short, practical writing on SEO, front-end and performance — for people who run websites, not only for specialists.',
    filterLabel: 'Filter by topic',
    categories: {
      all: 'All',
      seo: 'SEO',
      technical: 'Technical SEO',
      frontend: 'Front-End',
      performance: 'Performance',
      cwv: 'Core Web Vitals',
      growth: 'Growth',
    },
    posts: [
      {
        category: 'seo',
        title: 'Search intent comes before keywords.',
        dek: 'The first question is what someone wants — not which words they type.',
      },
      {
        category: 'technical',
        title: 'What technical SEO covers — and what it doesn’t.',
        dek: 'Crawling, rendering and indexing, explained for business owners.',
      },
      {
        category: 'cwv',
        title: 'LCP, INP, CLS: what each metric is really measuring.',
        dek: 'Three metrics, three different moments of a visit.',
      },
      {
        category: 'frontend',
        title: 'Semantic HTML is an SEO decision.',
        dek: 'Structure written once serves people, assistive technology and search engines.',
      },
      {
        category: 'performance',
        title: 'Speed starts in the template, not in a plugin.',
        dek: 'Where performance is won or lost in a real codebase.',
      },
      {
        category: 'growth',
        title: 'Local visibility: where a small business should start.',
        dek: 'A practical order of work for businesses that depend on their area.',
      },
    ],
    status: 'Draft · [PLACEHOLDER]',
  },
  contact: {
    label: 'Contact',
    title: "Let's build something that gets found.",
    lead: 'Have a website that could perform better? Tell me where it stands today and what it should achieve.',
    channels: { email: 'Email', linkedin: 'LinkedIn' },
    form: {
      name: 'Name',
      email: 'Email',
      company: 'Company / Website',
      companyPlaceholder: 'your-business.it',
      topic: 'What can I help you with?',
      topics: { seo: 'SEO', optimization: 'Website optimization', both: 'Both', unsure: 'Not sure yet' },
      message: 'Message',
      submit: 'Send message',
      sent: 'Thanks. This is a mockup — the form isn’t connected yet, so nothing was sent.',
    },
  },
  footer: {
    role: 'SEO Specialist & Front-End Developer',
    meta: '© 2026 · Italy · IT / EN',
    top: 'Back to top',
  },
};

export type Dictionary = typeof en;
