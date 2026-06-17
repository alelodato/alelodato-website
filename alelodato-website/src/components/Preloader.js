"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Preloader({ onComplete }) {
    const rootRef = useRef(null);
    const counterRef = useRef(null);
    const barRef = useRef(null);

    useEffect(() => {
        const prog = { v: 0 };
        const tl = gsap.timeline();

        tl.to(barRef.current, { scaleX: 1, duration: 1.6, ease: "power2.inOut" }, 0)
            .to(
                prog,
                {
                    v: 100,
                    duration: 1.6,
                    ease: "power2.inOut",
                    onUpdate: () => {
                        if (counterRef.current)
                            counterRef.current.textContent = Math.round(prog.v);
                    },
                },
                0
            )
            .to(rootRef.current, {
                yPercent: -100,
                duration: 0.9,
                ease: "power3.inOut",
                onStart: () => {
                    if (onComplete) onComplete();
                },
            }, "+=0.15");

        return () => tl.kill();
    }, [onComplete]);

    return (
        <div className="preloader" ref={rootRef}>
            <div className="preloader-counter" ref={counterRef}>
                0
            </div>
            <div className="preloader-bar">
                <div className="preloader-bar-fill" ref={barRef} />
            </div>
            <div className="preloader-label">Alessio Lodato — Roma</div>
        </div>
    );
}
