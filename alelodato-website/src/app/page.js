// src/app/page.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";

// ─── DATI ─────────────────────────────────────────────────────────────────
const PROBLEMI = [
  {
    problema: "Hai un sito, ma non porta clienti",
    soluzione: "Riprogetto la tua presenza online con una strategia chiara: struttura, copy e SEO orientati a convertire visitatori in contatti reali.",
    icon: "📉",
  },
  {
    problema: "Gestire ordini, prenotazioni o contenuti è un caos",
    soluzione: "Costruisco pannelli admin su misura: gestisci tutto dal browser, senza dipendere da nessuno e senza competenze tecniche.",
    icon: "⚙️",
  },
  {
    problema: "Il tuo brand non esiste online",
    soluzione: "Creo una presenza digitale coerente e professionale che ti posiziona nel tuo mercato e ti differenzia dalla concorrenza.",
    icon: "🎯",
  },
  {
    problema: "Il sito è lento, vecchio o non funziona su mobile",
    soluzione: "Migro o riscrivo da zero con tecnologie moderne. Veloce, sicuro, ottimizzato per Google e per i tuoi clienti.",
    icon: "⚡",
  },
];

const SOLUZIONI = [
  {
    tipo: "Sito Vetrina",
    problema: "Il business esiste, ma online non si trova — o non convince.",
    soluzione: "Un sito professionale, veloce e ottimizzato per il SEO locale. Costruito per generare contatti, non solo per 'esserci'.",
    risultato: "Più visibilità su Google, più richieste di preventivo, più credibilità verso i clienti.",
    tag: ["Next.js", "SEO", "Performance"],
  },
  {
    tipo: "E-Commerce",
    problema: "Vuoi vendere online ma le piattaforme standard ti limitano o costano troppo.",
    soluzione: "Un e-commerce su misura con gestione prodotti, pagamenti Stripe e pannello admin integrato. Zero commissioni extra.",
    risultato: "Controllo totale sulle vendite, esperienza d'acquisto fluida, margini più alti.",
    tag: ["Next.js", "Stripe", "Supabase"],
  },
  {
    tipo: "Web App & Gestionale",
    problema: "Usi Excel, WhatsApp o carta per gestire il tuo business.",
    soluzione: "Un'applicazione web personalizzata: prenotazioni, magazzino, CRM, ordini — tutto in un unico pannello accessibile da browser.",
    risultato: "Processi più veloci, meno errori, più tempo per il tuo core business.",
    tag: ["React", "Supabase", "Admin Panel"],
  },
  {
    tipo: "Landing Page",
    problema: "Hai un prodotto o servizio specifico ma nessuna pagina dedicata che converte.",
    soluzione: "Una landing page focalizzata, con copy strategico, design pulito e CTA che spinge all'azione.",
    risultato: "Più conversioni dalle tue campagne, costo per lead più basso, messaggio chiaro.",
    tag: ["Next.js", "Tailwind", "Analytics"],
  },
];

const PROCESSO = [
  {
    num: "01",
    titolo: "Analisi",
    desc: "Prima di scrivere una riga di codice, capisco il tuo business, il tuo mercato e i tuoi obiettivi concreti. Niente assunzioni.",
  },
  {
    num: "02",
    titolo: "Strategia",
    desc: "Definisco la struttura, il posizionamento e le funzionalità necessarie. Solo ciò che serve davvero, senza sprechi.",
  },
  {
    num: "03",
    titolo: "Design & Sviluppo",
    desc: "Progetto e sviluppo in cicli rapidi con feedback continuo. Vedi l'avanzamento reale, non solo il risultato finale.",
  },
  {
    num: "04",
    titolo: "Lancio & Ottimizzazione",
    desc: "Deploy, test, monitoraggio e SEO tecnico. Non sparisco dopo la consegna — mi assicuro che tutto funzioni e porti risultati.",
  },
];

