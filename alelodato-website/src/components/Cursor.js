"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        let mx = window.innerWidth / 2;
        let my = window.innerHeight / 2;
        let rx = mx;
        let ry = my;

        const onMove = (e) => {
            mx = e.clientX;
            my = e.clientY;
            dot.style.left = mx + "px";
            dot.style.top = my + "px";
        };
        window.addEventListener("mousemove", onMove);

        let raf;
        const loop = () => {
            rx += (mx - rx) * 0.15;
            ry += (my - ry) * 0.15;
            ring.style.left = rx + "px";
            ring.style.top = ry + "px";
            raf = requestAnimationFrame(loop);
        };
        loop();

        const enter = () => {
            ring.style.width = "56px";
            ring.style.height = "56px";
            ring.style.borderColor = "rgba(201,169,110,0.5)";
        };
        const leave = () => {
            ring.style.width = "36px";
            ring.style.height = "36px";
            ring.style.borderColor = "rgba(201,169,110,0.16)";
        };

        const targets = document.querySelectorAll("[data-cursor]");
        targets.forEach((el) => {
            el.addEventListener("mouseenter", enter);
            el.addEventListener("mouseleave", leave);
        });

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("mousemove", onMove);
            targets.forEach((el) => {
                el.removeEventListener("mouseenter", enter);
                el.removeEventListener("mouseleave", leave);
            });
        };
    }, []);

    return (
        <>
            <div className="cursor-dot" ref={dotRef} />
            <div className="cursor-ring" ref={ringRef} />
        </>
    );
}
