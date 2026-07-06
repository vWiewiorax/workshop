# WorkshopJS — strona serwisu BMW (Next.js)

Nowoczesna, responsywna strona wizytówka (one-page) dla serwisu BMW **WorkshopJS**
(Łańcut, Rzeszów i okolice). Projekt oparty o **Next.js** (App Router, React).

## Wymagania
- Node.js 18.18+ (zalecane 20/22)

## Konfiguracja (e-mail formularza)
Formularz wysyła zgłoszenia przez [FormSubmit](https://formsubmit.co) (bez backendu).
Skopiuj `.env.example` jako `.env.local` i ustaw adres:
```bash
NEXT_PUBLIC_FORMSUBMIT_EMAIL=twoj@email.pl
```
Przy pierwszym wysłaniu FormSubmit przyśle na ten adres jednorazowy link aktywacyjny — trzeba go raz kliknąć.

## Uruchomienie (localhost)
```bash
npm install
npm run dev
# serwer dev: http://localhost:3000
```

## Build produkcyjny
```bash
npm run build      # produkcyjny build (.next/)
npm start          # serwer produkcyjny: http://localhost:3000
```

## Struktura
```
app/
  layout.js         # metadane/SEO (Metadata API), JSON-LD, fonty, globalne style
  page.js           # komponent strony (React, "use client") + logika UI
  globals.css       # style
public/
  images/           # zdjęcia
  favicon*.png/.ico # ikony
  og-image.jpg      # obrazek Open Graph
  robots.txt, sitemap.xml
next.config.mjs
package.json
```

## SEO
- Metadane, Open Graph, Twitter Card i tagi geo w `app/layout.js` (Next Metadata API)
- Dane strukturalne JSON-LD (`schema.org/AutoRepair`) w `app/layout.js`
- `public/robots.txt` + `public/sitemap.xml`
- Linki kanoniczne/OG/sitemap wskazują na `https://workshopjs.pl/` — zmień na docelową domenę w razie potrzeby.

## Do personalizacji
- Adres, telefon i godziny w sekcji `#kontakt` (`app/page.js`)
- Współrzędne mapy w `<iframe>` (parametry `bbox` i `marker`)
- Treść usług i opinii (tablice `services`, `gallery`, `quotes` w `app/page.js`)

> BMW jest zastrzeżonym znakiem towarowym BMW AG. WorkshopJS to niezależny serwis.
