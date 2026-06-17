"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STEPS = [
    {
        phase: "Fase 01",
        name: "Ascolto",
        desc: "Prima di tutto parliamo. Voglio capire il tuo business, i tuoi obiettivi e il tuo pubblico.",
        icon: (
            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
        ),
    },
    {
        phase: "Fase 02",
        name: "Strategia",
        desc: "Definiamo insieme la direzione: struttura, contenuti, identità visiva e tecnologie.",
        icon: (
            <>
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
            </>
        ),
    },
    {
        phase: "Fase 03",
        name: "Sviluppo",
        desc: "Costruisco tutto con cura, con aggiornamenti continui lungo il percorso.",
        icon: (
            <>
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </>
        ),
    },
    {
        phase: "Fase 04",
        name: "Lancio",
        desc: "Deploy, test e configurazioni tecniche. Mi occupo di tutto.",
        icon: (
            <>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
            </>
        ),
    },
    {
        phase: "Fase 05",
        name: "Dopo il lancio",
        desc: "Non sparisco. Supporto, aggiustamenti ed evoluzione del progetto nel tempo.",
        icon: (
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        ),
    },
];

export default function Process() {
    const stepsRef = useRef(null);
    const headRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const headAnim = gsap.from(headRef.current.children, {
            scrollTrigger: { trigger: headRef.current, start: "top 85%" },
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
        });

        const stepsAnim = gsap.from(".process-step", {
            scrollTrigger: { trigger: stepsRef.current, start: "top 80%" },
            x: -30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
        });

        return () => {
            headAnim.scrollTrigger?.kill();
            stepsAnim.scrollTrigger?.kill();
        };
    }, []);

    return (
        <section className="section" id="come-lavoro">
            <div className="section-num-big">03</div>
            <div className="label-row">
                <span className="dot" />
                <span>Come lavoro</span>
            </div>
            <div ref={headRef}>
                <h2 className="process-head">
                    Un processo <em>chiaro</em>
                </h2>
                <p className="process-intro">
                    Un processo chiaro, senza sorprese. Sai sempre a che punto siamo e
                    cosa succede dopo.
                </p>
            </div>
            <div className="process-steps" ref={stepsRef}>
                {STEPS.map((s) => (
                    <div className="process-step" key={s.phase}>
                        <div className="process-phase">{s.phase}</div>
                        <div className="process-icon">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.2"
                            >
                                {s.icon}
                            </svg>
                        </div>
                        <div className="process-content">
                            <div className="process-name">{s.name}</div>
                            <div className="process-desc">{s.desc}</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
