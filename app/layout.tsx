import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import site from "@/content/site.json";

export const metadata: Metadata = {
  title: "Shashank Shekhar | AI-Native Product Engineer",
  description: site.description,
  metadataBase: new URL(site.siteUrl),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Shashank Shekhar | AI-Native Product Engineer",
    description:
      "Portfolio of Shashank Shekhar, an AI-Native Product Engineer building developer tools, AI systems, self-hosted infrastructure, and platforms.",
    url: site.siteUrl,
    siteName: site.name,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Shashank Shekhar | AI-Native Product Engineer",
    description:
      "AI-Native Product Engineer building developer tools, AI systems, and infrastructure."
  }
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  url: site.siteUrl,
  email: site.email,
  sameAs: [site.links.github, site.links.linkedin]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Header />
        <main className="min-h-screen px-6 pb-24 pt-28 sm:px-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
