// @flow
import React, { useState } from 'react';

import Select from 'react-select';
import { colourOptions } from '../data';

export default function CustomAriaLive() {
  const [ariaFocusMessage, setAriaFocusMessage] = useState('');

  const style = {
    blockquote: {
      fontStyle: 'italic',
      fontSize: '.75rem',
      margin: '1rem 0',
    },
    label: {
      fontSize: '.75rem',
      fontWeight: 'bold',
      lineHeight: 2,
    },
  };

  const focusOption = ({ focusedOption, getOptionLabel }) => {
    const msg = `custom aria option focus message: 
      ${getOptionLabel(focusedOption)}`;
    setAriaFocusMessage(msg);
    return msg;
  };

  return (
    <form>
      <label style={style.label} id="aria-label" htmlFor="aria-example-input">
        Select a color
      </label>

      <Select
        aria-labelledby="aria-label"
        ariaLiveMessages={{
          focusOption,
        }}
        inputId="aria-example-input"
        name="aria-live-color"
        options={colourOptions}
      />

      {!!ariaFocusMessage && (
        <blockquote style={style.blockquote}>"{ariaFocusMessage}"</blockquote>
      )}
    </form>
  );
}
