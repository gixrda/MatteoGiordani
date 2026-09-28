import { Navigation } from './components/Navigation';
import { CinematicNarrative } from './narrative/CinematicNarrative';
import { Services } from './sections/Services';
import { SelectedWork } from './sections/SelectedWork';
import { About } from './sections/About';
import { Insights } from './sections/Insights';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { useI18n } from './i18n/I18nContext';
import './sections/sections.css';

export function App() {
  const { t } = useI18n();
  return (
    <>
      <a className="skip-link" href="#services">
        {t.skipLink}
      </a>
      <Navigation />
      <main>
        <CinematicNarrative />
        <Services />
        <SelectedWork />
        <About />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
