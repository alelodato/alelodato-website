"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ITEMS = [
    {
        num: "01",
        name: "Un unico referente",
        desc: "Dall'inizio alla fine, senza passaggi di mano.",
        icon: (
            <>
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </>
        ),
    },
    {
        num: "02",
        name: "Soluzioni su misura",
        desc: "Senza template preconfezionati.",
        icon: (
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        ),
    },
    {
        num: "03",
        name: "Comunicazione chiara",
        desc: "Tempi definiti e aggiornamenti costanti.",
        icon: (
            <>
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </>
        ),
    },
    {
        num: "04",
        name: "Supporto continuo",
        desc: "Anche dopo il lancio.",
        icon: (
            <>
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
            </>
        ),
    },
];

export default function Why() {
    const gridRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const anim = gsap.from(".why-item", {
            scrollTrigger: { trigger: gridRef.current, start: "top 82%" },
            y: 40,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
        });
        return () => anim.scrollTrigger?.kill();
    }, []);

    return (
        <section className="why">
            <div className="label-row">
                <span className="dot" />
                <span>Perché lavorare con me</span>
            </div>
            <div className="why-grid" style={{ marginTop: 40 }} ref={gridRef}>
                {ITEMS.map((item) => (
                    <div className="why-item" key={item.num}>
                        <div className="why-num">{item.num}</div>
                        <div className="why-icon">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.2"
                            >
                                {item.icon}
                            </svg>
                        </div>
                        <div className="why-name">{item.name}</div>
                        <div className="why-desc">{item.desc}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
