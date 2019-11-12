---
layout: post
title:  "Clean architecture"
date:   2019-11-12 12:05
categories: csharp
tags: c#8 stream cleanarchitecture
youtubeId: zQmDgww8-XY
---

Testtäckningen är sedan sist "tillräckligt bra"\[TM] så vi fokuserar nu på att nå i mål med projektet med hjälp av den sista pusselbiten: Clean Architecture

{% include youtubePlayer.html id=page.youtubeId %}

## Lärdomar 
* När filer låses av .Net Core Host måste man slå ihjäl processen för att kunna kompilera igen
* Det går att göra en hel stream utan att Visual Studio hänger sig
* Magkänslan är påtagligt bättre efter det här avsnittet
    
## Clean Architecture

### Före
![Före]({{ site.baseurl }}/images/clean-architecture-before.png "Före"){:.u-max-full-width}

### Efter
![Efter]({{ site.baseurl }}/images/clean-architecture-after.png "efter"){:.u-max-full-width}

'nuff said

## Dependency injection
```
static async Task Main(string[] args)
{
    var serviceProvider = SetupDependencies();

    var fileParser = serviceProvider.GetService<AsyncFileParser>();
    var result = await fileParser.ParseFiles(@"data");

    result.ForEach(r => Console.WriteLine($"{r.timestamp}: {r.csvValue}"));
}

private static IServiceProvider SetupDependencies()
{
    var serviceProvider = new ServiceCollection()
        .AddSingleton<ICsvRowParser, SpanRowParser>()
        .AddSingleton<IFileRetriever, FileRetriever>()
        .AddSingleton<AsyncFileParser>()
        .BuildServiceProvider();
    return serviceProvider;
}
```

Med hjälp av er tittare och [den här sidan](https://andrewlock.net/using-dependency-injection-in-a-net-core-console-application/) fick vi tillslut ihop den sista pusselbiten.

## Slutresultatet
**GitHub**: [https://github.com/skarlman/Lunchmed.Net-CSV-parser](https://github.com/skarlman/Lunchmed.Net-CSV-parser)


