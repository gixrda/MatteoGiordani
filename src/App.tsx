import { Navigation } from './components/Navigation';
import { CinematicNarrative } from './narrative/CinematicNarrative';
import { Services } from './sections/Services';
import { SelectedWork } from './sections/SelectedWork';
import { About } from './sections/About';
import { Insights } from './sections/Insights';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import './sections/sections.css';

export function App() {
  return (
    <>
      <a className="skip-link" href="#services">
        Skip to content
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
