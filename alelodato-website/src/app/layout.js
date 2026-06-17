import { Cormorant_Garamond, DM_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata = {
  title: "Alessio Lodato — Consulente Digitale",
  description:
    "Consulente digitale freelance con base a Roma. Costruiamo una presenza digitale che lavori per il tuo business: strategia, design, sviluppo web ed e-commerce.",
  keywords: [
    "consulente digitale",
    "web designer Roma",
    "sviluppo web",
    "Next.js",
    "e-commerce",
    "identità visiva",
  ],
  openGraph: {
    title: "Alessio Lodato — Consulente Digitale",
    description:
      "Costruiamo una presenza digitale che lavori per il tuo business.",
    type: "website",
    locale: "it_IT",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="it" className={`${cormorant.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
