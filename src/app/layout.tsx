import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yeenksluxe.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "YEENKSLUXE | Lagos-Born Streetwear", template: "%s | YEENKSLUXE" },
  description: "YEENKSLUXE, also known as Yeenks Wears, is a Lagos-born label for graphic tees, hoodies and caps.",
  keywords: ["YEENKSLUXE", "Yeenks Wears", "Yeenkswears", "Nigerian streetwear", "Lagos fashion", "graphic tees", "streetwear Nigeria"],
  openGraph: {
    title: "YEENKSLUXE | Lagos-Born Streetwear",
    description: "YEENKSLUXE, also known as Yeenks Wears, is a Lagos-born label for graphic tees, hoodies and caps.",
    siteName: "YEENKSLUXE",
    locale: "en_NG",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "YEENKSLUXE campaign" }],
  },
  twitter: { card: "summary_large_image", title: "YEENKSLUXE", description: "YEENKSLUXE, also known as Yeenks Wears, is a Lagos-born label for graphic tees, hoodies and caps.", images: ["/opengraph-image"] },
  alternates: { canonical: "/" },
  verification: { google: "wfBRgnxSmcAvaJwSfvsE4v8O8RdVkXjBms-pXvj_Ta4" },
  icons: {
    icon: [{ url: "/images/yeenksluxe-favicon.png", type: "image/png" }],
    apple: [{ url: "/images/yeenksluxe-favicon.png", type: "image/png" }],
  },
};

export const viewport: Viewport = { themeColor: "#0c0c0b", colorScheme: "dark light", width: "device-width", initialScale: 1 };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NG">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org', '@graph': [
            {
              '@type': 'Organization', name: 'YEENKSLUXE', alternateName: ['Yeenks Wears', 'Yeenkswears'], url: siteUrl,
              logo: `${siteUrl}/images/yeenksluxe-favicon.png`,
              address: { '@type': 'PostalAddress', addressLocality: 'Lagos', addressCountry: 'NG' },
              sameAs: ['https://instagram.com/yeenksluxe', 'https://tiktok.com/@yeenksluxe']
            },
            { '@type': 'WebSite', name: 'YEENKSLUXE', alternateName: 'Yeenks Wears', url: siteUrl }
          ]
        }) }} />
      </body>
    </html>
  );
}
