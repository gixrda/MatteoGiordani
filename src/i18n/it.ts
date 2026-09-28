import type { Dictionary } from './en';

/** Testi italiani. Stessa struttura di `en.ts`, verificata dal tipo Dictionary. */
export const it: Dictionary = {
  meta: {
    title: 'Matteo Giordani — SEO Specialist & Front-End Developer',
    description:
      'Costruisco siti che si posizionano, performano e convertono. Aiuto le aziende a farsi trovare su Google.',
  },
  skipLink: 'Vai al contenuto',
  nav: {
    primary: 'Principale',
    mobile: 'Mobile',
    language: 'Lingua',
    menu: 'Menu',
    close: 'Chiudi',
    links: { work: 'Lavori', about: 'Chi sono', insights: 'Insights', contact: 'Contatti' },
  },

  /* ---------------- Narrazione ---------------- */
  narrativeLabel: 'Come un sito diventa migliore',
  hero: {
    role: 'SEO Specialist & Front-End Developer',
    title: 'Costruisco siti che si posizionano, performano e convertono.',
    lead: 'Aiuto le aziende a farsi trovare su Google.',
    primary: 'Contattami',
    secondary: 'Guarda i miei lavori',
    cue: 'Scorri — guarda il sito costruirsi',
  },
  intro: {
    kicker: 'Da incompiuto a trovato',
    title: 'Il sito si costruisce mentre scorri.',
  },
  scenes: {
    discover: {
      label: 'Scoperta',
      title: 'Essere online non significa essere trovati.',
      body: 'La maggior parte dei siti esiste. Pochi vengono trovati da chi sta già cercando ciò che offrono.',
    },
    understand: {
      label: 'Comprensione',
      title: 'Prima di ottimizzare un sito, capisci come cercano le persone.',
      body: "Le ricerche rivelano un intento. L'intento decide cosa deve essere ogni pagina — e dove deve stare nel sito.",
    },
    optimize: {
      label: 'Ottimizzazione',
      title: 'Rendi il sito comprensibile ai motori di ricerca — e alle persone.',
      body: 'Gerarchia semantica, metadata, link interni, indicizzabilità. La struttura che nessuno vede — e da cui tutto dipende.',
    },
    build: {
      label: 'Sviluppo',
      title: "Non mi fermo all'audit. So costruire la soluzione.",
      body: 'Chi individua il problema scrive anche i componenti, il layout e il CSS che lo risolvono. Niente si perde nel passaggio di consegne.',
    },
    perform: {
      label: 'Prestazioni',
      title: 'Più leggero. Più veloce. Stabile.',
      statesLabel: 'Stati delle prestazioni',
      states: ['Pesante', 'Più pulito', 'Più leggero', 'Più veloce'],
      vitals: [
        { abbr: 'LCP', name: 'Caricamento', text: 'Il contenuto principale appare presto.' },
        { abbr: 'INP', name: 'Reattività', text: 'La pagina risponde senza ritardi.' },
        { abbr: 'CLS', name: 'Stabilità visiva', text: "Niente si sposta all'improvviso." },
      ],
      note: 'Core Web Vitals mostrati come concetti — non punteggi misurati.',
    },
    convert: {
      label: 'Conversione',
      title: 'Un sito non deve solo posizionarsi. Deve funzionare.',
      body: 'Gerarchia chiara, un solo passo successivo evidente, un percorso che finisce in una conversazione. Qui SEO, Front-End e UX si incontrano.',
      journeyLabel: "Percorso dell'utente",
      steps: ['Ricerca', 'Arrivo', 'Azione'],
    },
  },
  rail: { label: 'Capitoli', skip: 'Salta intro' },
  complete: {
    label: '07 — Completo',
    title: 'Il sito è pronto.',
    lead: "L'hai appena visto costruire. Ora lo stai usando.",
  },

  /** Sito dimostrativo di un'attività locale — non un cliente. */
  demo: {
    domain: 'tua-attivita.it',
    path: '/allenamento-forza',
    untitled: 'senza titolo',
    brand: ['tua', 'attività'],
    search: 'palestra vicino a me',
    queries: [
      { q: 'palestra vicino a me', intent: 'locale' },
      { q: 'come iniziare con i pesi', intent: 'informativa' },
      { q: 'costo personal trainer', intent: 'commerciale' },
      { q: 'orari tua-attività', intent: 'navigazionale' },
    ],
    roles: { navigation: 'navigazione', landing: 'landing page · locale', service: 'pagina servizio', guide: 'guida' },
    head: {
      title: 'Allenamento di forza a [Città] — tua-attività',
      description: 'Coaching in piccoli gruppi e personal…',
    },
    nav: ['Servizi', 'Guide', 'Prezzi', 'Contatti'],
    book: 'Prenota',
    eyebrow: 'Studio di forza · [Città]',
    h1: ['Allenamento di forza,', 'vicino a casa.'],
    text: 'Sessioni in piccoli gruppi e coaching personale, per ogni livello.',
    cta: 'Prenota una prova gratuita',
    cards: [
      { kind: 'Servizio', title: 'Personal training', text: 'Coaching uno a uno, su misura per te.' },
      { kind: 'Servizio', title: 'Piccoli gruppi', text: 'Massimo sei persone. Stessa attenzione.' },
      { kind: 'Guida', title: 'Primi passi coi pesi', text: 'Un piano per il primo mese.' },
    ],
    footer: ['Orari', 'Dove siamo', 'FAQ', 'Contatti'],
  },

  /* ---------------- Sezioni ---------------- */
  services: {
    label: 'Servizi',
    title: ['Due competenze.', 'Un unico sistema.'],
    intro:
      'Visibilità nella ricerca e qualità del sito di solito vengono vendute separatamente. Io le tratto come un unico problema, e lavoro su entrambi i lati.',
    capabilities: [
      {
        name: 'SEO',
        claim: 'Farsi trovare.',
        text: 'Capire come cercano le persone — poi dare forma al sito perché le pagine giuste rispondano, e i motori di ricerca possano leggerle tutte.',
        topics: [
          'SEO tecnica',
          'SEO on-page',
          'Ricerca keyword',
          'Search Console',
          "Architettura dell'informazione",
          'Link interni',
          'Audit SEO',
        ],
      },
      {
        name: 'Ottimizzazione del sito',
        claim: 'Funzionare meglio.',
        text: 'Lavoro direttamente sul front-end: caricamento più rapido, layout stabili, interfacce più chiare e modifiche rilasciate nel codice — non lasciate in un report.',
        topics: [
          'Core Web Vitals',
          'Ottimizzazione front-end',
          'Performance',
          'UX',
          'Responsive design',
          'Implementazione tecnica',
        ],
      },
    ],
    flowLabel: 'Dove si incontrano',
    flow: [
      { step: 'Diagnosi', text: 'Audit, priorità ed evidenze da Search Console e dai dati degli utenti reali.' },
      { step: 'Implementazione', text: 'Modifiche front-end e on-page, fatte direttamente sul sito.' },
      { step: 'Verifica', text: 'Controllata sugli stessi dati — così i progressi si misurano, non si presumono.' },
    ],
  },
  work: {
    label: 'Lavori selezionati',
    title: 'Lavori che mostrano entrambi i lati.',
    intro: 'Progetti selezionati. I case study dei clienti vengono aggiunti solo quando i risultati sono verificabili.',
    trainly: {
      kind: 'Progetto personale',
      intro:
        "Un'app per la corsa che progetto e sviluppo in autonomia. È dove pratico il product thinking dall'inizio alla fine — da ciò di cui i runner hanno davvero bisogno, ai dati, all'interfaccia e alla crescita.",
      focusLabel: 'Focus',
      tags: ['Product thinking', 'Corsa', 'Dati', 'UX', 'Front-End', 'Crescita'],
      note: 'Progetto personale — non un incarico per un cliente. Stato: [PLACEHOLDER]',
      uiLabel: "Concept dell'interfaccia di Trainly",
      week: 'Questa settimana',
      headline: 'Costruisci la base.',
      foot: 'Concept UI · [PLACEHOLDER]',
    },
  },
  about: {
    label: 'Chi sono',
    title: 'Il punto è la sovrapposizione.',
    intro:
      "Sono Matteo. Ho studiato come i messaggi raggiungono le persone, poi come funzionano i sistemi. SEO e Front-End sono il punto d'incontro — ed è lì che lavoro meglio.",
    listLabel: 'Cosa metto insieme',
    terms: [
      { term: 'Comunicazione & Marketing', gloss: 'Come un messaggio raggiunge le persone giuste.' },
      { term: 'Informatica', gloss: 'Come funzionano davvero i sistemi.' },
      { term: 'SEO', gloss: 'Come cercano le persone, e di cosa hanno bisogno i motori di ricerca.' },
      { term: 'Front-End', gloss: 'Come si costruiscono le interfacce — e come si costruiscono bene.' },
      { term: 'Sport', gloss: 'Resistenza. Costanza più che intensità.' },
      { term: 'Curiosità', gloss: 'Perché le cose funzionano, non solo che funzionano.' },
    ],
    result: 'Una persona, entrambi i lati del problema.',
    twin: {
      label: 'Digital twin · v0.1',
      attrs: [
        ['role', 'seo front-end'],
        ['based', 'Italia'],
        ['speaks', 'it en'],
        ['trains', 'resistenza'],
        ['open-to', 'progetti freelance'],
      ],
      text: 'Una persona descritta come descrivo i siti: prima la struttura. Fuori dal lavoro, gli sport di resistenza mantengono la stessa abitudine — progressi costanti e misurabili.',
      note: 'Ritratto: [PLACEHOLDER]',
    },
  },
  insights: {
    label: 'Insights',
    title: 'Note su ricerca e web.',
    intro:
      'Scritti brevi e pratici su SEO, front-end e performance — per chi gestisce un sito, non solo per gli specialisti.',
    filterLabel: 'Filtra per argomento',
    categories: {
      all: 'Tutti',
      seo: 'SEO',
      technical: 'SEO tecnica',
      frontend: 'Front-End',
      performance: 'Performance',
      cwv: 'Core Web Vitals',
      growth: 'Crescita',
    },
    posts: [
      {
        category: 'seo',
        title: "L'intento di ricerca viene prima delle keyword.",
        dek: 'La prima domanda è cosa vuole una persona — non quali parole digita.',
      },
      {
        category: 'technical',
        title: 'Cosa copre la SEO tecnica — e cosa no.',
        dek: "Scansione, rendering e indicizzazione, spiegati a chi gestisce un'attività.",
      },
      {
        category: 'cwv',
        title: 'LCP, INP, CLS: cosa misura davvero ogni metrica.',
        dek: 'Tre metriche, tre momenti diversi di una visita.',
      },
      {
        category: 'frontend',
        title: "L'HTML semantico è una scelta SEO.",
        dek: 'Una struttura scritta una volta serve persone, tecnologie assistive e motori di ricerca.',
      },
      {
        category: 'performance',
        title: 'La velocità nasce nel template, non in un plugin.',
        dek: 'Dove si vince o si perde la performance in un codice reale.',
      },
      {
        category: 'growth',
        title: 'Visibilità locale: da dove dovrebbe iniziare una piccola attività.',
        dek: 'Un ordine di lavoro pratico per chi dipende dalla propria zona.',
      },
    ],
    status: 'Bozza · [PLACEHOLDER]',
  },
  contact: {
    label: 'Contatti',
    title: 'Costruiamo qualcosa che si faccia trovare.',
    lead: 'Hai un sito che potrebbe funzionare meglio? Raccontami a che punto è oggi e cosa dovrebbe ottenere.',
    channels: { email: 'Email', linkedin: 'LinkedIn' },
    form: {
      name: 'Nome',
      email: 'Email',
      company: 'Azienda / Sito web',
      companyPlaceholder: 'tua-attivita.it',
      topic: 'Come posso aiutarti?',
      topics: { seo: 'SEO', optimization: 'Ottimizzazione del sito', both: 'Entrambi', unsure: 'Non so ancora' },
      message: 'Messaggio',
      submit: 'Invia messaggio',
      sent: 'Grazie. Questo è un mockup — il form non è ancora collegato, quindi non è stato inviato nulla.',
    },
  },
  footer: {
    role: 'SEO Specialist & Front-End Developer',
    meta: '© 2026 · Italia · IT / EN',
    top: 'Torna su',
  },
};
