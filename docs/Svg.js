// @flow
/** @jsx jsx */
import { jsx } from '@emotion/core';

const Svg = ({ size, ...props }: { size: number }) => (
  <svg
    focusable="false"
    height={size}
    role="image"
    viewBox="0 0 20 20"
    width={size}
    css={{
      display: 'inline-block',
      fill: 'currentColor',
      flexShrink: 0,
      lineHeight: 1,
      stroke: 'currentColor',
      strokeWidth: 0,
    }}
    {...props}
  />
);

export default Svg;
