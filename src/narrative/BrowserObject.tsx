import type { CSSProperties, ReactNode } from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import { useNarrative } from './NarrativeContext';
import { BEAT } from './timeline';
import { interp, useColorKeyframes, useFade, useKeyframes, useTypedCount } from './motion';
import { LAYERS, U, type Box } from './geometry';
import { useI18n } from '../i18n/I18nContext';
import type { Dictionary } from '../i18n/en';

/**
 * The central object: one website, rendered as separate planes so it can be
 * opened up in depth (Optimize), rebuilt (Build), lightened (Perform) and
 * finally dissolved into the real page (Complete).
 *
 * Every page layer has two faces: a wireframe face that follows the stage
 * colour (dark on light, light on dark) and a real UI face with its own palette.
 */

const EXPLODE_XS = [BEAT.explode[0], BEAT.explode[1], BEAT.collapse[0], BEAT.collapse[1]];

export function BrowserObject() {
  const { p, layout } = useNarrative();
  const { u, compact } = layout;
  const ex = compact ? 0.6 : 1;
  const depth = (k: number) => [0, k * u * ex, k * u * ex, 0];

  /* Faces */
  const ui = useKeyframes(p, BEAT.ui, [0, 1]);
  const wire = useTransform(ui, (v) => 1 - v);

  /* Perform: the page renders slowly while heavy, then sharp. Complete: dissolve. */
  const siteOpacity = useTransform(
    p,
    (v) => interp(v, [0.655, 0.675, 0.72, 0.79], [1, 0.35, 0.6, 1]) * interp(v, BEAT.dissolve, [1, 0]),
  );

  /* Optimize: loose structure snaps into order. */
  const disorder = useKeyframes(p, BEAT.order, [1, 0]);

  /* Depth per plane */
  const zFrame = useKeyframes(p, EXPLODE_XS, depth(-7));
  const zHeader = useKeyframes(p, EXPLODE_XS, depth(12));
  const zHero = useKeyframes(p, EXPLODE_XS, depth(8));
  const zCards = useKeyframes(p, EXPLODE_XS, depth(3.5));
  const zFooter = useKeyframes(p, EXPLODE_XS, depth(-1.5));

  /* Perform: layout shift, then stable. */
  const cardsShift = useKeyframes(p, [0.665, 0.685, 0.755, 0.775], [0, 2.4 * u, 2.4 * u, 0]);

  /* Frame material */
  const frameXs = [0.36, 0.42, 0.55, 0.61, 0.93, 0.97];
  const frameBg = useColorKeyframes(p, frameXs, ['#fbf9f4', '#0d1a2b', '#0d1a2b', '#f8f6f1', '#f8f6f1', '#f4f0e8']);
  const frameBorder = useColorKeyframes(p, frameXs, [
    'rgba(11,15,20,0.16)',
    'rgba(236,231,220,0.24)',
    'rgba(236,231,220,0.24)',
    'rgba(11,15,20,0.12)',
    'rgba(11,15,20,0.12)',
    'rgba(11,15,20,0)',
  ]);
  const chromeColor = useColorKeyframes(p, frameXs.slice(0, 4), ['#0b0f14', '#ece7dc', '#ece7dc', '#0b0f14']);
  const chromeOpacity = useKeyframes(p, [0.94, 0.97], [1, 0]);
  const radius = useKeyframes(p, [0.93, 0.98], [1.4 * u, 0]);
  const shadow = useKeyframes(p, [0.05, 0.1, 0.36, 0.42, 0.58, 0.64, 0.74, 0.77, 0.92, 0.96], [
    0.55, 0.8, 0.8, 0, 0, 1, 1, 0.55, 0.55, 0,
  ]);
  const grid = useFade(p, BEAT.grid[0], BEAT.grid[1], 0.55, 0.6);
  const load = useKeyframes(p, [0.655, 0.675, 0.74, 0.77, 0.785], [0, 0.3, 0.42, 0.42, 1], false);
  const loadOpacity = useFade(p, 0.655, 0.665, 0.788, 0.8);

  return (
    <>
      <motion.div
        className="obj-shadow"
        style={{ z: zFrame, opacity: shadow, borderRadius: radius }}
      />
      <motion.div
        className="obj-frame"
        style={{ z: zFrame, backgroundColor: frameBg, borderColor: frameBorder, borderRadius: radius }}
      >
        <motion.div className="obj-chrome" style={{ color: chromeColor, opacity: chromeOpacity }}>
          <span className="obj-chrome__dots">
            <i />
            <i />
            <i />
          </span>
          <span className="obj-chrome__url">
            <UrlText />
          </span>
        </motion.div>
        <motion.div className="obj-grid" style={{ opacity: grid }}>
          {Array.from({ length: 12 }, (_, i) => (
            <i key={i} />
          ))}
        </motion.div>
        <motion.div className="obj-loadbar" style={{ scaleX: load, opacity: loadOpacity }} />
      </motion.div>

      <HeadPlane />

      <Layer box={LAYERS.header} z={zHeader} opacity={siteOpacity} disorder={disorder} jitter={[1.2, 0, -0.4]}
        tag={['<header>', '<Header />']}
        wire={<HeaderWire />} ui={<HeaderUI />} wireOpacity={wire} uiOpacity={ui} />
      <Layer box={LAYERS.hero} z={zHero} opacity={siteOpacity} disorder={disorder} jitter={[-1.6, 0.6, 0.5]}
        tag={['<main> <h1>', '<Hero />']}
        wire={<HeroWire />} ui={<HeroUI />} wireOpacity={wire} uiOpacity={ui} />
      <Layer box={LAYERS.cards} z={zCards} y={cardsShift} opacity={siteOpacity} disorder={disorder} jitter={[1.4, 1.2, -0.3]}
        tag={['<section> <h2>', '<ServiceCards />']}
        wire={<CardsWire />} ui={<CardsUI />} wireOpacity={wire} uiOpacity={ui}
        extra={<InternalLinks />} />
      <Layer box={LAYERS.footer} z={zFooter} opacity={siteOpacity} disorder={disorder} jitter={[-0.8, 0.4, 0.4]}
        tag={['<footer>', '<Footer />']}
        wire={<FooterWire />} ui={<FooterUI />} wireOpacity={wire} uiOpacity={ui} />
    </>
  );
}

