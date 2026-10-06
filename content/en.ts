// English copy (spec §7–§9). Headline syntax: *text* = italic accent (--act), _text_ = italic in text colour.
// Bracketed values are placeholders that must stay visible until Matteo provides real content.

import type { ServiceSlug, ProjectSlug } from '@/lib/routes';

export type Region = 'tab' | 'url' | 'nav' | 'h1' | 'text' | 'cta' | 'img' | 'h2' | 'local' | 'widget' | 'footer' | 'page';
export type Check = { title: string; text: string; region: Region };
export type Faq = { q: string; a: string };
export type Related = { slug: ProjectSlug; badge: string; cap: string; text: string };

export type ServiceContent = {
  switcher: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1a: string;
  h1b: string;
  lead: string;
  paragraph: string;
  toolTitle: string;
  toolSub: string;
  incPara: string;
  checks: Check[];
  related: Related[];
  faq: Faq[];
};

export type ProjectSection = { title: string; body?: string; list?: string[] };
export type ProjectContent = {
  name: string;
  badge: string;
  cap: string;
  filter: 'website' | 'mobile';
  cardText: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  facts: { label: string; value: string }[];
  sections: ProjectSection[];
  /** Real project images; the first one is the cover used on cards. */
  shots?: { src: string; w: number; h: number; alt: string }[];
};

