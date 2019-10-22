---
layout: post
title:  "Benchmark CleanCode UnitTest"
date:   2019-10-22 12:05
categories: csharp
tags: c#8 stream benchmarking cleancode dependencyinjection nunit
youtubeId: t_bBqe-HmxA
---

Berövade av sömn i väntan på upplösningen ger vi oss i kast med att ta reda på om förra veckans idéer om Span\<T> och IAsyncEnumerable\<T> givit något frukt. Hur står sig vår funktion jämfört med att bara läsa in filen rakt av och köra string.split()?

{% include youtubePlayer.html id=page.youtubeId %}

## BenchmarkDotNET
Vi använder oss av [https://github.com/dotnet/BenchmarkDotNet](Benchmarkdotnet) för att profilera våra metoder.
```
[RPlotExporter, RankColumn, MemoryDiagnoser]
public class ParserBenchmarker
{
    [Benchmark]
    public void SyncSpanParser()
    {
        var result = new FileParser(new SpanRowParser()).ParseFilesSync(@"data");
    }

    [Benchmark]
    public async Task IAsyncEnumerableSpanParser()
    {
        var result = await new FileParser(new SpanRowParser()).ParseFiles(@"data");
    }

    [Benchmark]
    public async Task StringSplitParserAsync()
    {
        var result = await new FileParser(new StringSplitRowParser()).ParseFiles(@"data");
    }

    [Benchmark]
    public void StringSplitParserSync()
    {
        var result = new FileParser(new StringSplitRowParser()).ParseFilesSync(@"data");
    }
}
```

## Resultatet är nervkittlande
(Vem sade att namngivning någonsin var viktigt!?)

```
|                     Method |      Mean |    Error |   StdDev | Rank |      Gen 0 |     Gen 1 |     Gen 2 |   Allocated |
|--------------------------- |----------:|---------:|---------:|-----:|-----------:|----------:|----------:|------------:|
|             SyncSpanParser |  72.22 ms | 1.426 ms | 3.603 ms |    1 |  7000.0000 | 2000.0000 | 1000.0000 | 41919.08 KB |
| IAsyncEnumerableSpanParser | 180.50 ms | 3.466 ms | 4.256 ms |    3 |  9666.6667 | 3333.3333 | 1666.6667 |       14 KB |
|     StringSplitParserAsync | 232.51 ms | 4.539 ms | 7.708 ms |    4 | 16333.3333 | 5333.3333 | 2000.0000 |    18.02 KB |
|      StringSplitParserSync | 132.03 ms | 2.499 ms | 2.216 ms |    2 | 15000.0000 | 5000.0000 | 2000.0000 | 86235.24 KB |
```


## Dependency injection
För att nå dit meckar och donar[tm] vi lite med mikro-varianten av DependencyInjection
```
public class FileParser
{
    private readonly ICsvRowParser _csvRowParser;

    public FileParser(ICsvRowParser csvRowParser)
    {
        _csvRowParser = csvRowParser;
    }
}
```

## Enhetstest
Och vi toppar slutligen av med ett litet sött enhetstest. För att vi kan.
```
public class SpanStringParserTest
{
    public class When_given_proper_csv_row
    {
        [Test]
        public void Then_col_0_is_timestamp_and_col_5_is_value() => 
            Assert.AreEqual(("2019-07-04 06:10:01", "528.193428"), _result);

        [SetUp]
        public void SUTAction()
        {
            _result = SUT.ParseRow(_row);
        }

        private (string, string) _result;

        private string _row = @"2019-07-04 06:10:01;11698.25;11713.35;11705.11;11705.57;528.193428;544.746208;527.96;2019-07-04 05:09:50;502.4428924;502.22";
        private SpanRowParser SUT => new SpanRowParser();
    }
}
```

**GitHub**: [https://github.com/skarlman/Lunchmed.Net-CSV-parser](https://github.com/skarlman/Lunchmed.Net-CSV-parser)