/* ------------------------------------------------------------------ */

function UrlText() {
  const { p } = useNarrative();
  const { t } = useI18n();
  const URL_FULL = t.demo.domain + t.demo.path;
  const URL_DOMAIN = t.demo.domain.length;
  const count = useTypedCount(p, [0.095, 0.13, 0.27, 0.32], [0, URL_DOMAIN, URL_DOMAIN, URL_FULL.length]);
  const domain = URL_FULL.slice(0, Math.min(count, URL_DOMAIN));
  const path = URL_FULL.slice(URL_DOMAIN, Math.max(count, URL_DOMAIN));
  return (
    <>
      {count === 0 && <span className="obj-chrome__placeholder">{t.demo.untitled}</span>}
      {domain}
      {path && <span className="obj-chrome__path">{path}</span>}
      {count < URL_FULL.length && count !== URL_DOMAIN && <span className="obj-caret" />}
    </>
  );
}

interface LayerProps {
  box: Box;
  z: MotionValue<number>;
  y?: MotionValue<number>;
  opacity: MotionValue<number>;
  disorder: MotionValue<number>;
  /** Loose offset before the structure is ordered: [x u, y u, rotate deg]. */
  jitter: [number, number, number];
  tag: [string, string];
  wire: ReactNode;
  ui: ReactNode;
  wireOpacity: MotionValue<number>;
  uiOpacity: MotionValue<number>;
  extra?: ReactNode;
}

function Layer({ box, z, y, opacity, disorder, jitter, tag, wire, ui, wireOpacity, uiOpacity, extra }: LayerProps) {
  const { layout } = useNarrative();
  const x = useTransform(disorder, (d) => d * jitter[0] * layout.u);
  const jy = useTransform(disorder, (d) => d * jitter[1] * layout.u);
  const rotate = useTransform(disorder, (d) => d * jitter[2]);
  return (
    <motion.div
      className="obj-layer"
      style={{ top: U(box.top), left: U(box.left), width: U(box.width), height: U(box.height), z, y, opacity }}
    >
      <motion.div className="obj-layer__inner" style={{ x, y: jy, rotate }}>
        <motion.div className="obj-face obj-face--wire" style={{ opacity: wireOpacity }}>
          {wire}
        </motion.div>
        <motion.div className="obj-face obj-face--ui" style={{ opacity: uiOpacity }}>
          {ui}
        </motion.div>
        {extra}
      </motion.div>
      <LayerTag semantic={tag[0]} component={tag[1]} />
    </motion.div>
  );
}