const en = {
  ui: {
    skip: 'Skip to content',
    nav: { home: 'Home', services: 'Services', work: 'Work', about: 'About', insights: 'Blog', contact: 'Contact' },
    navLabel: 'Main',
    menu: 'Menu',
    close: 'Close menu',
    book: 'Book a call',
    navCta: 'Let’s talk',
    lightTheme: 'Light theme',
    language: 'Language',
    exampleSite: 'Example site',
    illustrative: 'Example business · illustrative, not a client',
    copyNotice: '',
    breadcrumbHome: 'Home',
    breadcrumbServices: 'Services',
    breadcrumbWork: 'Work',
    stickyBar: 'Questions about your site?',
    emailMe: 'Email me',
    explore: 'Explore',
    allProjects: 'All projects',
  },

  meta: {
    homeTitle: 'Matteo Giordani — SEO Specialist & Front-End Developer',
    homeDescription:
      'I build websites that rank, perform and convert. SEO and front-end development in one place, for businesses that want to be found on Google.',
  },

  hero: {
    h1: 'I build websites that rank, perform and convert.',
    h1Lead: 'I build websites that',
    h1Words: ['rank.', 'perform.', 'convert.'],
    lead: 'I help businesses get found on Google. SEO and front-end development in one place, from the first check to the code.',
    askLabel: 'Owners usually ask me',
    asks: [
      { text: "Why can't customers find me on Google?", service: 'seo' as ServiceSlug },
      { text: 'Is my site slow on phones?', service: 'performance' as ServiceSlug },
      { text: 'Do I need a new website?', service: 'front-end' as ServiceSlug },
    ],
    trust: ['You talk to the person doing the work', 'Fixes made in the code', 'First call, no commitment'],
    viewWork: 'or view my work',
    photoAlt: 'Matteo Giordani at his desk',
    cafePhotoAlt: 'Matteo Giordani taking notes at a café table',
    chipHello: "Ciao, I'm Matteo Giordani",
    chipFactTitle: 'Pisa',
    chipFactCap: 'Working with businesses across Italy',
    toolsLabel: 'Tools I use every day',
    tools: ['SEOzen', 'Google Search Console', 'Lighthouse', 'Claude', 'ChatGPT', 'Figma', 'n8n', 'Adobe', 'Photoshop', 'HTML', 'CSS', 'JavaScript'],
  },

  layers: {
    h2: 'One website, *three layers.*',
    text: 'Website optimization and SEO are one job. What people find on Google, how fast the page feels and the code underneath depend on each other, so I work on all three at once.',
    items: [
      { title: 'Found', cap: 'SEO & Technical SEO', text: 'What people see on Google, and what Google can read on your pages: titles, descriptions, structure, indexing.', service: 'seo' as ServiceSlug },
      { title: 'Fast', cap: 'Performance & Core Web Vitals', text: "How quickly the page shows up and responds on a phone, measured with Google's own signals.", service: 'performance' as ServiceSlug },
      { title: 'Built right', cap: 'Front-End development', text: 'The code underneath: where the fixes for the first two layers actually happen.', service: 'front-end' as ServiceSlug },
    ],
    button: 'How I work on each layer',
    planeSearch: 'Search',
    planeSpeed: 'Speed',
    planeCode: 'Code',
  },

  comparison: {
    h2: 'Why a report *isn’t enough*',
    text: 'Most businesses get a list of problems, then need someone else to fix them. Two suppliers, and nobody owns the result.',
    left: {
      title: 'SEO report only',
      rows: [
        { b: 'A list of problems', s: 'Someone else has to fix them' },
        { b: 'SEO and developer are two suppliers', s: 'Responsibility gets lost in between' },
        { b: 'Generic checklists', s: 'The same advice for every business' },
        { b: 'Results judged by feel', s: 'No before, no after' },
      ],
    },
    right: {
      title: 'SEO + Front-End, one person',
      rows: [
        { b: 'Problems fixed in the code', s: 'I work directly on your website' },
        { b: 'One person, one responsibility', s: 'From the first check to the launch' },
        { b: 'Explained in plain language', s: 'You understand why, not only what' },
        { b: 'Measured before and after', s: 'Lighthouse and Search Console' },
      ],
    },
  },

  process: {
    h2: 'Watch a website *get better*',
    text: 'One example site, six steps. This is the whole job, start to finish.',
    play: 'Play',
    pause: 'Pause',
    stepsLabel: 'Steps',
    steps: [
      { name: 'Discover', kicker: 'Where you stand', text: 'Customers search for what you offer. Your site is there, but nobody picks it.' },
      { name: 'Understand', kicker: 'Analysis', text: "I find what's holding it back: slow images, missing titles, pages Google can't read." },
      { name: 'Optimize', kicker: 'SEO', text: 'Titles, descriptions and headings that tell Google, and people, what you do.' },
      { name: 'Build', kicker: 'Front-End', text: 'I work directly on the code: layout, mobile, the details.' },
      { name: 'Perform', kicker: 'Core Web Vitals', text: 'Fast where it counts, on a phone. Measured, not promised.' },
      { name: 'Convert', kicker: 'Results', text: 'Found, opened, booked. Then measured again in Search Console.' },
    ],
  },

  build: {
    pins: ['Uncompressed photo, slow to load', "No H1: Google can't tell what this is", 'Title tag: “Home”', 'Breaks on mobile'],
    stageLabel: 'Example website, stage: {name}',
    cwvTitle: 'Core Web Vitals',
    cwvNote: 'illustrative',
  },

  work: {
    h2: 'Selected *work*',
    text: "A selection of things I've built, optimized and explored.",
    filters: { all: 'All', website: 'Website', mobile: 'Mobile app' },
    filterLabel: 'Filter projects',
  },

  cwv: {
    caption: 'Core Web Vitals · before → after',
    metric: 'Metric',
    before: 'Before',
    after: 'After',
    perf: 'Lighthouse performance',
  },

  proof: {
    h2: 'Less _talk_, more *measurements*',
    text: 'Before and after, with the tools Google itself uses. Including on this website.',
    launchCap: 'ezdirect.it',
    launchDate: 'Sept *2026*',
    launchText: 'New website goes live',
    lighthouseCap: 'This website · Lighthouse, mobile',
    lighthouseNote: 'measured at launch',
    rings: ['Performance', 'Accessibility', 'Best practices', 'SEO'],
    studyCap: 'Where I studied',
    study: [
      { title: 'Computer Science', text: 'Technical Diploma' },
      { title: 'Communication & Marketing', text: "Bachelor's Degree · University of Pavia" },
    ],
    testimonialCap: 'Testimonials',
    // Remove the card entirely if no real testimonial exists at launch (spec §7.7).
    testimonial: '[Client quote to add, with name and business]' as string | null,
  },

  about: {
    h2: 'Technology first. _Then_ communication. Now *both.*',
    p1: 'I started with technology, studied Communication & Marketing, and eventually found the intersection between the two in websites and search.',
    p2: 'Today, I work across SEO and Front-End development, combining the way people search with the way websites are built.',
    offLabel: 'Off-screen:',
    off: ['Endurance', 'Sport', 'Travel', 'Nature'],
    more: 'More about me',
    // About page
    metaTitle: 'About — Matteo Giordani',
    metaDescription: 'SEO Specialist and Front-End Developer: a background in computer science and in communication, working where search and websites meet.',
    pageH1: 'Technology first. _Then_ communication. Now *both.*',
    equationLabel: 'The short version',
    equation: [
      { a: 'Computer Science', b: 'Technical Diploma' },
      { a: 'Communication & Marketing', b: "Bachelor's Degree · University of Pavia" },
      { a: 'Search + websites', b: 'What I work on today' },
    ],
    howTitle: 'How I _work_',
    how: [
      'You talk to the person doing the work, from the first call to the launch.',
      'Fixes are made in the code, not handed over as a list.',
      'Every change is measured before and after, with Lighthouse and Search Console.',
    ],
    more2: 'I’m a keen endurance athlete. Distance teaches you that results don’t come in a day: they come from a plan, consistent training and the patience to measure every step. I bring the same discipline to every project: clear priorities, steady work, no shortcuts.',
    officePhotoAlt: 'Matteo Giordani on a call at his desk',
    methodTitle: 'An endurance mindset, *applied to your website.*',
    methodText: 'The habits that get me to the finish line are the same ones I bring to every project.',
    method: [
      { title: 'A plan before the start', text: 'No race without preparation: every project starts with an analysis and clear priorities.' },
      { title: 'Consistency, not sprints', text: 'Steady, verifiable improvements instead of one-off fixes that fade.' },
      { title: 'Everything is measured', text: 'Before and after, with the same tools. Progress you can see, not promises.' },
      { title: 'All the way to the finish', text: 'From the first call to the launch, the same person on your project.' },
    ],
  },

  insights: {
    h2: 'The blog, *in plain words*',
    text: 'Short notes on search, speed and websites, for people who run a business.',
    button: 'All articles',
    draft: '[DRAFT]',
    items: [
      { tag: 'SEO', title: 'Your meta title is your shop sign on Google' },
      { tag: 'Performance', title: 'Core Web Vitals, explained for restaurant owners' },
      { tag: 'Optimization', title: 'New website or better website? How to tell' },
    ],
    metaTitle: 'Blog — Matteo Giordani',
    metaDescription: 'Short notes on search, speed and websites, for people who run a business.',
    empty: 'Articles are being written. [DRAFT — publish the first article or hide this page]',
  },

  contact: {
    h2: 'Tell me about *your website*',
    text: "A few details and I'll reply to set up the call. [Reply time to confirm]",
    need: 'What do you need?',
    needChoose: 'Choose one',
    needs: ['SEO and visibility on Google', 'Site speed and Core Web Vitals', 'Development, redesign or front-end fixes', 'An initial review of my website'],
    name: 'Name',
    email: 'Email',
    website: 'Website',
    message: 'Anything else?',
    optional: '(optional)',
    messagePlaceholder: "My site doesn't bring in bookings, it's slow on phones, I don't know where to start…",
    privacy: 'I have read the {link} and agree to be contacted about my request.',
    privacyLink: 'privacy policy',
    submit: 'Book a call',
    errors: {
      need: 'Choose the option closest to your request.',
      name: 'Add your name so I know who I’m talking to.',
      email: 'Add an email address like name@business.it.',
      privacy: 'Tick the box to accept the privacy policy, otherwise I can’t reply.',
    },
    success: 'Your email app has opened with your request. Send it and I’ll reply to set up the call.',
    instagram: 'Instagram [to add]',
    metaTitle: 'Contact — Matteo Giordani',
    metaDescription: 'Tell me about your website and book a first call, no commitment.',
  },

  faq: {
    h2: 'Frequently asked *questions*',
    text: 'What business owners ask me most about how I work, costs and tools.',
    tabsLabel: 'FAQ categories',
    moreTitle: 'Other *questions?*',
    moreText: 'Book a first call, no commitment, and we’ll talk it through.',
    groups: [
      {
        name: 'How I work',
        items: [
          { q: 'Who do I talk to during the project?', a: 'With me. The person who analyses your site is the same person who changes the code, from the first call to the launch.' },
          { q: 'How does the process work?', a: 'Four steps: a call to understand your business, an analysis that measures what holds the site back, the work done directly on the site, then a before-and-after measurement with the same tools.' },
          { q: 'Can you work on my existing website?', a: 'Yes, that’s most of the work. I start from what you have and change what’s needed. [Confirm platforms: WordPress, Shopify, custom…]' },
          { q: 'Can you guarantee first place on Google?', a: 'No, and nobody honestly can. What I can do is remove what’s holding your site back and measure what changes.' },
        ],
      },
      {
        name: 'Costs and timing',
        items: [
          { q: 'How much does it cost?', a: 'There is no price list by page count: the scope depends on how big the site is, where it starts from, what matters first and whether the work is one-off or ongoing. [Confirm your pricing approach]' },
          { q: 'How long does a project take?', a: 'It depends on the size of the site and its starting point; after the analysis you get a clear plan. [Typical timeframes to confirm]' },
          { q: 'Do you offer ongoing support?', a: 'A focused intervention, or a monthly follow-up with Search Console checks and fixes. [confirm Matteo offers ongoing work]' },
          { q: 'When will I see results on Google?', a: 'Technical fixes can be picked up within weeks; rankings usually move over months. You’ll see progress in Search Console along the way, not a promise of positions.' },
        ],
      },
      {
        name: 'Tools',
        items: [
          { q: 'Which tools do you use?', a: 'Search Console, Lighthouse and SEOzen to measure; Figma and Photoshop to design; HTML, CSS and JavaScript to build. Claude, ChatGPT and n8n are part of my daily work too.' },
          { q: 'Do I need a new website to be fast?', a: 'Usually not. Many sites get much faster with targeted fixes. If the foundation is the problem, I’ll tell you.' },
          { q: 'Will I still be able to update the site myself?', a: 'That is the goal: I keep your editing workflow where possible and explain anything that changes.' },
        ],
      },
    ],
  },

  servicePage: {
    switcherLabel: 'Services',
    seeIncluded: 'See what’s included',
    note: 'A first look at your site, no commitment.',
    tryIt: 'Try it',
    incH2: 'Every check, *on the page it touches.*',
    viewVisitors: 'What visitors see',
    viewGoogle: 'What Google reads',
    viewLabel: 'Page view',
    checksLabel: 'Checks',
    howH2: 'Four steps. *No surprises.*',
    howText: 'The same for every project, so you always know what’s happening and why.',
    steps: [
      { word: 'Call', mono: 'Getting to know you', text: 'We look at your site together. You tell me about the business; I ask the questions that matter.' },
      { word: 'Analysis', mono: 'Measure first', text: 'I measure and find what’s holding the site back, in order of impact.' },
      { word: 'Work', mono: 'On the site', text: 'I fix it directly in the code, explaining every change in plain words.' },
      { word: 'Measure', mono: 'Before and after', text: 'Same tools, same pages, compared honestly. Then we decide what comes next.' },
    ],
    relatedH2: 'The work speaks. *See it take shape.*',
    relatedText: 'Projects where this service did the heavy lifting, with the context behind each choice.',
    scopeH2: 'The price follows *your website.*',
    scopeText: 'No price list by page count: what matters is what each page has to do. Four things shape the scope. [Confirm your pricing approach]',
    scopeLink: 'Tell me about your site',
    scope: [
      { title: 'How big the site is', text: 'Ten pages built on one template are not the same job as ten pages that are all different.' },
      { title: 'Where it starts from', text: 'A site with a few fixable issues needs less work than one built on a shaky foundation.' },
      { title: 'What matters first', text: 'Visibility, speed or both: we choose the priorities together.' },
      { title: 'One-off or ongoing', text: 'A focused intervention, or a monthly follow-up with Search Console checks and fixes. [confirm Matteo offers ongoing work]' },
    ],
    faqH2: 'What business owners *search for.*',
    faqText: 'The questions I hear most, answered the way I’d answer them on a call.',
    faqAsk: 'Ask your own question',
    ctaH2: 'The next step *starts with your website.*',
    ctaText: 'Send me your site’s address, or tell me what isn’t working. I’ll reply with what I’d look at first. [Reply time to confirm]',
    regions: {
      tab: 'the title in the browser tab and on Google',
      url: 'the page address',
      nav: 'the menu',
      h1: 'the main heading',
      text: 'the opening text',
      cta: 'the booking button',
      img: 'the main photo',
      h2: 'the section headings',
      local: 'the address and contact details',
      widget: 'a third-party chat widget',
      footer: 'the footer',
      page: 'the whole page',
    } as Record<Region, string>,
  },

  tools: {
    desktop: 'Desktop',
    mobile: 'Mobile',
    metaTitle: 'Meta title',
    metaDescription: 'Meta description',
    snippetTitle: 'Trattoria Esempio — Cucina pavese in centro a Pavia',
    snippetDescription: 'Piatti della tradizione pavese, a pranzo e a cena, a due passi dal centro. Prenota un tavolo online in pochi secondi.',
    snippetRule: 'Rule of thumb: about 60 characters for titles, 155 for descriptions. Google cuts by pixel width, so it’s a guide, not a law.',
    lcpLabel: 'Largest Contentful Paint',
    zones: ['Good', 'Needs improvement', 'Poor'],
    lcpFooter: [
      { k: 'LCP', v: '≤ 2.5 s', t: 'Main content shows up' },
      { k: 'INP', v: '≤ 200 ms', t: 'Page reacts to taps' },
      { k: 'CLS', v: '≤ 0.1', t: 'Nothing jumps around' },
    ],
    lcpNote: 'Google’s public thresholds. Move the slider: these are not measurements of any real site.',
    before: 'Before',
    after: 'After',
    notesAfter: [
      { k: 'avif, 1200w', t: 'A fraction of the weight, same look.' },
      { k: 'width/height', t: 'Space reserved: the page doesn’t jump (CLS).' },
      { k: 'h1 + alt', t: 'Google and screen readers know what this is.' },
    ],
    notesBefore: [
      { k: 'raw .jpg', t: 'Full-size photo straight from the camera.' },
      { k: 'no size', t: 'Text jumps when the image arrives.' },
      { k: 'div title', t: 'No heading: the page has no clear topic.' },
    ],
  },

  services: {
    seo: {
      switcher: 'SEO',
      name: 'SEO & Technical SEO',
      metaTitle: 'SEO & Technical SEO — Matteo Giordani',
      metaDescription: 'Clear titles, readable pages, a structure Google understands. SEO for businesses, checked in Search Console and explained in plain words.',
      h1a: 'Get found by the people',
      h1b: 'already searching for you.',
      lead: 'Clear titles, readable pages, a structure Google understands.',
      paragraph:
        'I look at how people search for businesses like yours, then make sure your pages answer them: what Google reads, what people click, and what stops either from happening. Checked in Search Console, explained in plain words.',
      toolTitle: 'Your result on Google',
      toolSub: 'Write it, see it as people will.',
      incPara:
        'I start from your business and the people you want to reach. Then I connect search, content and the website itself, so every page has a job and Google can tell what it is.',
      checks: [
        { title: 'Your business first', text: 'What you sell, to whom, and where. The searches worth winning start there.', region: 'text' },
        { title: 'Search analysis', text: 'The words your customers actually use, and which page should answer each of them.', region: 'h2' },
        { title: 'Meta titles & descriptions', text: 'The two lines people read before they choose who to click. Written for them first.', region: 'tab' },
        { title: 'Headings & content structure', text: 'One clear H1 per page and sections that answer real questions.', region: 'h1' },
        { title: 'Indexability', text: 'Pages Google can reach and index. The ones it shouldn’t see, kept out.', region: 'url' },
        { title: 'Internal links & architecture', text: 'A structure that leads people, and Google, to the pages that matter.', region: 'nav' },
        { title: 'Local search', text: 'Pages that make sense to people searching near you.', region: 'local' },
        { title: 'Search Console, explained', text: 'Set up, read and translated: what’s improving, what isn’t, and why.', region: 'page' },
      ],
      related: [
        { slug: 'ezdirect', badge: 'Client', cap: 'Website · SEO', text: 'Metadata, technical SEO and Search Console on the new site.' },
      ],
      faq: [
        { q: 'How long before I see results on Google?', a: 'It depends on your site and your competitors. Technical fixes can be picked up within weeks; rankings usually move over months. You’ll see progress in Search Console along the way, not a promise of positions.' },
        { q: 'Can you guarantee first place on Google?', a: 'No, and nobody honestly can. What I can do is remove what’s holding your site back and measure what changes.' },
        { q: 'Will changing my site hurt my current rankings?', a: 'Not if the change is planned: useful content kept, old addresses redirected, nothing important lost. That’s part of the job.' },
        { q: 'Do I have to write the texts myself?', a: 'You know your business; I know how people search for it. We work on the texts together, and I take care of titles, descriptions and structure. [Confirm copywriting scope]' },
      ],
    },
    performance: {
      switcher: 'Performance',
      name: 'Performance & Core Web Vitals',
      metaTitle: 'Performance & Core Web Vitals — Matteo Giordani',
      metaDescription: 'A website that feels fast on a phone. Core Web Vitals measured with the signals Google uses, fixed in the code, measured again.',
      h1a: 'A website that feels',
      h1b: 'fast on a phone.',
      lead: 'Measured with the signals Google uses, fixed in the code, measured again.',
      paragraph:
        'Core Web Vitals are Google’s measures of how quickly a page shows its content, how fast it reacts and how stable it stays while loading. I find what slows yours down (images, scripts, fonts, layout) and fix it directly on the site.',
      toolTitle: 'Where does your page land?',
      toolSub: 'Google’s thresholds for loading speed.',
      incPara:
        'Speed is not one number. I look at what your visitors actually wait for, on the phones they actually use, and fix the causes rather than the score.',
      checks: [
        { title: 'Lighthouse analysis', text: 'Repeated lab tests on your key pages, mobile first, to find the real bottlenecks.', region: 'page' },
        { title: 'Core Web Vitals', text: 'LCP, INP and CLS: loading, responsiveness and visual stability, measured and explained.', region: 'h1' },
        { title: 'Images', text: 'The right size, modern formats, loaded when needed. Often the biggest win.', region: 'img' },
        { title: 'Scripts & third parties', text: 'Chat widgets, trackers and plugins that slow everything down, tamed or removed.', region: 'widget' },
        { title: 'Fonts & layout stability', text: 'Text that shows immediately and pages that don’t jump while loading.', region: 'text' },
        { title: 'Real mobile testing', text: 'Checked on slower phones and connections, where your customers are.', region: 'cta' },
        { title: 'Before and after', text: 'Same pages, same tools, compared honestly.', region: 'page' },
        { title: 'Field data in Search Console', text: 'What real visitors experience over time, not just one test.', region: 'page' },
      ],
      related: [
        { slug: 'ezdirect', badge: 'Client', cap: 'Performance · Core Web Vitals', text: 'Core Web Vitals and Lighthouse on the new site. Before/after: [REAL DATA].' },
      ],
      faq: [
        { q: 'Why does speed matter for a small business?', a: 'People often look up a local business on their phone, on the move. A slow page loses them before they read what you offer.' },
        { q: 'My Lighthouse score changes every time. Why?', a: 'Lab tests vary with network and device. That’s why I compare several runs and also look at real-visitor data in Search Console.' },
        { q: 'When will Search Console show the improvement?', a: 'Real-visitor data is collected over a rolling 28-day window, so improvements show up gradually over about a month.' },
        { q: 'Do I need a new website to be fast?', a: 'Usually not. Many sites get much faster with targeted fixes. If the foundation is the problem, I’ll tell you.' },
      ],
    },
    'front-end': {
      switcher: 'Front-End',
      name: 'Front-End development',
      metaTitle: 'Front-End development — Matteo Giordani',
      metaDescription: 'Not a list of problems: changes made directly on your website. Layout, mobile, forms and details, built with search and speed in mind.',
      h1a: 'The fixes land',
      h1b: 'in the code.',
      lead: 'Not a list of problems: changes made directly on your website.',
      paragraph:
        'I build and fix the part of your website people actually see and use: layout, mobile, forms, the details. Every change is made with search and speed in mind, because the code is where SEO and performance really happen.',
      toolTitle: 'Same image, better code',
      toolSub: 'What a front-end fix looks like.',
      incPara:
        'From a single broken form to whole new sections: I work on the site you have, with the tools it already uses, and leave it easier to maintain than I found it.',
      checks: [
        { title: 'New pages & sections', text: 'Built to fit your site, structured for search from the first line.', region: 'h2' },
        { title: 'Responsive layout', text: 'Phone, tablet and desktop, tested on real devices, not just resized.', region: 'nav' },
        { title: 'Design implementation', text: 'From a design file to working pages, faithfully.', region: 'text' },
        { title: 'Debugging', text: 'Broken layouts, forms that fail, things that only break on one phone.', region: 'cta' },
        { title: 'CMS & CRM changes', text: 'Adjustments to the systems behind your site, like the CRM work on ezdirect.it.', region: 'footer' },
        { title: 'Accessibility basics', text: 'Keyboard use, contrast, labels and alt text, so everyone can use the site.', region: 'img' },
        { title: 'Semantic HTML', text: 'A structure both Google and screen readers understand.', region: 'h1' },
        { title: 'Clean handover', text: 'Changes explained, so you know what was done and why.', region: 'page' },
      ],
      related: [
        { slug: 'ezdirect', badge: 'Client', cap: 'Front-End · CRM', text: 'Development of the new website, design implementation and CRM changes.' },
        { slug: 'trainly', badge: 'Personal', cap: 'Product · UX · Front-End', text: 'A product for runners, designed and built mobile-first.' },
      ],
      faq: [
        { q: 'Can you work on my existing website?', a: 'Yes, that’s most of the work. I start from what you have and change what’s needed. [Confirm platforms: WordPress, Shopify, custom…]' },
        { q: 'Will I still be able to update the site myself?', a: 'That is the goal: I keep your editing workflow where possible and explain anything that changes.' },
        { q: 'Do you also design?', a: 'Yes, for websites and interfaces: Trainly is an example. [Confirm design scope]' },
        { q: 'Do you build new websites from scratch?', a: 'I contributed to building the new ezdirect.it. [Confirm the project sizes you take on]' },
      ],
    },
  } as Record<ServiceSlug, ServiceContent>,

  projects: {
    ezdirect: {
      name: 'ezdirect.it',
      badge: 'Client',
      cap: 'Client project · Website · SEO',
      filter: 'website',
      cardText: 'Front-End Developer & SEO Specialist on the new website, live since September 2026: development, CRM changes, metadata, Core Web Vitals.',
      tags: ['SEOzen', 'Search Console', 'Lighthouse'],
      metaTitle: 'ezdirect.it — Front-End & SEO — Matteo Giordani',
      metaDescription: 'Front-End development and SEO on the new ezdirect.it, live since September 2026: development, CRM changes, metadata and Core Web Vitals.',
      h1: 'ezdirect.it, _a new website_ *live since September 2026.*',
      lead: 'Front-End Developer & SEO Specialist on the new website: development, design implementation, CRM changes, metadata and Core Web Vitals.',
      facts: [
        { label: 'Role', value: 'Front-End Developer & SEO Specialist' },
        { label: 'Launch', value: 'September 2026' },
        { label: 'Tools', value: 'SEOzen · Search Console · Lighthouse' },
      ],
      sections: [
        { title: 'Overview', body: 'A new website for ezdirect.it, launched in September 2026. I worked on both sides of it: the front-end people use, and the parts Google reads.' },
        { title: 'Challenge', body: '[TO WRITE: what the old site was missing, what the business needed]' },
        { title: 'Approach', body: '[TO WRITE: how the work was organised and why]' },
        {
          title: 'Technical work',
          list: [
            'Front-end development and design implementation',
            'Interface work and debugging',
            'CRM modifications',
            'Meta titles and descriptions',
            'Technical SEO',
            'Core Web Vitals and Lighthouse',
            'Search Console, with SEOzen',
          ],
        },
        { title: 'Key learnings', body: '[TO WRITE]' },
      ],
    },
    trainly: {
      name: 'Trainly',
      badge: 'Personal',
      cap: 'Personal project · Mobile app',
      filter: 'mobile',
      cardText: 'A product for runners, designed and built mobile-first.',
      tags: ['Product', 'UX', 'Front-End'],
      metaTitle: 'Trainly — a product for runners — Matteo Giordani',
      metaDescription: 'Trainly, a personal project: a product for runners, designed and built mobile-first.',
      h1: 'Trainly, _a product for runners,_ *built mobile-first.*',
      lead: 'A personal project: product, UX and front-end, designed for the phone from the first screen.',
      facts: [
        { label: 'Type', value: 'Personal project' },
        { label: 'Role', value: 'Product · UX · Front-End · Mobile' },
      ],
      shots: [
        { src: '/img/trainly/cover.webp', w: 1920, h: 1080, alt: 'Trainly: three app screens (Plan, Today, Nutrition) beside the headline “Half-marathon training, decided by rules and explained clearly.”' },
        { src: '/img/trainly/oggi.webp', w: 1600, h: 1200, alt: 'Trainly Today screen: readiness score 51/100 with sleep, recovery and effort, plus the signals behind the score.' },
        { src: '/img/trainly/piano.webp', w: 1600, h: 1200, alt: 'Trainly Plan and Progress screens: the week as a list of sessions with intensity, and verified records kept apart from estimates.' },
        { src: '/img/trainly/nutrizione.webp', w: 1600, h: 1200, alt: 'Trainly Nutrition screen: about 3100 kcal recommended with carbohydrates, protein and fat, next to the Today screen.' },
        { src: '/img/trainly/sistema.webp', w: 1600, h: 1200, alt: 'Trainly design system: one accent and three status colours, Instrument Serif and Inter, glass surfaces.' },
      ],
      sections: [
        { title: 'The product', body: '[TO WRITE: what Trainly does and who it is for]' },
        { title: 'UX decisions', body: '[TO WRITE: the key design decisions and why]' },
        { title: 'Front-end notes', body: '[TO WRITE: how it is built]' },
        { title: 'What I learned', body: '[TO WRITE]' },
      ],
    },
  } as Record<ProjectSlug, ProjectContent>,

  projectPage: {
    visuals: 'Visuals',
    evidence: 'Evidence',
    next: 'Next project',
    prev: 'Previous project',
    desktop: 'desktop',
    mobile: 'mobile',
    screenshot: 'screenshot to add',
  },

  footer: {
    services: 'Services',
    work: 'Work',
    resources: 'Resources',
    contact: 'Contact',
    privacy: 'Privacy',
    vat: '[P.IVA if applicable]',
    location: 'Pisa, Italy',
  },

  privacy: {
    metaTitle: 'Privacy policy — Matteo Giordani',
    h1: 'Privacy *policy*',
    body: '[PRIVACY POLICY TO ADD — Italian GDPR text, data controller, purposes, retention, rights]',
  },
};

export default en;
export type Dict = typeof en;
