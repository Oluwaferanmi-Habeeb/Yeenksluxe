import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "YEENKSLUXE | Lagos-Born Streetwear", template: "%s | YEENKSLUXE" },
  description: "Limited streetwear, graphic tees, hoodies and signature headwear designed in Lagos by YEENKSLUXE.",
  keywords: ["YEENKSLUXE", "Nigerian streetwear", "Lagos fashion", "graphic tees", "streetwear Nigeria"],
  openGraph: {
    title: "YEENKSLUXE | Lagos-Born Streetwear",
    description: "Limited streetwear for people who move with intent.",
    siteName: "YEENKSLUXE",
    locale: "en_NG",
    type: "website",
    images: [{ url: "/images/hero_campaign.png", width: 1024, height: 1024, alt: "YEENKSLUXE SS26 campaign" }],
  },
  twitter: { card: "summary_large_image", title: "YEENKSLUXE", description: "Lagos-born streetwear for people who move with intent.", images: ["/images/hero_campaign.png"] },
};

export const viewport: Viewport = { themeColor: "#0b0b0a", colorScheme: "dark light", width: "device-width", initialScale: 1 };

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
          '@context': 'https://schema.org', '@type': 'Organization', name: 'YEENKSLUXE',
          address: { '@type': 'PostalAddress', addressLocality: 'Lagos', addressCountry: 'NG' },
          sameAs: ['https://instagram.com/yeenksluxe', 'https://tiktok.com/@yeenksluxe']
        }) }} />
      </body>
    </html>
  );
}
