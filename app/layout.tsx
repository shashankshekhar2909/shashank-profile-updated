import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Space_Grotesk, Instrument_Serif } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import site from "@/content/site.json";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Shashank Shekhar | Senior Frontend Developer & AI-Integrated Product Engineer",
  description: site.description,
  metadataBase: new URL(site.siteUrl),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Shashank Shekhar | Senior Frontend Developer & AI-Integrated Product Engineer",
    description:
      "Portfolio of Shashank Shekhar, a Senior Frontend Developer building Angular, React, Next.js, FastAPI, Typesense, Docker, and AI-integrated product systems.",
    url: site.siteUrl,
    siteName: site.name,
    type: "website",
    images: ["/og.svg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Shashank Shekhar | Senior Frontend Developer & AI-Integrated Product Engineer",
    description:
      "Senior Frontend Developer and AI-Integrated Product Engineer building scalable frontend, search, automation, and AI-native systems.",
    images: ["/og.svg"]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${instrumentSerif.variable}`}>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BCQQMMTVM2"
          strategy="afterInteractive"
        />
        <Script id="ga-setup" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-BCQQMMTVM2');`}
        </Script>
        <Header />
        <main className="min-h-screen px-6 pb-24 pt-28 sm:px-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
