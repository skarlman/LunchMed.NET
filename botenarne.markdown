---
layout: singlepage
---

# Boten Arne (clippy)
Boten Arne är vår sidekick under livestreamen. 
Hur gick detta till undrar du? [Kolla bloggen](https://lunchmed.net/blog) så får du se!

## Trick
* Lyssna på mikrofonen och agera på vad som sägs
* Ta kommandon ifrån chatten
* Se allmänt snygg ut

## Byggt med onödigt mycket teknik
* .Net core 3.0
* Asp.Net core
* JavaScript
* Docker
* Azure Cognitive Services
* SignalR
* (snart) Machine learning: ML.Net


**Kortfattat kan man säga att det hänger ihop såhär:**
1. Gemet rendreras på skärmen i form av en websida med ett Javascript-lib [Clippy-js](https://www.smore.com/clippy-js)
2. Samtidigt spionerar backend på mikrofonen och skickar vidare till Azure Cognitive Services för att få ut det som sägs i form av text
3. Detta skall matas in i en maskininlärnings-modell som häver ur sig vad gemet skall göra
4. Kommandot skickas via SignalR (websockets) till frontenden som ser till att utföra

Kan någon ha byggt något så onödigt? Beskåda [GitHub](https://github.com/skarlman/Boten-Arne) så får du se!

## AI powered!
Gemrackarn måste givetvis bli autonomt - vad vore ett projekt 2019 utan lite göttig machine learning i mixen?

Gemet befinner sig just nu under träning för att på Julafton 12:05 köras live under streamen. Känn pressen.

## Vi behöver din hjälp!
Du, ja just du kan hjälpa till att träna upp gemet - det är tokenkelt och går tokfort! Kort och gott behövs massvis med träningsdata - det vill säga vilken gem-action som skall köras vid vilken text.

Så det finns en Gem-tränare upplagd där du ser en auto-tolkad textsnutt från ett tidigare avsnitt och helt enkelt trycker på den action som du tycker är roligast (eller ingen action om det är bättre)

**Alltså, gör såhär**:
1. Gå in på [Gem-tränarsidan](https://lunchmed.net/ClippyTrainer)
2. Läs texten, spela upp filmen och grunna noga och hårt
3. Tryck på det gem du tycker blir roligast
4. ...
5. ?
6. ...
7. Profit!

## Lura med dina kompisar!
Detta behöver göras massvis med gånger för att skrapa ihop tillräckligt med data för att kunna göra något vettigt av. Så lura med alla du känner att träna gem. Dela på facebook. Sprid pamfletter för vinden. Ta (gem)träning-selfies på Instagram. Du vet vad du skall göra!

## Kolla sedan resultatet!
Julafton 12:05 på [Twitch](https://twitch.tv/lunchmednet)
(klicka i "Följ" för att inte riskera att missa det)



# #Komigendetblirkul