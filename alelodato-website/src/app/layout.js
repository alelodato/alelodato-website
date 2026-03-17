import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  title: "Alessio Lodato — Web Developer",
  description: "Costruisco presenze digitali su misura.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}