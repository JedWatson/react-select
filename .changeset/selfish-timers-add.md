---
'react-select': patch
---

Use an internal member to check if control onMouseDown should act and remove logic to bail out from an event if someone else listening to the event (usually in a capture phase) has called preventDefault().

This change was initiated to fix the interop between react-select and react-beautiful-dnd.
But has meaning on its own because it is pretty clear that using the `defaultPrevented` event property for custom logic is a really bad practice.
So, another way to filter when we want to trigger control onMouseDown normal logic has to be better defined and developed.

Nothing to update from the consumers.
