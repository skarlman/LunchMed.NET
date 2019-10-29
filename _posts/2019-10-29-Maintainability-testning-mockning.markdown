---
layout: post
title:  "Maintainability testning mockning"
date:   2019-10-29 12:05
categories: csharp
tags: c#8 stream cleancode xunit autofixture
youtubeId: 2YJlMMvOzbg
---

Stärkta av framgångarna av vårt första test tar vi raskt och river upp allt för att byta ut NUnit till XUnit. Varför då kan man undra - varför inte säger jag.

{% include youtubePlayer.html id=page.youtubeId %}
[Se även del 2 här](https://youtu.be/xkBAy2ok-Ao)

## Lärdomar
* Vi kan få Visual studio att glömma bort C# (vad betyder void menar du?)
* Vi kan få streamen att tappa anslutningen mitt i
* Namngivning blir om möjligt ännu svårare när man närmar sig en deadline

## Xunit.Net
Ordet på gatan är att XUnit byggdes av bl.a. en av skaparna av NUnit för att ta vara på de lärdomar som dragits genom åren samt att få in lite framsteg som gjorts inom enhetstestning i andra språk. Det skall mer naturligt tvinga in oss i bättre practices helt enkelt - och det vill vi ju inte missa.

## Trassel
Vidare sliter vi isär vår FileParser på både höjden och bredden så den var på tok för ihoptrasslad och förvirrad (vad gör den egentligen?!). Den delas i två - en sync och en async - samt befrias från sitt hårda beroende av filsystemet genom en klädsam FileRetriever-klass som får ansvara för de smutsiga bitarna som berör filsystem.

## Mockning och testdata
Avslutningsvis börjar vi fylla igen hålen i vår test coverage och tar AutoFixture och NSubstitute till hjälp.

```
[Fact]
public async Task When_given_a_path_filenames_are_retrieved()
{
    var someDataFolderPath = _fixture.Create<string>();
    
    var fileRetriever = _fixture.Freeze<IFileRetriever>();
    var SUT = _fixture.Create<AsyncFileParser>();

    await SUT.ParseFiles(someDataFolderPath);

    fileRetriever.Received(1).GetFilenames(someDataFolderPath);
}
       
```

## Status med de större penseldragen
Koden är om möjligt ännu rörigare - men ett steg närmare målet.
Vi eliminerade den största risken (att IAsyncEnumerable\<T> och Span\<T> inte skulle vara värda besväret) tidigt genom att benchmarka en snabb POC. Nu är målet att så snabbt och smidigt som möjligt städa upp koden till något som kan liknas "Produktionskvalitet".

Framöver kommer vi städa upp testerna, öka test coverage så långt det känns rimligt för att avslutningsvis slita isär saker på projektnivå för att jobba lite mot Clean Architecture.


**GitHub**: [https://github.com/skarlman/Lunchmed.Net-CSV-parser](https://github.com/skarlman/Lunchmed.Net-CSV-parser)


