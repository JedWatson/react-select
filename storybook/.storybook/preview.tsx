/** @jsx jsx */
import { jsx, Global, css } from '@emotion/react';
import type { DecoratorFn } from '@storybook/react';
import { Fragment } from 'react';

export const parameters = {
  options: {
    storySort: {
      order: [
        'Select',
        ['BasicSingle', 'BasicMulti', 'AnimatedMulti', 'Grouped', 'Creatable'],
      ],
    },
  },
  docs: {
    source: {
      type: 'code',
    },
  },
};

const globalStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
      'Noto Color Emoji';
  }
`;

const withCssReset: DecoratorFn = (Story) => {
  return (
    <Fragment>
      <Global styles={globalStyles} />
      <Story />
    </Fragment>
  );
};

export const decorators = [withCssReset];
