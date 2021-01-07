---
"react-select": patch
---

Added `innerProps` prop to the built-in `MenuList` component to reduce the need for additional DOM nodes or forking internal code when passing additional props to the DOM element the MenuList component is rendering.

See issue [#4265](https://github.com/JedWatson/react-select/issues/4265) for an explanation.
