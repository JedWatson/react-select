// @flow

import React from 'react';
import { Input } from '../primitives';

export default (props: any) => {
  const {
    className,
    id,
    onBlur,
    onChange,
    onFocus,
    readOnly,
    tabIndex,
    value
    } = props;
  
  return (
    <Input
      className={className}
      id={id}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      readOnly={readOnly}
      tabIndex={tabIndex}
      value={value}
      css={{
        // get rid of any default styles
        background: 0,
        border: 0,
        fontSize: 'inherit',
        outline: 0,
        padding: 0,

        // important! without `width` browsers won't allow focus
        width: 1,

        // remove cursor on desktop
        color: 'transparent',

        // remove cursor on mobile whilst maintaining "scroll into view" behaviour
        left: -100,
        opacity: 0,
        position: 'relative',
        transform: 'scale(0)',
      }}
    />
  );
};