/** Semantic tag (Optimize) that turns into a component name (Build). */
function LayerTag({ semantic, component }: { semantic: string; component: string }) {
  const { p } = useNarrative();
  const visible = useFade(p, BEAT.tags[0], BEAT.tags[1], 0.6, 0.63);
  const asComponent = useKeyframes(p, BEAT.components, [0, 1]);
  const asTag = useTransform(asComponent, (v) => 1 - v);
  return (
    <motion.span className="obj-tag" style={{ opacity: visible }}>
      <motion.span style={{ opacity: asTag }}>{semantic}</motion.span>
      <motion.span className="obj-tag__component" style={{ opacity: asComponent }}>
        {component}
      </motion.span>
    </motion.span>
  );
}

/** Understand: each block receives the role it plays for search. */
function Role({ role, style }: { role: keyof Dictionary['demo']['roles']; style?: CSSProperties }) {
  const { p } = useNarrative();
  const { t } = useI18n();
  const opacity = useFade(p, BEAT.roles[0], BEAT.roles[1], 0.35, 0.39);
  return (
    <motion.span className="obj-role" style={{ ...style, opacity }}>
      {t.demo.roles[role]}
    </motion.span>
  );
}

/** Optimize: heading level markers. */
function Heading({ level, style }: { level: string; style?: CSSProperties }) {
  const { p } = useNarrative();
  const opacity = useFade(p, BEAT.tags[0] + 0.01, BEAT.tags[1] + 0.01, 0.53, 0.56);
  return (
    <motion.span className="obj-hmark" style={{ ...style, opacity }}>
      {level}
    </motion.span>
  );
}

/** Optimize: internal links drawn between the service cards. */
function InternalLinks() {
  const { p } = useNarrative();
  const draw = useKeyframes(p, [0.43, 0.48], [0, 1]);
  const opacity = useFade(p, 0.43, 0.44, 0.54, 0.57);
  const paths = ['M14.3 0 Q29.6 -6 45 0', 'M45 0 Q60.3 -6 75.7 0', 'M75.7 0 Q45 -11 14.3 0'];
  return (
    <motion.svg className="obj-links" viewBox="0 0 90 12.5" style={{ opacity }} aria-hidden>
      {paths.map((d) => (
        <motion.path key={d} d={d} style={{ pathLength: draw }} />
      ))}
      {[14.3, 45, 75.7].map((cx) => (
        <circle key={cx} cx={cx} cy={0} r={0.55} />
      ))}
    </motion.svg>
  );
}

