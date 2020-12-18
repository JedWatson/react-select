import React, { useState } from 'react';
import Select, { components } from 'react-select';
import { colourOptions } from '../data';

const EMOJIS = ['👍', '🤙', '👏', '👌', '🙌', '✌️', '🖖', '👐' ];

const Control = ({ children, ...props }) => {
  const { emoji, onEmojiClick } = props.selectProps;
  const style = { cursor: 'pointer' };

  return (
    <components.Control {...props}>
      <span onMouseDown={onEmojiClick} style={style}>{emoji}</span>
      {children}
    </components.Control>
  )
};

const CustomSelectProps = props => {
  const [ clickCount, setClickCount ] = useState(0);

  const onClick = (e) => {
    setClickCount(clickCount+1);
    e.preventDefault();
    e.stopPropagation();
  };

  const styles = {
    control: css => ({ ...css, paddingLeft: '1rem' })
  };

  const emoji = EMOJIS[ clickCount % EMOJIS.length ];
  
  return (
    <Select {...props} 
      emoji={emoji}
      onEmojiClick={onClick}
      components={{ Control }}        
      isSearchable
      name="emoji"
      options={colourOptions}
      styles={styles}
    />
  )
}

export default CustomSelectProps;