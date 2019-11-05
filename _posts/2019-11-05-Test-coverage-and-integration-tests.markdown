---
layout: post
title:  "Test coverage and integration"
date:   2019-11-05 12:05
categories: csharp
tags: c#8 stream cleancode xunit autofixture
youtubeId: oPmiMwgG6UQ
---

Vi fortsätter fylla i hålen i våran testtäckning och lägger till ett litet fnuttigt integrationstest för att testa hela vägen in på modermodemet - själva hjärtat i hårddisken.

{% include youtubePlayer.html id=page.youtubeId %}

## Lärdomar
* Resharper kraschar fortfarande Visual studio när jag döper om klasser för vilt.
* Jag har inte lärt mig av tidigare misstag.
* Det är bra\[tm] att ha samma mock i SUT:en som man assertar mot.
    

## Test coverage
![Test coverage]({{ site.baseurl }}/images/e4testcoverage.png "Good enough testtäckning"){:.u-max-full-width}

## Integrationstest
```
[Fact]
public async Task WHEN_data_file_exists_THEN_it_is_read_and_parsed_by_some_CsvRowParser()
{
    var testdataRealFilename = $"{Environment.CurrentDirectory}\\testdata-deleteme-{Guid.NewGuid().csv";

    var theFileContents = GetSomeFileContents();

    File.WriteAllText(testdataRealFilename, theFileContents);

    try
    {
        var csvRowParser = _fixture.Freeze<ICsvRowParser>();
        var SUT = new AsyncFileParser(csvRowParser, new FileRetriever());

        await SUT.ParseFiles(Environment.CurrentDirectory);

        theFileContents.Split(Environment.NewLine)
            .Select(r => csvRowParser.Received(1).ParseRow(r)).ToArray();
    }
    finally
    {
        File.Delete(testdataRealFilename);
    }
}
```

## Nästa vecka 
kommer vi förhoppningsvis äntligen fram till Clean Architecture och kan förhoppningsvis lämna den här kodsnutten åt sitt öde.

**GitHub**: [https://github.com/skarlman/Lunchmed.Net-CSV-parser](https://github.com/skarlman/Lunchmed.Net-CSV-parser)


