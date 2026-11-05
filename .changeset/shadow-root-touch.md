---
'react-select': patch
---

Fix touch selection when the Select is rendered inside a shadow root: `onTouchEnd` now checks the first node of `event.composedPath()` instead of the retargeted `event.target`, so tapping an option no longer closes the menu.
