"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PROJECTS = [
    {
        idx: "01",
        tag: "Brand & Web",
        phrase:
            "Un'agenzia creativa. Un'identità digitale che racconta chi sono prima ancora che parlino.",
        gradient:
            "linear-gradient(155deg, #211c12 0%, #30271a 45%, #0c0a06 100%)",
        svg: (
            <svg
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0.32,
                }}
                viewBox="0 0 420 560"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <linearGradient id="p1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#c9a96e" stopOpacity="0" />
                        <stop offset="50%" stopColor="#e6c891" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#c9a96e" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <line x1="110" y1="-20" x2="360" y2="580" stroke="url(#p1)" strokeWidth="1.3" />
                <line x1="200" y1="-20" x2="450" y2="580" stroke="url(#p1)" strokeWidth="0.6" />
                <line x1="-20" y1="240" x2="450" y2="130" stroke="url(#p1)" strokeWidth="0.6" />
            </svg>
        ),
    },
    {
        idx: "02",
        tag: "Gestionale",
        phrase:
            "Strumenti su misura per chi vuole gestire il proprio business senza dipendere da nessuno.",
        gradient:
            "linear-gradient(155deg, #0e151c 0%, #16232f 45%, #060c12 100%)",
        svg: (
            <svg
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0.28,
                }}
                viewBox="0 0 420 560"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <linearGradient id="p2" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#c9a96e" stopOpacity="0" />
                        <stop offset="50%" stopColor="#e6c891" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#c9a96e" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <rect x="80" y="90" width="260" height="180" fill="none" stroke="url(#p2)" strokeWidth="0.9" />
                <rect x="120" y="130" width="180" height="100" fill="none" stroke="url(#p2)" strokeWidth="0.6" />
                <line x1="80" y1="340" x2="340" y2="340" stroke="url(#p2)" strokeWidth="0.6" />
                <line x1="80" y1="390" x2="290" y2="390" stroke="url(#p2)" strokeWidth="0.4" />
            </svg>
        ),
    },
    {
        idx: "03",
        tag: "E-commerce",
        phrase:
            "Un brand, un negozio, un'esperienza. Online, dall'inizio alla fine.",
        gradient:
            "linear-gradient(155deg, #1a1211 0%, #281917 45%, #0d0807 100%)",
        svg: (
            <svg
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0.28,
                }}
                viewBox="0 0 420 560"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <linearGradient id="p3" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#c9a96e" stopOpacity="0" />
                        <stop offset="50%" stopColor="#e6c891" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#c9a96e" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <circle cx="210" cy="280" r="180" fill="none" stroke="url(#p3)" strokeWidth="0.9" />
                <circle cx="210" cy="280" r="120" fill="none" stroke="url(#p3)" strokeWidth="0.6" />
                <circle cx="210" cy="280" r="60" fill="none" stroke="url(#p3)" strokeWidth="0.4" />
            </svg>
        ),
    },
];

export default function Projects() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        let st;
        const setup = () => {
            if (st) st.kill();
            const scrollAmount = track.scrollWidth - window.innerWidth + 96;
            if (scrollAmount > 0 && window.innerWidth > 980) {
                const tween = gsap.to(track, {
                    x: -scrollAmount,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: () => "+=" + scrollAmount,
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                });
                st = tween.scrollTrigger;
            } else {
                gsap.set(track, { x: 0 });
            }
        };

        setup();
        window.addEventListener("resize", setup);

        return () => {
            if (st) st.kill();
            window.removeEventListener("resize", setup);
        };
    }, []);

    return (
        <section className="projects-section" id="progetti" ref={sectionRef}>
            <div className="projects-head-wrap">
                <div>
                    <div className="label-row">
                        <span className="dot" />
                        <span>Progetti</span>
                    </div>
                    <h2 className="projects-head">
                        Lavori <em>selezionati</em>
                    </h2>
                </div>
                <div className="projects-count">[ 03 ]</div>
            </div>
            <div className="h-track" ref={trackRef}>
                {PROJECTS.map((p) => (
                    <div className="project-card" key={p.idx}>
                        <div className="project-visual">
                            <div
                                className="project-visual-inner"
                                style={{ background: p.gradient }}
                            >
                                {p.svg}
                            </div>
                            <div className="project-overlay">
                                <span className="project-idx-big">{p.idx}</span>
                            </div>
                        </div>
                        <div className="project-info">
                            <div className="project-tag">{p.tag}</div>
                            <div className="project-phrase">{`"${p.phrase}"`}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="h-hint">
                <span>Trascina o scrolla</span>
                <div className="h-hint-line" />
                <span>←→</span>
            </div>
        </section>
    );
}
