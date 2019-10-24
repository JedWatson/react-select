---
'react-select': patch
---

Memoize stripDiacritics in createFilter for the input with memoize-one so that stripDiacritics is not called for the same string as many times as there are options every time the input changes

Inspired by https://blog.johnnyreilly.com/2019/04/react-select-with-less-typing-lag.html
