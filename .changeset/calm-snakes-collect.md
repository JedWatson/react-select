---
'react-select': patch
---

No longer send pop-value action when multi-select is empty. This correctly resolves typings with that event, where removedValue cannot be undefined.
