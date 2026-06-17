"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
    const statementRef = useRef(null);
    const detailRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const el = statementRef.current;

        // Wrap each word for reveal
        const wrapWords = (node) => {
            const children = Array.from(node.childNodes);
            children.forEach((child) => {
                if (child.nodeType === Node.TEXT_NODE) {
                    const words = child.textContent.split(/(\s+)/);
                    const frag = document.createDocumentFragment();
                    words.forEach((w) => {
                        if (w.trim() === "") {
                            frag.appendChild(document.createTextNode(w));
                        } else {
                            const outer = document.createElement("span");
                            outer.className = "word";
                            const inner = document.createElement("span");
                            inner.textContent = w;
                            outer.appendChild(inner);
                            frag.appendChild(outer);
                        }
                    });
                    node.replaceChild(frag, child);
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    // wrap whole element (em / dim span)
                    const outer = document.createElement("span");
                    outer.className = "word";
                    child.parentNode.insertBefore(outer, child);
                    outer.appendChild(child);
                }
            });
        };

        wrapWords(el);

        const spans = el.querySelectorAll(".word > *");
        const anim = gsap.from(spans, {
            scrollTrigger: {
                trigger: el,
                start: "top 75%",
                end: "bottom 60%",
                scrub: 1,
            },
            yPercent: 110,
            opacity: 0.1,
            stagger: 0.04,
            ease: "none",
        });

        const detailAnim = gsap.from(detailRef.current, {
            scrollTrigger: { trigger: detailRef.current, start: "top 85%" },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
        });

        return () => {
            anim.scrollTrigger?.kill();
            detailAnim.scrollTrigger?.kill();
        };
    }, []);

    return (
        <section className="section about" id="chi-sono">
            <div className="section-num-big">01</div>
            <div className="label-row">
                <span className="dot" />
                <span>Chi sono</span>
            </div>
            <p className="about-statement" ref={statementRef}>
                Non costruisco semplicemente siti web. Costruisco{" "}
                <em>strumenti digitali</em> che lavorano per il tuo business,{" "}
                <span className="dim">
                    dalla prima idea fino al lancio e oltre.
                </span>
            </p>
            <div className="about-detail" ref={detailRef}>
                <p>
                    Mi chiamo Alessio Lodato, sono un consulente digitale freelance con
                    base a Roma. Ho vissuto a Londra, ho lavorato con agenzie e clienti
                    diretti, e nel tempo ho capito una cosa: la maggior parte dei
                    business non ha bisogno semplicemente di un sito web. Ha bisogno di
                    uno strumento digitale che lavori per loro.
                </p>
                <div>
                    <p>
                        Seguo ogni progetto dall&apos;inizio alla fine — strategia, design,
                        sviluppo e lancio — perché un&apos;identità digitale funziona solo
                        quando tutte le parti parlano la stessa lingua.
                    </p>
                    <div className="about-tags">
                        <span className="about-tag">Strategia</span>
                        <span className="about-tag">Branding</span>
                        <span className="about-tag">Next.js</span>
                        <span className="about-tag">E-commerce</span>
                        <span className="about-tag">SEO</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
