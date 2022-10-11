---
'react-select': minor
---

      Add package @types/react@16.14.8 to react-select package
      This prevent "@types/react has no exported member 'RefCallback'" error
      as React.RefCallback was defined by DefinitelyTyped/DefinitelyTyped#42482
      and published in @types/react@16.9.23
