import type { DecoratorFn } from '@storybook/react';
import * as React from 'react';

export const parameters = {
  options: {
    storySort: {
      order: [
        'Select',
        ['BasicSingle', 'BasicMulti', 'AnimatedMulti', 'Grouped', 'Creatable'],
      ],
    },
  },
};

const withSystemFont: DecoratorFn = (Story) => {
  return (
    <div style={{ fontFamily: 'system-ui' }}>
      <Story />
    </div>
  );
};

export const decorators = [withSystemFont];
