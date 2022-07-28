import { Component } from 'react';
import { GroupBase, NoticeProps } from 'react-select';

export default class NoOptionsMessage<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<NoticeProps<Option, IsMulti, Group>> {}
