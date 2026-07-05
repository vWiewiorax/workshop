# JSWorkshop — strona serwisu BMW

Nowoczesna, responsywna strona wizytówka (one-page) dla serwisu BMW **JSWorkshop**
(Łańcut, Rzeszów i okolice). Czysty HTML/CSS/JS, bez zależności i bez procesu budowania.

## Sekcje
- **Hero** z animowanymi licznikami i CTA
- **Usługi** (mechanika, diagnostyka, elektronika, coding/retrofit, klimatyzacja, obsługa okresowa)
- **O nas**
- **Dlaczego my**
- **Opinie** klientów
- **Kontakt** — dane, formularz zgłoszeniowy i mapa (OpenStreetMap)
- Stopka + przycisk szybkiego telefonu (FAB)

## Uruchomienie lokalne
```bash
python3 -m http.server 8080
# następnie otwórz http://localhost:8080
```
Albo po prostu otwórz `index.html` w przeglądarce.

## Struktura
```
index.html
assets/
  styles.css
  script.js
  favicon.svg
```

## Do personalizacji
- Adres, telefon, e-mail i godziny w sekcji `#kontakt` (`index.html`)
- Współrzędne mapy w `<iframe>` (parametry `bbox` i `marker`)
- Treść opinii i statystyk
- Formularz obecnie waliduje dane po stronie klienta — podłącz backend / usługę
  (np. Formspree) do faktycznej wysyłki zgłoszeń.

> BMW jest zastrzeżonym znakiem towarowym BMW AG. JSWorkshop to niezależny serwis.
