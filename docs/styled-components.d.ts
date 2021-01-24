import { Component, CSSProperties } from 'react';

export class H1 extends Component {}

interface NoteProps {
  Tag: string;
  style?: CSSProperties;
}
export class Note extends Component<NoteProps> {}

interface ColorSampleProps {
  readonly name: string;
  readonly color: string;
}
export class ColorSample extends Component<ColorSampleProps> {}
