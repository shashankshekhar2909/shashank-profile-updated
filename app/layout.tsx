import "./globals.css";
import type { Metadata } from "next";
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
  title: {
    default: `${site.name} | ${site.title}`,
    template: `%s | ${site.name}`
  },
  description: site.description,
  metadataBase: new URL(site.siteUrl),
  openGraph: {
    title: `${site.name} | ${site.title}`,
    description: site.description,
    url: site.siteUrl,
    siteName: site.name,
    type: "website",
    images: ["/og.svg"]
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.title}`,
    description: site.description,
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
        <Header />
        <main className="min-h-screen px-6 pb-24 pt-28 sm:px-10">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: site.name,
              jobTitle: site.title,
              url: site.siteUrl,
              sameAs: [site.links.linkedin, site.links.github].filter(Boolean),
              description: site.description
            })
          }}
        />
      </body>
    </html>
  );
}
