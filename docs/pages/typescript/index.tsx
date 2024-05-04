import React from 'react';
import Helmet from 'react-helmet';
import md from '../../markdown/renderer';

export default function TypeScript() {
  return (
    <>
      <Helmet>
        <title>TypeScript - React Select</title>
        <meta
          name="description"
          content="React-Select offers a flexible, light-weight styling framework which is a thin abstraction over simple javascript objects"
        />
      </Helmet>
      {md`
# TypeScript usage

## Select generics

There are three generics used by the \`Select\` component: \`Option\`, \`IsMulti\`, and \`Group\`. All of them are optional and TypeScript attempts to detect them automatically, but sometimes it might need some help. Many of the \`react-select\` types include the three generics like this:

~~~jsx
interface SelectProps<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> {
 ...
}
~~~

### \`Option = unknown\`

This is the type of the option passed into the \`options\` prop (or the \`options\` property on groups). If TypeScript can't detect what type this should be, it defaults to \`unknown\`. This generic comes in handy for correctly typing callbacks like \`filterOption\`, \`formatOptionLabel\`, \`getOptionLabel\`, \`getOptionValue\`, \`isOptionDisabled\`, \`isOptionSelected\`, \`onChange\`, etc.

### \`IsMulti extends boolean = false\`

This type is \`false\` for single-selects and is \`true\` for multi-selects. It defaults to \`false\` for the exported components because TypeScript isn't smart enough to figure out that it should be \`false\` if the \`isMulti\` prop is not specified, but on other exported interfaces it defaults to \`boolean\` so that it handles both single-select and multi-select values. This generic is primarily used to determine the type of the first argument passed to \`onChange\` which will be \`Option | null\` if \`IsMulti\` is \`false\` and will be \`readonly Option[]\` if \`IsMulti\` is \`true\`.

### \`Group extends GroupBase<Option> = GroupBase<Option>\`

This generic is the type for the groups that are passed into the \`options\` when using groups. The \`GroupBase\` type is:

~~~jsx
interface GroupBase<Option> {
  readonly options: readonly Option[];
  readonly label?: string;
}
~~~

This generic comes in handy when trying to type the \`formatGroupLabel\` prop.

### Wrapping the \`Select\` component

Oftentimes the \`Select\` component is wrapped in another component that is used throughout an app and the wrapper should be just as flexible as the original \`Select\` component (i.e., allow for different \`Option\` types, groups, single-select, or multi-select). In order to provide this flexibility, the wrapping component should re-declare the generics and forward them to the underlying \`Select\`. Here is an example of how to do that:

~~~jsx
function CustomSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
  return (
    <Select {...props} theme={(theme) => ({ ...theme, borderRadius: 0 })} />
  );
}
~~~

## onChange

If you have a single-select you can type \`onChange\` like this:

~~~jsx
const onChange = (option: Option | null, actionMeta: ActionMeta<Option>) => {
   ...
}
~~~

If you have a multi-select you can type \`onChange\` like this:

~~~jsx
const onChange = (option: readonly Option[], actionMeta: ActionMeta<Option>) => {
   ...
}
~~~

The \`actionMeta\` parameter is optional. \`ActionMeta\` is a union that is discriminated on the \`action\` type. Take a look at [types.ts](https://github.com/JedWatson/react-select/blob/master/packages/react-select/src/types.ts) in the source code to see its full definition.

## Custom Select props

You can use module augmentation to add custom props to the \`Select\` prop types:

~~~jsx
import type {} from 'react-select/base';
// This import is necessary for module augmentation.
// It allows us to extend the 'Props' interface in the 'react-select/base' module
// and add our custom property 'myCustomProp' to it.

declare module 'react-select/base' {
  export interface Props<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
  > {
    myCustomProp: string;
  }
}
~~~

This will make the custom prop available both when using the \`Select\` component as well as when accessing \`selectProps\` when [customising components](./components).
      `}
    </>
  );
}
