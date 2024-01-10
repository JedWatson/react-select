---
'react-select': patch
---

Select no longer stops the control mouse down event from firing if someone listening to the event calls `.preventDefault()`. This resolves issues seen with react-select interop-ing with other libraries, such as react-beautiful-dnd.