const TIPI_PROGETTO = [
  "Sito Vetrina",
  "E-Commerce",
  "Web App / Gestionale",
  "Landing Page",
  "Restyling Sito Esistente",
  "Altro",
];

// ─── STILI GLOBALI ────────────────────────────────────────────────────────
const GLOBAL_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  :root {
    --bg: #050810;
    --surface: #0b0f1a;
    --surface2: #0f1520;
    --border: rgba(99,179,237,0.1);
    --border-hi: rgba(99,179,237,0.3);
    --accent: #63b3ed;
    --accent2: #9f7aea;
    --accent-dim: rgba(99,179,237,0.07);
    --text: #e2e8f0;
    --muted: #64748b;
    --dim: #94a3b8;
    --glow: 0 0 40px rgba(99,179,237,0.12);
    --glow-lg: 0 0 80px rgba(99,179,237,0.2);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Syne', sans-serif;
    overflow-x: hidden;
    cursor: none;
  }
  a, button, input, textarea, select { cursor: none; }

  body::before {
    content: '';
    position: fixed; inset: 0;
    pointer-events: none; z-index: 100;
    background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px);
  }

  .mono { font-family: 'DM Mono', monospace; }
  .accent { color: var(--accent); }
  .dim { color: var(--dim); }
  .muted { color: var(--muted); }

  .text-gradient {
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .tag {
    font-family: 'DM Mono', monospace;
    font-size: .65rem;
    color: var(--accent);
    background: var(--accent-dim);
    border: 1px solid rgba(99,179,237,.18);
    padding: .2rem .55rem;
    letter-spacing: .08em;
  }

  .clip-tr { clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%); }
  .clip-br { clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%); }

  .section-label {
    font-family: 'DM Mono', monospace;
    font-size: .7rem;
    color: var(--accent);
    letter-spacing: .3em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: .75rem;
    margin-bottom: 1rem;
  }
  .section-label::before {
    content: '';
    display: inline-block;
    width: 20px; height: 1px;
    background: var(--accent);
  }

  @keyframes scrollLine {
    0%   { transform: scaleY(0); transform-origin: top;    opacity: 0; }
    50%  { transform: scaleY(1); transform-origin: top;    opacity: 1; }
    100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
  }
  @keyframes gridPulse { 0%,100%{opacity:.5} 50%{opacity:.9} }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
`;

// ─── CURSOR ───────────────────────────────────────────────────────────────
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const lag = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);
    let raf;
    const tick = () => {
      lag.current.x += (pos.current.x - lag.current.x) * 0.12;
      lag.current.y += (pos.current.y - lag.current.y) * 0.12;
      if (dot.current) dot.current.style.transform = `translate(${pos.current.x - 5}px, ${pos.current.y - 5}px)`;
      if (ring.current) ring.current.style.transform = `translate(${lag.current.x - 18}px, ${lag.current.y - 18}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dot} style={{ position: "fixed", top: 0, left: 0, width: 10, height: 10, background: "var(--accent)", borderRadius: "50%", pointerEvents: "none", zIndex: 9999, mixBlendMode: "screen" }} />
      <div ref={ring} style={{ position: "fixed", top: 0, left: 0, width: 36, height: 36, border: "1px solid rgba(99,179,237,.4)", borderRadius: "50%", pointerEvents: "none", zIndex: 9998, transition: "border-color .2s" }} />
    </>
  );
}

