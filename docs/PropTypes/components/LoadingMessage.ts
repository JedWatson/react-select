import { Component } from 'react';
import { GroupBase, NoticeProps } from 'react-select';

export default class LoadingMessage<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<NoticeProps<Option, IsMulti, Group>> {}
