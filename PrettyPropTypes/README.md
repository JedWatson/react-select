# PrettyPropTypes - a name in progress (pls better name thanks)

PrettyPropTypes is designed as the react display tool for [extract-react-types](https://www.npmjs.com/package/extract-react-types). It is
designed to read the output from `extract-react-types`, and display rich prop
information for consumers.

Core usage pattern:

```js
<Props
  heading="My Cool Component"
  props={require('!!extract-react-types-loader!../MyCoolComponent')}
/>
```

This analyses prop type definitions, and default props. It creates descriptions
from comments before the type definitions, and will render markdown syntax using [react-markings](https://www.npmjs.com/package/react-markings).

## Quick Tips

- Using [extract-react-types-loader](https://www.npmjs.com/package/extract-react-types-loader)
is definitely the easiest way to get this information from your components, however
you can prebuild this data with extract-react-types and read it from a file if
you prefer.
- When using `extract-react-types`, it currently looks only at the default export
of a file, with the assumption that it is a react class component.

## Cusomisation Props

### Heading

Display a heading for the collection of props. Pass in an empty string if you want
no heading, otherwise it defaults to "Props".

### shouldCollapseProps

Set whether the prop shapes should be shown by default, or whether they should
be hidden, and require being expanded.

### Components

Accepts an object that allows you to override particular style components within
our prop definition. The currently modifiable components are:

- Indent
- Outline
- Required
- Type
- StringType
- TypeMeta

Any that are not passed in will use the default component.

## Overrides

The `override` prop allows you to override a specific prop's definition. If you
want to keep the appearance aligned, we recommend using the `Prop` export from
PrettyPropType.

An override is invoked with all the props passed to the Prop component internally,
and renders the result. In the example below, we are changing the `type` field,
and stopping the shape component from appearing, while leaving other parts of the
component the same.

```js
import Props, { Prop } from 'pretty-proptypes'

${<Props
  heading=""
  props={require('!!extract-react-types-loader!../../PropTypes/Select')}
  overrides={{
    components: (props) => <Prop {...props} shapeComponent={() => null} type="All Components Object" /> }}
/>}
```

While you can pass style `components` directly to `Prop`, we recommend passing
style components in the top level Props, and letting them flow down.
