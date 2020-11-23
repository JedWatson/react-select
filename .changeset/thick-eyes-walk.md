---
'react-select': patch
---

Removes the call to `onMenuOpen` on every input change

If you were relying on this undesired behavior it may be a breaking change.
Please upgrade accordingly.
