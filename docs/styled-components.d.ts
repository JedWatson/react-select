import { Component, CSSProperties } from 'react';

interface NoteProps {
  Tag: string;
  style?: CSSProperties;
}

export class H1 extends Component {}
export class Note extends Component<NoteProps> {}
