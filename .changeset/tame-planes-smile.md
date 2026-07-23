---
"react-select": patch
---

Fix menu unexpectedly closing when blur on the input is caused by focus moving to a focusable element inside the menu (e.g. a checkbox in a custom `Option` component), even when `closeMenuOnSelect={false}`. The existing guard only checked `document.activeElement`, which does not reliably reflect the newly focused element inside a synchronous blur handler across browsers; the blur event's `relatedTarget` is now also checked.
