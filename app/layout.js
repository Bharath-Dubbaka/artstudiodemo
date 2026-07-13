import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";
import "lenis/dist/lenis.css";
import localFont from 'next/font/local';

// Point directly to where you already dropped them
const neueWorld = localFont({
  src: '../public/fonts/PPNeueWorld-Regular.ttf',
  variable: '--font-neue-world',
});

const neueMontreal = localFont({
  src: '../public/fonts/PPNeueMontreal-Regular.ttf',
  variable: '--font-neue-montreal',
});


const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata = {
  title: "DBK Art Hub",
  description: "Every ending is where the next piece begins.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} ${neueWorld.variable} ${neueMontreal.variable}`}
    >
      <body className="bg-wall text-paper font-body antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
