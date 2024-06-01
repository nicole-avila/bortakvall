# Bortakväll - webbshop

### Kravspecifikation

En enkel webbshop som går mot ett API, där jag hämtar ut produkter som man kan lägga i en varukorg och därefter placera en order (via en POST till en API-endpoint).

När besökaren kommer till sidan ska samtliga produkter visas med bild (tumnagel), namn, pris och en “Lägg till i varukorgen”-knapp.

Besökaren ska kunna lägga till flera exemplar av en produkt i varukorgen, dock går det bra för G-nivå att varje exemplar av en produkt visas som en separata rader i varukorgen.

Man ska även kunna klicka in på en produkt (förslagsvis genom en “Läs mer”-länk) och där se mer information om produkten (stor bild, namn, pris, beskrivning), utan att varukorgen förloras.

Varukorgen ska visas med en sammanställning på sidan som går att fälla ut, där man också ska kunna ta bort en produkt från varukorgen.

I varukorgen ska en “Gå till kassan”-knapp finnas som visar en ny vy där man får fylla i namn, adress, postnr, ort, telefon (ska ej vara required) och e-post.

När man lägger beställningen ska eventuella fel visas, och om beställningen lyckas så ska ordernummer för beställningen visas samt ett tack-meddelande.

Kommunikation med API:et ska vara separerat i en extern fil.

## Hygienkrav

### Nedan hygienkrav ska vara uppfyllda oavsett betygsnivå.

- Vara responsiv (mobile first, minst 3 olika breakpoints)
- Semantiskt korrekt
- Använda TypeScript enligt Best Practises
- Använda reaktivt ramverk

## Available Scripts

### In the project directory, you can run:

**npm install** - to install dependencies
**npm run dev** - to start development server
