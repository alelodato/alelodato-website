"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero({ ready }) {
    const titleRef = useRef(null);

    useEffect(() => {
        if (!ready) return;
        const tl = gsap.timeline({ delay: 0.3 });

        tl.from(".hero-title .row-inner", {
            yPercent: 120,
            duration: 1.1,
            stagger: 0.09,
            ease: "power4.out",
        })
            .from(
                ".hero-meta-top span",
                { opacity: 0, y: -10, duration: 0.7, stagger: 0.06 },
                "-=0.9"
            )
            .from(".hero-sub", { opacity: 0, y: 20, duration: 0.8 }, "-=0.7")
            .from(".hero-cta-wrap", { opacity: 0, y: 20, duration: 0.8 }, "-=0.7")
            .from("nav", { opacity: 0, duration: 0.6 }, "-=0.6");

        return () => tl.kill();
    }, [ready]);

    return (
        <section className="hero" id="home">
            <div className="hero-meta-top">
                <span>Consulente Digitale</span>
                <span>Strategia · Design · Sviluppo</span>
                <span>Est. Roma</span>
            </div>
            <h1 className="hero-title" ref={titleRef}>
                <span className="row">
                    <span className="row-inner hero-l1">Costruiamo una</span>
                </span>
                <span className="row">
                    <span className="row-inner hero-l2">presenza</span>
                </span>
                <span className="row">
                    <span className="row-inner hero-l3">digitale che</span>
                </span>
                <span className="row">
                    <span className="row-inner hero-l4">lavori per te.</span>
                </span>
            </h1>
            <div className="hero-bottom">
                <p className="hero-sub">
                    Design, sviluppo e strategia. Soluzioni su misura per chi vuole
                    costruire qualcosa che duri.
                </p>
                <div className="hero-cta-wrap">
                    <a href="#contatti" className="hero-btn" data-cursor>
                        <span>Parliamo del tuo progetto</span>
                        <span className="hero-btn-circle">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </span>
                    </a>
                </div>
            </div>
        </section>
    );
}
