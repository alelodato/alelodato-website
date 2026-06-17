"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SERVICES = [
    {
        idx: "01",
        title: "Strategia digitale",
        sub: "Definiamo obiettivi, posizionamento e direzione prima di progettare qualsiasi soluzione digitale.",
    },
    {
        idx: "02",
        title: "Identità visiva",
        sub: "Logo, palette, tipografia e tono di voce. La base su cui costruire una presenza coerente e riconoscibile.",
    },
    {
        idx: "03",
        title: "Sviluppo web",
        sub: "Siti e applicazioni web su misura, veloci, moderni e facili da gestire.",
    },
    {
        idx: "04",
        title: "E-commerce",
        sub: "Negozi online progettati per vendere, offrire un'esperienza efficace e crescere nel tempo.",
    },
    {
        idx: "05",
        title: "SEO e visibilità",
        sub: "Essere online non basta. Lavoriamo perché le persone giuste possano trovarti.",
    },
    {
        idx: "06",
        title: "Consulenza",
        sub: "Per chi ha già una presenza digitale e vuole migliorarne prestazioni, risultati e opportunità di crescita.",
    },
];

export default function Services() {
    const listRef = useRef(null);
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

        const rowsAnim = gsap.from(".service-row", {
            scrollTrigger: { trigger: listRef.current, start: "top 80%" },
            y: 30,
            opacity: 0,
            duration: 0.7,
            stagger: 0.07,
            ease: "power2.out",
        });

        return () => {
            headAnim.scrollTrigger?.kill();
            rowsAnim.scrollTrigger?.kill();
        };
    }, []);

    return (
        <section className="section" id="cosa-faccio">
            <div className="section-num-big">02</div>
            <div className="label-row">
                <span className="dot" />
                <span>Cosa faccio</span>
            </div>
            <div ref={headRef}>
                <h2 className="services-head">
                    Un servizio <em>completo</em>
                </h2>
                <p className="services-intro">
                    Non offro pacchetti standard. Ogni progetto è diverso, ma quello che
                    faccio rientra sempre in queste aree.
                </p>
            </div>
            <div className="services-list" ref={listRef}>
                {SERVICES.map((s) => (
                    <div className="service-row" data-cursor key={s.idx}>
                        <div className="service-idx">{s.idx}</div>
                        <div className="service-main">
                            <div className="service-title">{s.title}</div>
                            <div className="service-sub">{s.sub}</div>
                        </div>
                        <div className="service-arrow">↗</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
