---
"react-select": minor
---

Changed the `cx` and `getValue` props that are passed to components into instance properties, which means they now pass a referential equality check on subsequent renders.

This is helpful, for example, when you're optimising the performance of rendering custom Option components - see [#3055](https://github.com/JedWatson/react-select/issues/3055)
