---
'react-select': patch
---

Fix the menu staying open (and `onBlur` never firing on outside clicks) when a parent element moves focus away from the select during `mousedown`.
