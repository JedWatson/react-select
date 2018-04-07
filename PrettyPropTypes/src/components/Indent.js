import React, { type Node } from 'react';

export default function Indent(props: { children: Node }) {
  // Experimenting with toggle here, ran into Issues, however this needs to be
  // tackled at some point.
  // Ref measurements were off with nested Toggles, basically
  return (
    // <Toggle
    //   beforeCollapse={(isCollapsed, toggleCollapse) => (
    //     <Button onClick={toggleCollapse}><ChevronDownIcon label="expandIcon"/></Button>
    //   )}
    // >
    <div style={{ paddingLeft: '1.3em' }}>{props.children}</div>
    // </Toggle>
  );
}
