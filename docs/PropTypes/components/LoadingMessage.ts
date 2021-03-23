import { Component } from 'react';
import { GroupBase, NoticeProps, OptionBase } from 'react-select';

export default class LoadingMessage<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<NoticeProps<Option, IsMulti, Group>> {}
