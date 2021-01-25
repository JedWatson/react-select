import { Component, Element, ReactElement } from 'react';

export class CodeBlock extends Component<any> {}

export default function(
  ...templateStrings: (TemplateStringsArray | Element)[]
): ReactElement;
