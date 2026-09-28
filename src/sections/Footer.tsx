import { useI18n } from '../i18n/I18nContext';

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p>
          <strong>Matteo Giordani</strong> — {t.footer.role}
        </p>
        <p className="footer__meta">{t.footer.meta}</p>
        <a className="footer__top" href="#top">
          {t.footer.top} <span aria-hidden>↑</span>
        </a>
      </div>
    </footer>
  );
}