// ─── REVEAL ───────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 40 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: .75, ease: [.22, 1, .36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (!ref.current) return;
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx, dy = (e.clientY - cy) / cy;
      ref.current.querySelectorAll(".orb").forEach((el, i) => {
        el.style.transform = `translate(${dx * (i + 1) * 10}px, ${dy * (i + 1) * 10}px)`;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const f = (d) => ({ initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: .85, ease: [.22, 1, .36, 1], delay: d } });

  return (
    <section ref={ref} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 4rem", position: "relative", overflow: "hidden" }}>
      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(99,179,237,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(99,179,237,.035) 1px,transparent 1px)", backgroundSize: "70px 70px", maskImage: "radial-gradient(ellipse 75% 75% at 50% 50%,black 20%,transparent 100%)", animation: "gridPulse 8s ease-in-out infinite", pointerEvents: "none" }} />

      {/* Orbs */}
      {[
        { w: 600, h: 600, top: -150, right: -150, c: "rgba(99,179,237,.12)" },
        { w: 450, h: 450, bottom: -100, left: -150, c: "rgba(159,122,234,.1)" },
        { w: 300, h: 300, top: "40%", left: "35%", c: "rgba(99,179,237,.06)" },
      ].map((o, i) => (
        <div key={i} className="orb" style={{ position: "absolute", width: o.w, height: o.h, top: o.top, bottom: o.bottom, left: o.left, right: o.right, background: `radial-gradient(circle,${o.c} 0%,transparent 70%)`, filter: "blur(80px)", borderRadius: "50%", pointerEvents: "none", transition: "transform .8s ease" }} />
      ))}

      <div style={{ position: "relative", zIndex: 10, maxWidth: 850 }}>

        <motion.h1 {...f(.35)} style={{ fontSize: "clamp(2.8rem,7vw,6rem)", fontWeight: 800, lineHeight: .95, letterSpacing: "-.03em", marginBottom: "2rem" }}>
          <span style={{ display: "block", color: "var(--text)" }}>Costruiamo la tua</span>
          <span className="text-gradient" style={{ display: "block" }}>presenza digitale</span>
        </motion.h1>

        <motion.p {...f(.55)} className="mono" style={{ fontSize: "1rem", color: "var(--dim)", lineHeight: 1.75, maxWidth: 540, marginBottom: "3rem" }}>
          Non costruisco solo siti web. Progetto sistemi digitali che aiutano business locali, e-commerce e brand a crescere online — con strategia, design e tecnologia.
        </motion.p>

        <motion.div {...f(.7)} style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
          <a href="#contatto" className="clip-tr" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: "1rem 2.2rem", background: "var(--accent)", color: "var(--bg)", fontFamily: "'DM Mono',monospace", fontSize: ".82rem", fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", textDecoration: "none", transition: "opacity .2s" }}
            onMouseEnter={e => e.currentTarget.style.opacity = ".85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >Parliamo del tuo progetto →</a>
          <a href="#soluzioni" className="clip-br mono" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: "1rem 2.2rem", border: "1px solid var(--border-hi)", color: "var(--accent)", fontSize: ".82rem", letterSpacing: ".1em", textTransform: "uppercase", textDecoration: "none", transition: "all .2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(99,179,237,.06)"; e.currentTarget.style.boxShadow = "var(--glow)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = "none"; }}
          >Cosa posso fare</a>
        </motion.div>

        {/* Social proof */}
        <motion.div {...f(.9)} style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--border)", display: "flex", gap: "3rem", flexWrap: "wrap" }}>
          {[
            { num: "20+", label: "Progetti consegnati" },
            { num: "3+", label: "Anni di esperienza" },
            { num: "100%", label: "Progetti custom" },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--accent)", lineHeight: 1 }}>{s.num}</div>
              <div className="mono" style={{ fontSize: ".68rem", color: "var(--muted)", letterSpacing: ".12em", textTransform: "uppercase", marginTop: ".3rem" }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── PROBLEMI ─────────────────────────────────────────────────────────────
function Problemi() {
  const [attivo, setAttivo] = useState(0);

  return (
    <section id="problemi" style={{ padding: "9rem 4rem", background: "radial-gradient(ellipse 60% 50% at 100% 50%,rgba(159,122,234,.05) 0%,transparent 70%),var(--bg)" }}>
      <Reveal>
        <p className="section-label">Cosa risolvo</p>
        <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-.02em", marginBottom: "1rem" }}>
          Riconosci uno<br />di questi problemi?
        </h2>
        <p className="mono" style={{ fontSize: ".88rem", color: "var(--dim)", lineHeight: 1.7, maxWidth: 480, marginBottom: "4rem" }}>
          Lavoro con business che hanno sfide concrete. Ecco quelle che risolvo più spesso.
        </p>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5px", background: "var(--border)", border: "1px solid var(--border)" }}>
        {PROBLEMI.map((p, i) => (
          <Reveal key={i} delay={i * .08}>
            <div
              onClick={() => setAttivo(i)}
              style={{ background: attivo === i ? "var(--surface2)" : "var(--surface)", padding: "2.5rem", position: "relative", overflow: "hidden", transition: "all .3s", borderLeft: attivo === i ? "2px solid var(--accent)" : "2px solid transparent" }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--surface2)"}
              onMouseLeave={e => e.currentTarget.style.background = attivo === i ? "var(--surface2)" : "var(--surface)"}
            >
              <div style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>{p.icon}</div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: ".8rem", lineHeight: 1.3 }}>{p.problema}</h3>
              <AnimatePresence>
                {attivo === i && (
                  <motion.p key="sol" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mono" style={{ fontSize: ".8rem", color: "var(--dim)", lineHeight: 1.7 }}>
                    {p.soluzione}
                  </motion.p>
                )}
              </AnimatePresence>
              {attivo !== i && <p className="mono" style={{ fontSize: ".75rem", color: "var(--muted)", marginTop: ".3rem" }}>Clicca per sapere come →</p>}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── SOLUZIONI ────────────────────────────────────────────────────────────
function Soluzioni() {
  return (
    <section id="soluzioni" style={{ padding: "9rem 4rem", background: "radial-gradient(ellipse 50% 60% at 0% 50%,rgba(99,179,237,.04) 0%,transparent 70%),var(--bg)" }}>
      <Reveal>
        <p className="section-label">Soluzioni</p>
        <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-.02em", marginBottom: "1rem" }}>
          Cosa costruisco<br />e che risultati porta
        </h2>
        <p className="mono" style={{ fontSize: ".88rem", color: "var(--dim)", lineHeight: 1.7, maxWidth: 480, marginBottom: "5rem" }}>
          Non vendo tecnologia. Risolvo problemi di business con gli strumenti giusti.
        </p>
      </Reveal>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5px", background: "var(--border)", border: "1px solid var(--border)" }}>
        {SOLUZIONI.map((s, i) => (
          <Reveal key={i} delay={i * .08}>
            <SoluzioneCard s={s} i={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SoluzioneCard({ s, i }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr", gap: "1.5px", background: "var(--border)", transition: "box-shadow .3s", boxShadow: hov ? "var(--glow-lg)" : "none" }}>

      {/* Tipo */}
      <div style={{ background: "var(--surface)", padding: "2.5rem 2rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <span className="mono" style={{ fontSize: ".65rem", color: "var(--muted)", letterSpacing: ".2em" }}>0{i + 1}</span>
        <div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1rem", lineHeight: 1.2 }}>{s.tipo}</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".35rem" }}>
            {s.tag.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
        </div>
      </div>

      {/* Problema + Soluzione */}
      <div style={{ background: "var(--surface)", padding: "2.5rem 2.5rem" }}>
        <p className="mono" style={{ fontSize: ".65rem", color: "var(--accent)", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: ".8rem" }}>Problema</p>
        <p style={{ fontSize: ".95rem", fontWeight: 600, marginBottom: "1.5rem", lineHeight: 1.4 }}>{s.problema}</p>
        <p className="mono" style={{ fontSize: ".65rem", color: "var(--accent)", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: ".8rem" }}>Soluzione</p>
        <p className="mono" style={{ fontSize: ".82rem", color: "var(--dim)", lineHeight: 1.7 }}>{s.soluzione}</p>
      </div>

      {/* Risultato */}
      <div style={{ background: hov ? "var(--surface2)" : "var(--surface)", padding: "2.5rem 2.5rem", borderLeft: "1px solid var(--border)", transition: "background .3s", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <p className="mono" style={{ fontSize: ".65rem", color: "var(--accent)", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: ".8rem" }}>Risultato per il cliente</p>
        <p style={{ fontSize: "1rem", fontWeight: 600, lineHeight: 1.5, color: hov ? "var(--text)" : "var(--dim)", transition: "color .3s" }}>{s.risultato}</p>
      </div>
    </div>
  );
}

// ─── PROCESSO ─────────────────────────────────────────────────────────────
function Processo() {
  return (
    <section id="processo" style={{ padding: "9rem 4rem", background: "var(--bg)" }}>
      <Reveal>
        <p className="section-label">Come lavoro</p>
        <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-.02em", marginBottom: "1rem" }}>
          Metodo chiaro,<br />risultati prevedibili
        </h2>
        <p className="mono" style={{ fontSize: ".88rem", color: "var(--dim)", lineHeight: 1.7, maxWidth: 480, marginBottom: "5rem" }}>
          Ogni progetto segue un processo strutturato. Sai sempre a che punto siamo e cosa aspettarti.
        </p>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.5px", background: "var(--border)", border: "1px solid var(--border)" }}>
        {PROCESSO.map((p, i) => (
          <Reveal key={i} delay={i * .1}>
            <ProcessoCard p={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProcessoCard({ p }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: "var(--surface)", padding: "2.8rem 2.2rem", position: "relative", overflow: "hidden", transition: "all .3s", borderTop: hov ? "2px solid var(--accent)" : "2px solid transparent" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(99,179,237,.05) 0%,transparent 60%)", opacity: hov ? 1 : 0, transition: "opacity .3s", pointerEvents: "none" }} />
      <p className="mono" style={{ fontSize: ".65rem", color: "var(--accent)", letterSpacing: ".2em", marginBottom: "2rem", opacity: .5 }}>{p.num}</p>
      <h3 style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: "1rem" }}>{p.titolo}</h3>
      <p className="mono" style={{ fontSize: ".8rem", color: "var(--dim)", lineHeight: 1.75 }}>{p.desc}</p>
    </div>
  );
}

// ─── CHI SONO ─────────────────────────────────────────────────────────────
function ChiSono() {
  return (
    <section id="chi-sono" style={{ padding: "9rem 4rem", background: "radial-gradient(ellipse 60% 50% at 50% 100%,rgba(99,179,237,.05) 0%,transparent 70%),var(--bg)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
        <Reveal>
          <p className="section-label">Chi sono</p>
          <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-.02em", marginBottom: "1.5rem" }}>
            Un consulente digitale<br />con il codice in mano.
          </h2>
          <p className="mono" style={{ fontSize: ".88rem", color: "var(--dim)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Mi chiamo Alessio Lodato. Non sono un developer che aspetta brief perfetti — sono qualcuno che capisce il tuo business e costruisce la soluzione giusta per farlo crescere online.
          </p>
          <p className="mono" style={{ fontSize: ".88rem", color: "var(--dim)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            Ho lavorato con palestre, agenzie creative, brand e-commerce e professionisti. Il filo comune: tutti avevano bisogno di qualcuno che unisse visione strategica e capacità tecnica reale.
          </p>
          <a href="#contatto" className="clip-tr mono" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".9rem 2rem", background: "var(--accent)", color: "var(--bg)", fontSize: ".8rem", letterSpacing: ".1em", textTransform: "uppercase", textDecoration: "none", transition: "opacity .2s" }}
            onMouseEnter={e => e.currentTarget.style.opacity = ".85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >Parliamo del tuo progetto →</a>
        </Reveal>

        <Reveal delay={.15}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5px", background: "var(--border)", border: "1px solid var(--border)" }}>
            {[
              { label: "Stack principale", val: "Next.js · React · Tailwind" },
              { label: "Backend & Database", val: "Supabase · PostgreSQL" },
              { label: "Pagamenti", val: "Stripe" },
              { label: "Deploy & Infra", val: "Vercel · Aruba · Cloudflare" },
              { label: "SEO & Performance", val: "Core Web Vitals · Schema.org" },
              { label: "Design", val: "Figma · UI/UX personalizzato" },
            ].map(r => (
              <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--surface)", padding: "1.1rem 1.8rem", gap: "1rem" }}>
                <span className="mono" style={{ fontSize: ".72rem", color: "var(--muted)", letterSpacing: ".08em" }}>{r.label}</span>
                <span className="mono" style={{ fontSize: ".75rem", color: "var(--accent)", letterSpacing: ".06em", textAlign: "right" }}>{r.val}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── CONTATTO ─────────────────────────────────────────────────────────────
function Contatto() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  const [done, setDone] = useState(false);

  const onSubmit = async (data) => {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
        subject: `[Portfolio] Nuovo messaggio da ${data.nome}`,
        from_name: data.nome,
        email: data.email,
        tipo_progetto: data.tipo,
        messaggio: data.messaggio,
      }),
    });
    const json = await res.json();
    if (json.success) {
      setDone(true); reset();
      setTimeout(() => setDone(false), 5000);
    } else {
      alert("Errore nell'invio. Riprova.");
    }
  };

  const fieldStyle = { position: "relative", background: "var(--surface)" };
  const labelStyle = { display: "block", fontFamily: "'DM Mono',monospace", fontSize: ".65rem", color: "var(--accent)", letterSpacing: ".2em", textTransform: "uppercase", padding: "1rem 1.5rem 0" };
  const inputStyle = { background: "transparent", border: "none", outline: "none", color: "var(--text)", fontFamily: "'DM Mono',monospace", fontSize: ".85rem", padding: ".4rem 1.5rem 1.2rem", width: "100%" };

  return (
    <section id="contatto" style={{ padding: "9rem 4rem", background: "var(--bg)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>

        <Reveal>
          <p className="section-label">Contatto</p>
          <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-.02em", marginBottom: "1.5rem" }}>
            Pronto a far crescere<br />il tuo business online?
          </h2>
          <p className="mono" style={{ fontSize: ".88rem", color: "var(--dim)", lineHeight: 1.8, marginBottom: "3rem" }}>
            Non serve avere tutto chiaro. Raccontami la situazione attuale e dove vuoi arrivare — penso io al resto. Prima call gratuita, senza impegno.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {[
              "✓ Risposta entro 24 ore",
              "✓ Prima consulenza gratuita",
              "✓ Preventivo chiaro e dettagliato",
              "✓ Nessun tecnicismo inutile",
            ].map(v => (
              <p key={v} className="mono" style={{ fontSize: ".82rem", color: "var(--dim)", letterSpacing: ".05em" }}>{v}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={.15}>
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="ok" initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                style={{ border: "1px solid var(--border-hi)", background: "var(--surface)", padding: "4rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.2rem", textAlign: "center", clipPath: "polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,0 100%)" }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ color: "var(--accent)" }}><path d="M20 6L9 17l-5-5" /></svg>
                <p style={{ fontSize: "1rem", fontWeight: 700 }}>Messaggio inviato!</p>
                <p className="mono" style={{ fontSize: ".82rem", color: "var(--dim)" }}>Ti rispondo entro <span style={{ color: "var(--accent)" }}>24 ore</span>.</p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit(onSubmit)} noValidate
                style={{ display: "flex", flexDirection: "column", gap: "1.5px", background: "var(--border)", border: "1px solid var(--border)" }}>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5px", background: "var(--border)" }}>
                  {[
                    { id: "nome", label: "Nome", type: "text", ph: "Mario Rossi", rules: { required: true } },
                    { id: "email", label: "Email", type: "email", ph: "mario@azienda.it", rules: { required: true, pattern: /^\S+@\S+$/i } },
                  ].map(f => (
                    <div key={f.id} style={fieldStyle}>
                      <label style={labelStyle}>{f.label}</label>
                      <input {...register(f.id, f.rules)} type={f.type} placeholder={f.ph} style={inputStyle}
                        onFocus={e => e.currentTarget.closest("div").style.background = "rgba(99,179,237,.04)"}
                        onBlur={e => e.currentTarget.closest("div").style.background = "var(--surface)"}
                      />
                      {errors[f.id] && <p className="mono" style={{ fontSize: ".6rem", color: "#fc8181", padding: "0 1.5rem .5rem" }}>Obbligatorio</p>}
                    </div>
                  ))}
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>Tipo di progetto</label>
                  <select {...register("tipo", { required: true })} defaultValue="" style={{ ...inputStyle, appearance: "none" }}
                    onFocus={e => e.currentTarget.closest("div").style.background = "rgba(99,179,237,.04)"}
                    onBlur={e => e.currentTarget.closest("div").style.background = "var(--surface)"}
                  >
                    <option value="" disabled>Seleziona...</option>
                    {TIPI_PROGETTO.map(t => <option key={t} value={t} style={{ background: "var(--surface)" }}>{t}</option>)}
                  </select>
                  {errors.tipo && <p className="mono" style={{ fontSize: ".6rem", color: "#fc8181", padding: "0 1.5rem .5rem" }}>Obbligatorio</p>}
                </div>

                <div style={fieldStyle}>
                  <label style={{ ...labelStyle, textAlign: "left" }}>Raccontami il progetto</label>
                  <textarea {...register("messaggio", { required: true })} rows={4} placeholder="Dove sei adesso e dove vuoi arrivare..." style={{ ...inputStyle, resize: "none" }}
                    onFocus={e => e.currentTarget.closest("div").style.background = "rgba(99,179,237,.04)"}
                    onBlur={e => e.currentTarget.closest("div").style.background = "var(--surface)"}
                  />
                  {errors.messaggio && <p className="mono" style={{ fontSize: ".6rem", color: "#fc8181", padding: "0 1.5rem .5rem", textAlign: "left" }}>Obbligatorio</p>}
                </div>

                <div style={{ background: "var(--surface)", padding: "1.5rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                  <p className="mono" style={{ fontSize: ".7rem", color: "var(--muted)" }}>Risposta garantita entro <span style={{ color: "var(--accent)" }}>24h</span></p>
                  <button type="submit" className="clip-tr" disabled={isSubmitting}
                    style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".9rem 2rem", background: "var(--accent)", color: "var(--bg)", fontFamily: "'DM Mono',monospace", fontSize: ".8rem", letterSpacing: ".1em", textTransform: "uppercase", border: "none", transition: "opacity .2s", opacity: isSubmitting ? .7 : 1 }}>
                    {isSubmitting ? "Invio in corso..." : "Iniziamo →"}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding: "2rem 4rem", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
      <p className="mono" style={{ fontSize: ".75rem", color: "var(--muted)", letterSpacing: ".12em" }}>ALESSIO LODATO — DIGITAL CONSULTANT</p>
      <p className="mono" style={{ fontSize: ".65rem", color: "var(--muted)" }}>
        © {new Date().getFullYear()} — <span style={{ color: "var(--accent)" }}>Next.js</span> + <span style={{ color: "var(--accent)" }}>Tailwind</span>
      </p>
    </footer>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLE }} />
      <Cursor />
      <main>
        <Hero />
        <Problemi />
        <Soluzioni />
        <Processo />
        <ChiSono />
        <Contatto />
      </main>
      <Footer />
    </>
  );
}