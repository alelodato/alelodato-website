// src/app/page.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";

// ─── DATI — modifica qui ───────────────────────────────────────────────────
const SITE = {
  nome: "Alessio Lodato",
  ruolo: "Web Developer & Digital Architect",
  tagline: "Trasformo idee in siti web veloci, belli e strategici.\nPer attività e professionisti che vogliono farsi notare.",
  email: "alessio@example.com",
  linkedin: "https://linkedin.com/in/alelodato",
  github: "https://github.com/alelodato",
  stats: [
    { num: "20+", label: "Progetti" },
    { num: "3+",  label: "Anni di exp." },
    { num: "100%",label: "Custom" },
  ],
};

const SERVIZI = [
  {
    num: "01", name: "Siti Web & Landing Page",
    desc: "Design su misura, ottimizzato per convertire. Veloce, responsive, e costruito per durare nel tempo.",
    tags: ["Next.js", "Tailwind", "CMS"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-11 h-11 text-accent"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  },
  {
    num: "02", name: "Web App & Pannelli Admin",
    desc: "Applicazioni full-stack con autenticazione, database e interfacce admin per gestire i tuoi contenuti.",
    tags: ["Supabase", "React", "API"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-11 h-11 text-accent"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  },
  {
    num: "03", name: "SEO & Presenza Online",
    desc: "Strategie tecniche e contenuti ottimizzati per farti trovare su Google davanti ai competitor.",
    tags: ["Schema.org", "Core Web Vitals", "Analytics"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-11 h-11 text-accent"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  },
];

const PROGETTI = [
  {
    num: "01", title: "Future Frames\nAgency",
    desc: "Sito completo per agenzia di fotografia e videomaking. Admin panel, blog, portfolio con Supabase Storage.",
    tags: ["Next.js", "Tailwind", "Supabase", "Vercel"],
    link: "#",
  },
  {
    num: "02", title: "Red Gym\nFonte Nuova",
    desc: "Sito web per palestra locale. Schema.org, Google Search Console, dominio connesso e SEO locale.",
    tags: ["Next.js", "Tailwind", "Schema.org", "SEO"],
    link: "#",
  },
  {
    num: "03", title: "E-Commerce\nArtigianale",
    desc: "Piattaforma di vendita per brand italiano. Checkout custom, gestione ordini e pagamenti Stripe.",
    tags: ["Next.js", "Stripe", "Supabase", "Admin Panel"],
    link: "#",
  },
];

const TIPI_PROGETTO = [
  "Sito Vetrina","Landing Page","Web App / Portale",
  "E-Commerce","Restyling Sito Esistente","SEO & Ottimizzazione","Altro",
];

// ─── CSS-IN-JS globals (iniettato una volta) ───────────────────────────────
const GLOBAL_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  :root {
    --bg:#050810; --surface:#0b0f1a;
    --border:rgba(99,179,237,0.12); --border-hi:rgba(99,179,237,0.35);
    --accent:#63b3ed; --accent2:#9f7aea; --accent-dim:rgba(99,179,237,0.08);
    --text:#e2e8f0; --muted:#64748b; --dim:#94a3b8;
    --glow:0 0 40px rgba(99,179,237,0.15);
    --glow-lg:0 0 80px rgba(99,179,237,0.25);
  }
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html { scroll-behavior:smooth; }
  body { background:var(--bg); color:var(--text); font-family:'Syne',sans-serif; overflow-x:hidden; cursor:none; }
  a, button, input, textarea, select { cursor:none; }

  /* scanlines */
  body::before {
    content:''; position:fixed; inset:0; pointer-events:none; z-index:100;
    background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.025) 2px,rgba(0,0,0,0.025) 4px);
  }

  .font-mono { font-family:'DM Mono',monospace; }
  .text-accent { color:var(--accent); }
  .text-dim { color:var(--dim); }
  .text-muted { color:var(--muted); }
  .text-gradient {
    background:linear-gradient(135deg,var(--accent) 0%,var(--accent2) 100%);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  }
  .section-tag {
    font-family:'DM Mono',monospace; font-size:.7rem; color:var(--accent);
    letter-spacing:.3em; text-transform:uppercase;
    display:flex; align-items:center; gap:.75rem;
  }
  .section-tag::before { content:''; display:inline-block; width:24px; height:1px; background:var(--accent); }
  .tech-tag {
    font-family:'DM Mono',monospace; font-size:.65rem; color:var(--accent);
    background:var(--accent-dim); border:1px solid rgba(99,179,237,.2);
    padding:.2rem .55rem; letter-spacing:.08em;
  }
  .clip-tr { clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,0 100%); }
  .clip-br { clip-path:polygon(0 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%); }

  @keyframes scrollLine {
    0%   { transform:scaleY(0); transform-origin:top;    opacity:0; }
    50%  { transform:scaleY(1); transform-origin:top;    opacity:1; }
    100% { transform:scaleY(0); transform-origin:bottom; opacity:0; }
  }
  @keyframes gridPulse { 0%,100%{opacity:.6} 50%{opacity:1} }
`;

// ─── CURSOR ────────────────────────────────────────────────────────────────
function Cursor() {
  const dot  = useRef(null);
  const ring = useRef(null);
  const pos  = useRef({ x:0, y:0 });
  const lag  = useRef({ x:0, y:0 });

  useEffect(() => {
    const move = (e) => { pos.current = { x:e.clientX, y:e.clientY }; };
    window.addEventListener("mousemove", move);
    let raf;
    const tick = () => {
      lag.current.x += (pos.current.x - lag.current.x) * 0.12;
      lag.current.y += (pos.current.y - lag.current.y) * 0.12;
      if (dot.current)  dot.current.style.transform  = `translate(${pos.current.x-5}px,${pos.current.y-5}px)`;
      if (ring.current) ring.current.style.transform = `translate(${lag.current.x-18}px,${lag.current.y-18}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dot}  style={{ position:"fixed",top:0,left:0,width:10,height:10,background:"var(--accent)",borderRadius:"50%",pointerEvents:"none",zIndex:9999,mixBlendMode:"screen" }} />
      <div ref={ring} style={{ position:"fixed",top:0,left:0,width:36,height:36,border:"1px solid rgba(99,179,237,.5)",borderRadius:"50%",pointerEvents:"none",zIndex:9998 }} />
    </>
  );
}

// ─── NAVBAR ────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position:"fixed",top:0,left:0,right:0,zIndex:200,
      display:"flex",alignItems:"center",justifyContent:"space-between",
      padding:"1.3rem 4rem",
      transition:"all .4s ease",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      background: scrolled ? "rgba(5,8,16,.88)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
    }}>
      <a href="#" style={{ fontFamily:"'DM Mono',monospace",fontSize:".85rem",color:"var(--accent)",letterSpacing:".15em",textDecoration:"none",textTransform:"uppercase" }}>
        A.Lo<span style={{color:"var(--muted)"}}>/dev</span>
      </a>
      <ul style={{ display:"flex",gap:"2.5rem",listStyle:"none" }}>
        {["servizi","lavori","contatto"].map(id => (
          <li key={id}>
            <a href={`#${id}`} className="font-mono" style={{ fontSize:".75rem",color:"var(--muted)",textDecoration:"none",letterSpacing:".12em",textTransform:"uppercase",transition:"color .2s" }}
              onMouseEnter={e => e.target.style.color="var(--accent)"}
              onMouseLeave={e => e.target.style.color="var(--muted)"}
            >{id}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (!ref.current) return;
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx, dy = (e.clientY - cy) / cy;
      ref.current.querySelectorAll(".orb").forEach((el, i) => {
        const f = (i + 1) * 9;
        el.style.transform = `translate(${dx*f}px,${dy*f}px)`;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const fade = (delay) => ({
    initial:{ opacity:0, y:28 },
    animate:{ opacity:1, y:0 },
    transition:{ duration:.8, ease:[.22,1,.36,1], delay },
  });

  return (
    <section ref={ref} id="hero" style={{ minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 4rem",position:"relative",overflow:"hidden" }}>
      {/* grid */}
      <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(99,179,237,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(99,179,237,.04) 1px,transparent 1px)",backgroundSize:"60px 60px",maskImage:"radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)",animation:"gridPulse 8s ease-in-out infinite" }} />
      {/* orbs */}
      {[
        { w:500,h:500,top:-100,right:-100,color:"rgba(99,179,237,.15)" },
        { w:400,h:400,bottom:0,left:-100,color:"rgba(159,122,234,.12)" },
        { w:250,h:250,top:"50%",left:"40%",color:"rgba(99,179,237,.08)" },
      ].map((o,i) => (
        <div key={i} className="orb" style={{ position:"absolute",width:o.w,height:o.h,top:o.top,bottom:o.bottom,left:o.left,right:o.right,background:`radial-gradient(circle,${o.color} 0%,transparent 70%)`,filter:"blur(100px)",borderRadius:"50%",pointerEvents:"none",transition:"transform .7s ease" }} />
      ))}

      <div style={{ position:"relative",zIndex:10,maxWidth:900 }}>
        <motion.p {...fade(.3)} className="font-mono" style={{ fontSize:".75rem",letterSpacing:".25em",color:"var(--accent)",textTransform:"uppercase",marginBottom:"1.8rem",display:"flex",alignItems:"center",gap:"1rem" }}>
          <span style={{ display:"block",width:40,height:1,background:"var(--accent)",flexShrink:0 }} />
          {SITE.ruolo}
        </motion.p>

        <motion.h1 {...fade(.5)} style={{ fontSize:"clamp(3.5rem,9vw,7.5rem)",fontWeight:800,lineHeight:.92,letterSpacing:"-.03em",marginBottom:"1.5rem" }}>
          <span style={{ display:"block" }}>Costruisco</span>
          <span className="text-gradient" style={{ display:"block" }}>Presenze Digitali.</span>
        </motion.h1>

        <motion.p {...fade(.75)} className="font-mono" style={{ fontSize:".95rem",color:"var(--dim)",lineHeight:1.7,maxWidth:480,marginBottom:"3rem",whiteSpace:"pre-line" }}>
          {SITE.tagline}
        </motion.p>

        <motion.div {...fade(.95)} style={{ display:"flex",gap:"1.2rem",alignItems:"center" }}>
          <a href="#lavori" className="clip-tr" style={{ display:"inline-flex",alignItems:"center",gap:".5rem",padding:".9rem 2rem",background:"var(--accent)",color:"var(--bg)",fontFamily:"'DM Mono',monospace",fontSize:".8rem",letterSpacing:".1em",textTransform:"uppercase",textDecoration:"none",transition:"opacity .2s" }}
            onMouseEnter={e=>e.currentTarget.style.opacity=".85"}
            onMouseLeave={e=>e.currentTarget.style.opacity="1"}
          >Vedi i Lavori →</a>
          <a href="#contatto" className="clip-br" style={{ display:"inline-flex",alignItems:"center",gap:".5rem",padding:".9rem 2rem",border:"1px solid var(--border-hi)",color:"var(--accent)",fontFamily:"'DM Mono',monospace",fontSize:".8rem",letterSpacing:".1em",textTransform:"uppercase",textDecoration:"none",transition:"all .2s" }}
            onMouseEnter={e=>{ e.currentTarget.style.background="var(--accent-dim)"; e.currentTarget.style.boxShadow="var(--glow)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.boxShadow="none"; }}
          >Parliamoci</a>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5,duration:.8}} style={{ position:"absolute",bottom:"3rem",left:"4rem",display:"flex",alignItems:"center",gap:"1rem" }}>
        <div style={{ width:1,height:60,background:"linear-gradient(to bottom,transparent,var(--accent))",animation:"scrollLine 2s ease-in-out infinite" }} />
        <span className="font-mono" style={{ fontSize:".7rem",color:"var(--muted)",letterSpacing:".2em",textTransform:"uppercase",writingMode:"vertical-lr",transform:"rotate(180deg)" }}>Scroll</span>
      </motion.div>

      {/* stats */}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.3,duration:.8}} style={{ position:"absolute",right:"4rem",bottom:"3rem",display:"flex",flexDirection:"column",gap:"1.5rem" }}>
        {SITE.stats.map(s => (
          <div key={s.label} style={{ textAlign:"right",borderRight:"1px solid var(--border-hi)",paddingRight:"1.2rem" }}>
            <div style={{ fontSize:"1.6rem",fontWeight:800,color:"var(--accent)",lineHeight:1 }}>{s.num}</div>
            <div className="font-mono" style={{ fontSize:".65rem",color:"var(--muted)",letterSpacing:".15em",textTransform:"uppercase",marginTop:".2rem" }}>{s.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

// ─── REVEAL WRAPPER ────────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity:0, y:40 }} animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:.7, ease:[.22,1,.36,1], delay }}>
      {children}
    </motion.div>
  );
}

// ─── SERVIZI ───────────────────────────────────────────────────────────────
function Servizi() {
  return (
    <section id="servizi" style={{ padding:"8rem 4rem",background:"radial-gradient(ellipse 60% 50% at 80% 50%,rgba(159,122,234,.05) 0%,transparent 70%),var(--bg)" }}>
      <Reveal>
        <p className="section-tag" style={{ marginBottom:"1rem" }}>Cosa faccio</p>
        <h2 style={{ fontSize:"clamp(2rem,4vw,3.2rem)",fontWeight:800,lineHeight:1.05,letterSpacing:"-.02em",marginBottom:"1.2rem" }}>Soluzioni Web<br/>Su Misura</h2>
        <p className="font-mono" style={{ fontSize:".88rem",color:"var(--dim)",lineHeight:1.7,maxWidth:520,marginBottom:"5rem" }}>
          Ogni progetto è costruito da zero, con attenzione al design, alla performance e ai tuoi obiettivi di business.
        </p>
      </Reveal>

      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.5px",background:"var(--border)",border:"1px solid var(--border)" }}>
        {SERVIZI.map((s, i) => (
          <Reveal key={s.num} delay={i * .1}>
            <ServiceCard s={s} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ s }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ background:"var(--surface)",padding:"2.8rem 2.5rem",position:"relative",overflow:"hidden",transition:"transform .35s,box-shadow .35s",transform:hov?"translateY(-4px)":"none",boxShadow:hov?"0 -2px 0 0 var(--accent) inset, var(--glow)":"none" }}>
      <div style={{ position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(99,179,237,.06) 0%,transparent 60%)",opacity:hov?1:0,transition:"opacity .35s",pointerEvents:"none" }} />
      <p className="font-mono" style={{ fontSize:".65rem",color:"var(--accent)",letterSpacing:".2em",marginBottom:"1.5rem",opacity:.6 }}>{s.num}</p>
      <div style={{ marginBottom:"1.8rem" }}>{s.icon}</div>
      <h3 style={{ fontSize:"1.2rem",fontWeight:700,marginBottom:".9rem" }}>{s.name}</h3>
      <p className="font-mono" style={{ fontSize:".8rem",color:"var(--dim)",lineHeight:1.75 }}>{s.desc}</p>
      <div style={{ display:"flex",flexWrap:"wrap",gap:".4rem",marginTop:"1.8rem" }}>
        {s.tags.map(t => <span key={t} className="tech-tag">{t}</span>)}
      </div>
    </div>
  );
}

// ─── LAVORI ────────────────────────────────────────────────────────────────
function Lavori() {
  return (
    <section id="lavori" style={{ padding:"8rem 4rem",background:"radial-gradient(ellipse 50% 60% at 20% 50%,rgba(99,179,237,.04) 0%,transparent 70%),var(--bg)" }}>
      <Reveal>
        <p className="section-tag" style={{ marginBottom:"1rem" }}>Portfolio</p>
        <h2 style={{ fontSize:"clamp(2rem,4vw,3.2rem)",fontWeight:800,lineHeight:1.05,letterSpacing:"-.02em",marginBottom:"1.2rem" }}>Progetti Selezionati</h2>
        <p className="font-mono" style={{ fontSize:".88rem",color:"var(--dim)",lineHeight:1.7,maxWidth:520,marginBottom:"5rem" }}>
          Una selezione di lavori recenti. Ogni progetto nasce da un brief specifico e si evolve in qualcosa di unico.
        </p>
      </Reveal>

      <div style={{ display:"flex",flexDirection:"column",gap:2 }}>
        {PROGETTI.map((p, i) => (
          <Reveal key={p.num} delay={i * .1}>
            <ProjectCard p={p} reverse={i % 2 === 1} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ p, reverse }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:2,background:"var(--border)",boxShadow:hov?"var(--glow-lg)":"none",transition:"box-shadow .4s" }}>

      {/* Immagine */}
      <div style={{ order:reverse?2:1,position:"relative",overflow:"hidden",background:"var(--surface)",minHeight:280 }}>
        {/* placeholder */}
        <div style={{ width:"100%",height:"100%",minHeight:280,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:8,position:"relative" }}>
          <div style={{ position:"absolute",inset:0,background:"repeating-linear-gradient(45deg,transparent,transparent 30px,rgba(99,179,237,.015) 30px,rgba(99,179,237,.015) 31px)" }} />
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} style={{ color:"var(--muted)",opacity:.2 }}>
            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
          </svg>
          <p className="font-mono" style={{ fontSize:".7rem",color:"var(--muted)",letterSpacing:".2em",position:"relative" }}>SCREENSHOT PRESTO</p>
        </div>
        {/* scan on hover */}
        {hov && <motion.div initial={{top:"-4%"}} animate={{top:"110%"}} transition={{duration:.6,ease:"easeIn"}}
          style={{ position:"absolute",left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,var(--accent),transparent)",pointerEvents:"none" }} />}
      </div>

      {/* Info */}
      <div style={{ order:reverse?1:2,background:"var(--surface)",padding:"3rem 3.5rem",display:"flex",flexDirection:"column",justifyContent:"center" }}>
        <p className="font-mono" style={{ fontSize:".65rem",color:"var(--accent)",letterSpacing:".25em",marginBottom:"1.2rem",opacity:.5 }}>PROJECT — {p.num}</p>
        <h3 style={{ fontSize:"1.7rem",fontWeight:800,letterSpacing:"-.02em",lineHeight:1.1,marginBottom:"1rem",whiteSpace:"pre-line" }}>{p.title}</h3>
        <p className="font-mono" style={{ fontSize:".82rem",color:"var(--dim)",lineHeight:1.75,marginBottom:"2rem" }}>{p.desc}</p>
        <div style={{ display:"flex",flexWrap:"wrap",gap:".4rem",marginBottom:"2.5rem" }}>
          {p.tags.map(t => <span key={t} className="tech-tag">{t}</span>)}
        </div>
        <a href={p.link} className="font-mono" style={{ display:"inline-flex",alignItems:"center",gap:".5rem",fontSize:".75rem",color:"var(--accent)",textDecoration:"none",letterSpacing:".1em",textTransform:"uppercase",borderBottom:"1px solid rgba(99,179,237,.3)",paddingBottom:".2rem",width:"fit-content",transition:"gap .2s,border-color .2s" }}
          onMouseEnter={e=>{ e.currentTarget.style.gap=".9rem"; e.currentTarget.style.borderColor="var(--accent)"; }}
          onMouseLeave={e=>{ e.currentTarget.style.gap=".5rem"; e.currentTarget.style.borderColor="rgba(99,179,237,.3)"; }}
        >Vedi Progetto →</a>
      </div>
    </div>
  );
}

// ─── CONTATTO ──────────────────────────────────────────────────────────────
function Contatto() {
  const { register, handleSubmit, formState:{ errors, isSubmitting }, reset } = useForm();
  const [done, setDone] = useState(false);

  const onSubmit = async (data) => {
    // TODO: fetch("/api/contact", { method:"POST", body:JSON.stringify(data) })
    await new Promise(r => setTimeout(r, 900));
    setDone(true);
    reset();
    setTimeout(() => setDone(false), 4000);
  };

  const fieldStyle = { position:"relative",background:"var(--surface)",transition:"background .2s" };
  const labelStyle = { display:"block",fontFamily:"'DM Mono',monospace",fontSize:".65rem",color:"var(--accent)",letterSpacing:".2em",textTransform:"uppercase",padding:"1rem 1.5rem 0" };
  const inputStyle = { background:"transparent",border:"none",outline:"none",color:"var(--text)",fontFamily:"'DM Mono',monospace",fontSize:".85rem",padding:".4rem 1.5rem 1.2rem",width:"100%" };

  return (
    <section id="contatto" style={{ padding:"8rem 4rem",textAlign:"center",background:"radial-gradient(ellipse 60% 60% at 50% 100%,rgba(99,179,237,.07) 0%,transparent 70%),var(--bg)" }}>
      <Reveal>
        <p className="section-tag" style={{ justifyContent:"center",marginBottom:"1rem" }}><span style={{display:"none"}}/>Contatto</p>
        <h2 style={{ fontSize:"clamp(2rem,4vw,3.2rem)",fontWeight:800,lineHeight:1.05,letterSpacing:"-.02em",marginBottom:"1.2rem" }}>Hai un Progetto<br/>in Mente?</h2>
        <p className="font-mono" style={{ fontSize:".88rem",color:"var(--dim)",lineHeight:1.7,maxWidth:520,margin:"0 auto 4rem" }}>
          Raccontami la tua idea. Rispondo entro 24 ore e offro una prima consulenza gratuita.
        </p>
      </Reveal>

      <Reveal delay={.15}>
        <div style={{ maxWidth:680,margin:"0 auto" }}>
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="ok" initial={{opacity:0,scale:.97}} animate={{opacity:1,scale:1}} exit={{opacity:0}} style={{ border:"1px solid var(--border-hi)",background:"var(--surface)",padding:"4rem",display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem",clipPath:"polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,0 100%)" }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{color:"var(--accent)"}}><path d="M20 6L9 17l-5-5"/></svg>
                <p className="font-mono" style={{ fontSize:".85rem",color:"var(--dim)",letterSpacing:".08em" }}>Messaggio inviato. Ti rispondo entro <span style={{color:"var(--accent)"}}>24 ore</span>.</p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit(onSubmit)} noValidate style={{ display:"flex",flexDirection:"column",gap:"1.5px",background:"var(--border)",border:"1px solid var(--border)" }}>
                {/* Nome + Email */}
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.5px",background:"var(--border)" }}>
                  {[
                    { id:"nome", label:"Nome", type:"text", placeholder:"Mario Rossi", rules:{ required:true } },
                    { id:"email", label:"Email", type:"email", placeholder:"mario@azienda.it", rules:{ required:true, pattern:/^\S+@\S+$/i } },
                  ].map(f => (
                    <div key={f.id} style={fieldStyle}>
                      <label style={labelStyle}>{f.label}</label>
                      <input {...register(f.id, f.rules)} type={f.type} placeholder={f.placeholder} style={inputStyle}
                        onFocus={e=>e.currentTarget.closest("div").style.background="rgba(99,179,237,.04)"}
                        onBlur={e=>e.currentTarget.closest("div").style.background="var(--surface)"}
                      />
                      {errors[f.id] && <p className="font-mono" style={{ fontSize:".6rem",color:"#fc8181",padding:"0 1.5rem .5rem" }}>Obbligatorio</p>}
                    </div>
                  ))}
                </div>

                {/* Tipo */}
                <div style={fieldStyle}>
                  <label style={labelStyle}>Tipo di Progetto</label>
                  <select {...register("tipo",{required:true})} defaultValue="" style={{...inputStyle,appearance:"none"}}
                    onFocus={e=>e.currentTarget.closest("div").style.background="rgba(99,179,237,.04)"}
                    onBlur={e=>e.currentTarget.closest("div").style.background="var(--surface)"}
                  >
                    <option value="" disabled>Seleziona...</option>
                    {TIPI_PROGETTO.map(t => <option key={t} value={t} style={{background:"var(--surface)"}}>{t}</option>)}
                  </select>
                  {errors.tipo && <p className="font-mono" style={{ fontSize:".6rem",color:"#fc8181",padding:"0 1.5rem .5rem" }}>Obbligatorio</p>}
                </div>

                {/* Messaggio */}
                <div style={fieldStyle}>
                  <label style={{ ...labelStyle, textAlign:"left" }}>Messaggio</label>
                  <textarea {...register("messaggio",{required:true})} rows={5} placeholder="Descrivimi il tuo progetto e cosa vorresti ottenere..." style={{...inputStyle,resize:"none"}}
                    onFocus={e=>e.currentTarget.closest("div").style.background="rgba(99,179,237,.04)"}
                    onBlur={e=>e.currentTarget.closest("div").style.background="var(--surface)"}
                  />
                  {errors.messaggio && <p className="font-mono" style={{ fontSize:".6rem",color:"#fc8181",padding:"0 1.5rem .5rem",textAlign:"left" }}>Obbligatorio</p>}
                </div>

                {/* Submit */}
                <div style={{ background:"var(--surface)",padding:"1.5rem 2rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1rem",flexWrap:"wrap" }}>
                  <p className="font-mono" style={{ fontSize:".7rem",color:"var(--muted)" }}>Risposta garantita entro <span style={{color:"var(--accent)"}}>24h</span></p>
                  <button type="submit" className="clip-tr" disabled={isSubmitting}
                    style={{ display:"inline-flex",alignItems:"center",gap:".5rem",padding:".9rem 2rem",background:isSubmitting?"#4a9fd4":"var(--accent)",color:"var(--bg)",fontFamily:"'DM Mono',monospace",fontSize:".8rem",letterSpacing:".1em",textTransform:"uppercase",border:"none",transition:"opacity .2s" }}>
                    {isSubmitting ? "Invio..." : "Invia Messaggio →"}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Link alternativi */}
          <div style={{ marginTop:"3rem",display:"flex",justifyContent:"center",gap:"2rem",flexWrap:"wrap" }}>
            {[
              { href:`mailto:${SITE.email}`, label:"Email" },
              { href:SITE.linkedin, label:"LinkedIn" },
              { href:SITE.github, label:"GitHub" },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="font-mono"
                style={{ fontSize:".75rem",color:"var(--muted)",textDecoration:"none",letterSpacing:".1em",textTransform:"uppercase",transition:"color .2s" }}
                onMouseEnter={e=>e.currentTarget.style.color="var(--accent)"}
                onMouseLeave={e=>e.currentTarget.style.color="var(--muted)"}
              >{l.label}</a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ─── FOOTER ────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding:"2.5rem 4rem",borderTop:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem" }}>
      <p className="font-mono" style={{ fontSize:".8rem",color:"var(--muted)",letterSpacing:".15em" }}>ALESSIO LODATO — DEV</p>
      <p className="font-mono" style={{ fontSize:".65rem",color:"var(--muted)",letterSpacing:".1em" }}>
        © {new Date().getFullYear()} — Costruito con <span style={{color:"var(--accent)"}}>Next.js</span> + <span style={{color:"var(--accent)"}}>Tailwind</span>
      </p>
    </footer>
  );
}

// ─── ROOT ──────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLE }} />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Servizi />
        <Lavori />
        <Contatto />
      </main>
      <Footer />
    </>
  );
}