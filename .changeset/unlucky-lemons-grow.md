---
'react-select': major
---

Fixed menu position based on scrollable parent.

WHY the change was made -
Earlier the position of the menu was based on the height of the `window` element which caused the menu to
get truncated when it was near the bottom of the window but was placed inside some other scrollable div.

WHAT the breaking change is -
With this change, the menu's position will be based on the dimensions of its nearest scrollable parent, having
a position other than 'static'. This helps in constraning/shifting the menu height/position so that it fits
inside the parent and not just the window element.