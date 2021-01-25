import { Component } from 'react';

export type SvgProps = { readonly size: number } & JSX.IntrinsicElements['svg'];

export default class Svg extends Component<SvgProps> {}
