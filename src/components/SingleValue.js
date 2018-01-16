// @flow
import React from 'react';
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
  return <Div css={getStyles('singleValue', props)} {...cleanProps} />;
};

export default SingleValue;
