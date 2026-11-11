---
'react-select': patch
---

Give the `CreatableProps`, `AsyncProps` and `AsyncCreatableProps` types default generic parameters, matching `StateManagerProps`, so they can be used without spelling out `Option`, `IsMulti` and `Group`
