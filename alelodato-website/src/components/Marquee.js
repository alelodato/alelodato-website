"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ITEMS = [
    "Strategia digitale",
    "Identità visiva",
    "Sviluppo web",
    "E-commerce",
    "SEO & visibilità",
    "Consulenza",
];

export default function Marquee() {
    const trackRef = useRef(null);

    useEffect(() => {
        const anim = gsap.to(trackRef.current, {
            xPercent: -50,
            duration: 30,
            ease: "none",
            repeat: -1,
        });
        return () => anim.kill();
    }, []);

    return (
        <div className="marquee">
            <div className="marquee-track" ref={trackRef}>
                {[...ITEMS, ...ITEMS].map((item, i) => (
                    <div className="marquee-item" key={i}>
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}
