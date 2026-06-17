"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Contact() {
    const headRef = useRef(null);
    const gridRef = useRef(null);

    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState(null); // null | "loading" | "success" | "error"

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const headAnim = gsap.from(headRef.current, {
            scrollTrigger: { trigger: headRef.current, start: "top 85%" },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
        });

        const gridAnim = gsap.from(gridRef.current.children, {
            scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
        });

        return () => {
            headAnim.scrollTrigger?.kill();
            gridAnim.scrollTrigger?.kill();
        };
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.name || !form.email || !form.message) {
            setStatus("error");
            return;
        }
        setStatus("loading");

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
                    name: form.name,
                    email: form.email,
                    message: form.message,
                    subject: "Nuovo messaggio dal sito — Alessio Lodato",
                }),
            });

            const data = await res.json();

            if (data.success) {
                setStatus("success");
                setForm({ name: "", email: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch (err) {
            setStatus("error");
        }
    };

    return (
        <section className="contact" id="contatti">
            <h2 className="contact-big" ref={headRef}>
                Hai un&apos;idea?<em>Parliamone.</em>
            </h2>
            <div className="contact-grid" ref={gridRef}>
                <div>
                    <p className="contact-sub">
                        Hai un&apos;idea in testa ma non sai da dove iniziare? Scrivimi. La
                        prima conversazione non costa nulla.
                    </p>
                    <div className="contact-email-block">
                        <div className="contact-email-label">
                            Oppure scrivimi direttamente
                        </div>
                        <div className="contact-email-value">ciao@alessiolodato.it</div>
                    </div>
                </div>
                <div>
                    <div className="form-row">
                        <div className="form-field">
                            <input
                                type="text"
                                name="name"
                                placeholder="Nome"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-field">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-field">
                        <textarea
                            name="message"
                            placeholder="Raccontami del tuo progetto"
                            value={form.message}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        className="form-submit"
                        onClick={handleSubmit}
                        disabled={status === "loading"}
                        data-cursor
                    >
                        <span>
                            {status === "loading" ? "Invio in corso..." : "Invia messaggio"}
                        </span>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        >
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </button>

                    {status === "success" && (
                        <div className="form-status success">
                            Messaggio inviato. Ti risponderò il prima possibile.
                        </div>
                    )}
                    {status === "error" && (
                        <div className="form-status error">
                            Qualcosa è andato storto. Controlla i campi e riprova, oppure
                            scrivimi via email.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
