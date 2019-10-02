---
"react-select": patch
---

Remove usage of `raf` package and replace with `window.requestAnimationFrame` because React already depends on `requestAnimationFrame`
