import { Component } from 'react';
import { OptionTypeBase } from 'react-select';
import { NoticeProps } from 'react-select/src/components/Menu';

export default class LoadingMessage extends Component<
  NoticeProps<OptionTypeBase, boolean>
> {}
