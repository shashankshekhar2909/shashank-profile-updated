import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import site from "@/content/site.json";

export const metadata: Metadata = {
  title: {
    default: "Shashank Shekhar | AI-Native Product Engineer",
    template: "%s | Shashank Shekhar"
  },
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
  "@id": `${site.siteUrl}/#person`,
  name: site.name,
  jobTitle: site.title,
  url: site.siteUrl,
  email: site.email,
  sameAs: [site.links.github, site.links.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressCountry: "IN"
  },
  worksFor: {
    "@type": "Organization",
    name: "CrowdAnalytix"
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "BBAU University, Lucknow" },
    { "@type": "CollegeOrUniversity", name: "Amity University, Lucknow" }
  ],
  knowsAbout: [
    "Agentic development",
    "AI agents",
    "Angular",
    "React",
    "Next.js",
    "TypeScript",
    "FastAPI",
    "Typesense",
    "Docker",
    "Self-hosted infrastructure",
    "Retrieval-augmented generation"
  ]
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.siteUrl}/#website`,
  url: site.siteUrl,
  name: "Shashank Shekhar — AI-Native Product Engineer",
  publisher: { "@id": `${site.siteUrl}/#person` }
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify([personJsonLd, websiteJsonLd]) }}
        />
        <Header />
        <main className="min-h-screen px-5 pb-24 pt-24 sm:px-10 sm:pt-28">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
