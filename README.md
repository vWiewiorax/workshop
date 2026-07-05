# JSWorkshop — strona serwisu BMW (Vite)

Nowoczesna, responsywna strona wizytówka (one-page) dla serwisu BMW **JSWorkshop**
(Łańcut, Rzeszów i okolice). Projekt oparty o **Vite** (vanilla JS + CSS).

## Wymagania
- Node.js 18+ (zalecane 20/22)

## Uruchomienie (localhost)
```bash
npm install
npm run dev
# serwer dev: http://localhost:5173
```

## Build produkcyjny
```bash
npm run build      # generuje katalog dist/
npm run preview    # podgląd builda: http://localhost:4173
```

## Struktura
```
index.html          # punkt wejścia Vite
src/
  main.js           # logika + import stylów
  styles.css        # style
public/
  favicon.svg       # zasoby statyczne serwowane z /
vite.config.js
package.json
```

## Do personalizacji
- Adres, telefon, e-mail i godziny w sekcji `#kontakt` (`index.html`)
- Współrzędne mapy w `<iframe>` (parametry `bbox` i `marker`)
- Treść opinii i statystyk
- Formularz obecnie waliduje dane po stronie klienta — podłącz backend / usługę
  (np. Formspree) do faktycznej wysyłki zgłoszeń.

> BMW jest zastrzeżonym znakiem towarowym BMW AG. JSWorkshop to niezależny serwis.
