// @flow
import React from 'react';

import { className } from '../utils';
import { Div } from '../primitives';
import { type GetStyles } from '../styles';

type ValueProps = {
  children: string,
  data: any,
  getStyles: GetStyles,
  isDisabled: boolean,
};

const SingleValue = ({ getStyles, ...props }: ValueProps) => {
  const { isDisabled, data, ...cleanProps } = props;
  return (
    <Div
      className={className('singlevalue', { isDisabled })}
      css={getStyles('singleValue', props)}
      {...cleanProps}
    />
  );
};

export default SingleValue;
