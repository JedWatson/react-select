---
'react-select': major
---

Styles now merge with React-Select's styles by default. To avoid merging, add `override: true` to the object. You may also specify an object directly, which is equivalent to a function returning the object.

```js
styles={{
  // merges with React-Select's default styling
  container: () => ({
    padding: '10px',
  }),
  // same as above
  control: {
    padding: '10px',
  },
  // does not merge
  input: () => ({
    padding: '10px',
    override: true,
  }),
  // same as above
  menu: {
    padding: '10px',
    override: true,
  },
}}
```
