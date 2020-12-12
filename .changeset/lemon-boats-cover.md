---
"react-select": patch
---

Added a guard to the `ScrollCaptor` component to check that `el` exists before calling `removeEventListener`, fixes intermittent errors
