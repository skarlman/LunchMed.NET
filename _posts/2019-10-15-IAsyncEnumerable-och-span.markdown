---
layout: post
title:  "IAsyncEnumerable och Span<T>"
date:   2019-10-15 12:05
categories: csharp
tags: c#8
youtubeId: KAuMiTPKhl4
---

I dagens stream klämde och kände vi lite på **IAsyncEnumerable\<T>** från C# 8.0 och **Span\<T>** från C# 7.2 kryddat med lite Tuple deconstruction. Idén är att bygga en snabb, asynkron och minnessnål CSV-parseare(?).

{% include youtubePlayer.html id=page.youtubeId %}

**GitHub**: [https://github.com/skarlman/Lunchmed.Net-CSV-parser](https://github.com/skarlman/Lunchmed.Net-CSV-parser)


## IAsyncEnumerable<T>
```
        private static async IAsyncEnumerable<string> FileRows(string fileName)
        {
            using var reader = new StreamReader(fileName);

            while (!reader.EndOfStream)
            {
                yield return await reader.ReadLineAsync();
            }
        }
```

## await foreach

```
        private static async void FasterFileParser()
        {
            foreach (var file in GetFilenames())
            {
                await foreach (var row in FileRows(file))
                {
                    var (timestamp, value) = ParseRow(row);
                    Console.WriteLine($"{timestamp}: {value}");
                }
            }
        }
```

## Span<T>
```
            var rowSpan = row.AsSpan();

            var separatorIndex = rowSpan.IndexOf(';');
            var timestamp = rowSpan.Slice(0, separatorIndex);

```
