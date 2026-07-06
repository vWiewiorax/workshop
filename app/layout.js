import "./globals.css";

const SITE_URL = "https://workshopjs.pl";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "WorkshopJS — Serwis BMW Łańcut, Rzeszów | Niezależny mechanik BMW",
  description:
    "WorkshopJS — niezależny serwis BMW (i nie tylko) w Łańcucie, obsługujący Rzeszów i okolice. Swapy silników, wymiana panewek, rozrządu, serwis okresowy, auta powypadkowe i diagnostyka komputerowa. 13 lat doświadczenia.",
  keywords: [
    "serwis BMW Łańcut",
    "mechanik BMW Rzeszów",
    "swap silnika BMW",
    "wymiana panewek BMW",
    "wymiana rozrządu",
    "diagnostyka komputerowa BMW",
    "auta powypadkowe",
    "serwis okresowy",
    "warsztat BMW podkarpackie",
  ],
  authors: [{ name: "WorkshopJS" }],
  robots: { index: true, follow: true, "max-image-preview": "large" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "WorkshopJS",
    locale: "pl_PL",
    title: "WorkshopJS — Serwis BMW Łańcut, Rzeszów",
    description:
      "Niezależny serwis BMW w Łańcucie — swapy silników, wymiana panewek i rozrządu, serwis okresowy, diagnostyka i auta powypadkowe. 13 lat doświadczenia.",
    url: SITE_URL,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WorkshopJS — niezależny serwis BMW w Łańcucie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WorkshopJS — Serwis BMW Łańcut, Rzeszów",
    description:
      "Niezależny serwis BMW w Łańcucie — swapy silników, wymiana panewek i rozrządu, serwis okresowy, diagnostyka i auta powypadkowe.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: "/favicon-180.png",
  },
  other: {
    "geo.region": "PL-18",
    "geo.placename": "Łańcut",
    "geo.position": "50.0700595;22.2063847",
    ICBM: "50.0700595, 22.2063847",
  },
};

export const viewport = {
  themeColor: "#0a0a0a",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: "WorkshopJS",
  description:
    "Niezależny serwis BMW (i nie tylko) w Łańcucie — swapy silników, wymiana panewek i rozrządu, serwis okresowy, diagnostyka komputerowa i naprawa aut powypadkowych.",
  url: SITE_URL + "/",
  image: SITE_URL + "/og-image.jpg",
  logo: SITE_URL + "/favicon-512.png",
  telephone: "+48793980808",
  priceRange: "$$",
  currenciesAccepted: "PLN",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kraszewskiego 219",
    postalCode: "37-100",
    addressLocality: "Łańcut",
    addressRegion: "podkarpackie",
    addressCountry: "PL",
  },
  geo: { "@type": "GeoCoordinates", latitude: 50.0700595, longitude: 22.2063847 },
  areaServed: [
    { "@type": "City", name: "Łańcut" },
    { "@type": "City", name: "Rzeszów" },
    { "@type": "AdministrativeArea", name: "Podkarpackie" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:30",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "13:00",
    },
  ],
  makesOffer: {
    "@type": "OfferCatalog",
    name: "Usługi serwisowe BMW",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Swapy silników" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Naprawa aut powypadkowych" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wymiana panewek" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Serwis okresowy" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wymiana rozrządu" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Diagnostyka komputerowa i naprawy" } },
    ],
  },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5", reviewCount: "6" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