/** Optimize: the <head> rises out of the page — what search engines read first. */
function HeadPlane() {
  const { p, layout } = useNarrative();
  const u = layout.u;
  const ex = layout.compact ? 0.6 : 1;
  const opacity = useFade(p, 0.4, 0.46, 0.49, 0.515);
  const y = useKeyframes(p, [0.4, 0.46], [10 * u, 0]);
  const z = useKeyframes(p, EXPLODE_XS, [0, 16 * u * ex, 16 * u * ex, 0]);
  const { t } = useI18n();
  return (
    <motion.div className="obj-head" style={{ opacity, y, z }}>
      <span className="obj-head__tag">&lt;head&gt;</span>
      <span>
        <b>title</b> {t.demo.head.title}
      </span>
      <span>
        <b>meta description</b> {t.demo.head.description}
      </span>
      <span>
        <b>link canonical</b> {t.demo.path}
      </span>
      <span>
        <b>meta robots</b> index, follow
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Wireframe faces                                                     */

const Bar = ({ w, h = 0.9, top, left = 0 }: { w: number; h?: number; top: number; left?: number }) => (
  <span className="w-bar" style={{ width: U(w), height: U(h), top: U(top), left: U(left) }} />
);

const WBox = ({ box, children }: { box: Box; children?: ReactNode }) => (
  <span className="w-box" style={{ top: U(box.top), left: U(box.left), width: U(box.width), height: U(box.height) }}>
    {children}
  </span>
);

function HeaderWire() {
  return (
    <>
      <WBox box={{ top: 0.6, left: 0, width: 11, height: 2.8 }} />
      <Bar w={6} top={1.55} left={52} />
      <Bar w={6} top={1.55} left={60} />
      <Bar w={6} top={1.55} left={68} />
      <Bar w={6} top={1.55} left={76} />
      <WBox box={{ top: 0.4, left: 84, width: 6, height: 3.2 }} />
      <Role role="navigation" style={{ left: U(58), top: U(-2.4) }} />
    </>
  );
}

function HeroWire() {
  return (
    <>
      <Bar w={14} top={0.6} />
      <Bar w={44} h={2.6} top={3} />
      <Bar w={32} h={2.6} top={6.6} />
      <Heading level="H1" style={{ left: U(-3.4), top: U(3.2) }} />
      <Bar w={40} top={11.2} />
      <Bar w={30} top={13.1} />
      <WBox box={{ top: 16.4, left: 0, width: 15, height: 3.4 }} />
      <WBox box={{ top: 0, left: 56, width: 34, height: 21 }}>
        <svg className="w-cross" viewBox="0 0 34 21" preserveAspectRatio="none" aria-hidden>
          <path d="M0 0 L34 21 M34 0 L0 21" />
        </svg>
      </WBox>
      <Role role="landing" style={{ left: U(57), top: U(1) }} />
    </>
  );
}

const CARD_W = 28.6;
const CARD_X = [0, 30.7, 61.4];

function CardsWire() {
  return (
    <>
      {CARD_X.map((x, i) => (
        <WBox key={x} box={{ top: 0, left: x, width: CARD_W, height: 12.5 }}>
          <Bar w={8} top={1.6} left={1.8} />
          <Bar w={16} h={1.4} top={3.8} left={1.8} />
          <Bar w={22} top={6.6} left={1.8} />
          <Bar w={18} top={8.4} left={1.8} />
          {i === 0 && <Heading level="H2" style={{ left: U(19.5), top: U(3.4) }} />}
        </WBox>
      ))}
      <Role role="service" style={{ left: U(12), top: U(10.6) }} />
      <Role role="guide" style={{ left: U(73.4), top: U(10.6) }} />
    </>
  );
}

function FooterWire() {
  return (
    <>
      <Bar w={10} top={2.3} />
      <Bar w={6} top={2.3} left={56} />
      <Bar w={6} top={2.3} left={64} />
      <Bar w={6} top={2.3} left={72} />
      <Bar w={6} top={2.3} left={80} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Real UI faces — an illustrative local business, not a client.       */

function Brand({ small }: { small?: boolean }) {
  const { t } = useI18n();
  return (
    <span className={`ui-logo${small ? ' ui-logo--small' : ''}`}>
      {t.demo.brand[0]}
      <b>·</b>
      {t.demo.brand[1]}
    </span>
  );
}

function HeaderUI() {
  const { t } = useI18n();
  return (
    <div className="ui-header">
      <Brand />
      <span className="ui-nav">
        {t.demo.nav.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </span>
      <span className="ui-btn ui-btn--small">{t.demo.book}</span>
    </div>
  );
}

function HeroUI() {
  const { p } = useNarrative();
  const { t } = useI18n();
  const focus = useFade(p, BEAT.focus[0], BEAT.focus[1], 0.925, 0.945);
  const scale = useTransform(focus, [0, 1], [1, 1.05]);
  const others = useTransform(focus, [0, 1], [1, 0.72]);
  return (
    <div className="ui-hero">
      <motion.div className="ui-hero__text" style={{ opacity: others }}>
        <span className="ui-eyebrow">{t.demo.eyebrow}</span>
        <span className="ui-h1">
          {t.demo.h1[0]}
          <br />
          {t.demo.h1[1]}
        </span>
        <span className="ui-p">{t.demo.text}</span>
      </motion.div>
      <motion.span className="ui-btn ui-cta" style={{ scale }}>
        {t.demo.cta}
        <motion.span className="ui-cta__ring" style={{ opacity: focus }} />
      </motion.span>
      <motion.span className="ui-media" style={{ opacity: others }}>
        <span className="ui-media__sun" />
        <span className="ui-media__horizon" />
      </motion.span>
    </div>
  );
}

function CardsUI() {
  const { t } = useI18n();
  return (
    <div className="ui-cards">
      {t.demo.cards.map(({ kind, title, text }) => (
        <span className="ui-card" key={title}>
          <span className="ui-card__kind">{kind}</span>
          <span className="ui-card__title">{title}</span>
          <span className="ui-card__text">{text}</span>
        </span>
      ))}
    </div>
  );
}

function FooterUI() {
  const { t } = useI18n();
  return (
    <div className="ui-footer">
      <Brand small />
      <span className="ui-nav ui-nav--small">
        {t.demo.footer.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </span>
    </div>
  );
}
