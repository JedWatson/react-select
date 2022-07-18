import React, { MouseEventHandler, useState } from 'react';
import Select, {
  components,
  ControlProps,
  GroupBase,
  Props,
  StylesConfig,
} from 'react-select';
import { ColourOption, colourOptions } from '../data';

declare module "react-select/dist/declarations/src/Select" {
  export interface Props<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>,
  > {
    emoji: string;
    onEmojiClick: (React.MouseEvent<HTMLElement>) => void;
  }
}

const EMOJIS = ['👍', '🤙', '👏', '👌', '🙌', '✌️', '🖖', '👐'];

const Control = ({ children, ...props }: ControlProps<ColourOption, false>) => {
  const { emoji, onEmojiClick } = props.selectProps;
  const style = { cursor: 'pointer' };

  return (
    <components.Control {...props}>
      <span onMouseDown={onEmojiClick} style={style}>
        {emoji}
      </span>
      {children}
    </components.Control>
  );
};

const CustomSelectProps = (props: Props<ColourOption>) => {
  const [clickCount, setClickCount] = useState(0);

  const onClick: MouseEventHandler<HTMLSpanElement> = (e) => {
    setClickCount(clickCount + 1);
    e.preventDefault();
    e.stopPropagation();
  };

  const styles: StylesConfig<ColourOption, false> = {
    control: (css) => ({ ...css, paddingLeft: '1rem' }),
  };

  const emoji = EMOJIS[clickCount % EMOJIS.length];

  return (
    <Select
      {...props}
      emoji={emoji}
      onEmojiClick={onClick}
      components={{ Control }}
      isSearchable
      name="emoji"
      options={colourOptions}
      styles={styles}
    />
  );
};

export default CustomSelectProps;
