"use client";

import { useState, useCallback } from "react";
import { useLenis } from "@/hooks/useLenis";
import ShaderBackground from "@/components/ShaderBackground";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import Why from "@/components/Why";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [ready, setReady] = useState(false);
  useLenis();

  const handlePreloaderComplete = useCallback(() => {
    setReady(true);
  }, []);

  return (
    <>
      <ShaderBackground />
      <Cursor />
      <Preloader onComplete={handlePreloaderComplete} />

      <div className="content">
        <Navbar />
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Services />
        <Process />
        <Projects />
        <Why />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
