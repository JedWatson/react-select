import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import cases from 'jest-in-case';

import Creatable from '../Creatable';
import { Option, OPTIONS } from './constants';

interface BasicProps {
  readonly className: string;
  readonly classNamePrefix: string;
  readonly onChange: () => void;
  readonly onInputChange: () => void;
  readonly onMenuClose: () => void;
  readonly onMenuOpen: () => void;
  readonly name: string;
  readonly options: readonly Option[];
}

const BASIC_PROPS: BasicProps = {
  className: 'react-select',
  classNamePrefix: 'react-select',
  onChange: jest.fn(),
  onInputChange: jest.fn(),
  onMenuClose: jest.fn(),
  onMenuOpen: jest.fn(),
  name: 'test-input-name',
  options: OPTIONS,
};

test('defaults - snapshot', () => {
  const { container } = render(<Creatable />);
  expect(container).toMatchSnapshot();
});

interface Props extends Partial<BasicProps> {
  readonly isMulti?: boolean;
}

interface Opts {
  readonly props?: Props;
}

cases<Opts>(
  'filtered option is an exact match for an existing option',
  ({ props }) => {
    props = { ...BASIC_PROPS, ...props };
    const { container, rerender } = render(<Creatable menuIsOpen {...props} />);
    rerender(<Creatable inputValue="one" menuIsOpen {...props} />);
    expect(
      container.querySelector('.react-select__menu')!.textContent
    ).not.toEqual(expect.stringContaining('create'));
  },
  {
    'single select > should not show "create..." prompt"': {},
    'multi select > should not show "create..." prompt"': {
      props: {
        isMulti: true,
        options: OPTIONS,
      },
    },
  }
);

cases<Opts>(
  'filterOptions returns invalid value ( null )',
  ({ props }) => {
    props = { ...BASIC_PROPS, ...props };
    let filterOptionSpy = jest.fn().mockReturnValue(null);

    const { container, rerender } = render(
      <Creatable filterOption={filterOptionSpy} menuIsOpen {...props} />
    );
    rerender(
      <Creatable
        filterOption={filterOptionSpy}
        menuIsOpen
        inputValue="one"
        {...props}
      />
    );

    expect(
      container.querySelector('.react-select__menu-notice--no-options')!
        .textContent
    ).toEqual(expect.stringContaining('No options'));
  },
  {
    'single select > should not show "create..." prompt"': {},
    'multi select > should not show "create..." prompt"': {
      props: {
        isMulti: true,
        options: OPTIONS,
      },
    },
  }
);

cases<Opts>(
  'inputValue does not match any option after filter',
  ({ props }) => {
    props = { ...BASIC_PROPS, ...props };

    const { container, rerender } = render(<Creatable menuIsOpen {...props} />);
    rerender(
      <Creatable menuIsOpen {...props} inputValue="option not is list" />
    );

    expect(container.querySelector('.react-select__menu')!.textContent).toBe(
      'Create "option not is list"'
    );
  },
  {
    'single select > should show a placeholder "create..." prompt': {},
    'multi select > should show a placeholder "create..." prompt': {
      props: {
        isMulti: true,
        options: OPTIONS,
      },
    },
  }
);

cases<Opts>(
  'isValidNewOption() prop',
  ({ props }) => {
    props = { ...BASIC_PROPS, ...props };
    let isValidNewOption = jest.fn((options) => options === 'new Option');

    const { container, rerender } = render(
      <Creatable menuIsOpen isValidNewOption={isValidNewOption} {...props} />
    );

    rerender(
      <Creatable
        menuIsOpen
        isValidNewOption={isValidNewOption}
        {...props}
        inputValue="new Option"
      />
    );

    expect(container.querySelector('.react-select__menu')!.textContent).toEqual(
      'Create "new Option"'
    );

    expect(
      container.querySelector('.react-select__menu-notice--no-options')
    ).toBeFalsy();

    rerender(
      <Creatable
        menuIsOpen
        isValidNewOption={isValidNewOption}
        inputValue="invalid new Option"
        {...props}
      />
    );
    expect(
      container.querySelector('.react-select__menu')!.textContent
    ).not.toEqual('Create "invalid new Option"');

    expect(
      container.querySelector('.react-select__menu-notice--no-options')
    ).toBeTruthy();
  },
  {
    'single select > should show "create..." prompt only if isValidNewOption returns thruthy value':
      {},
    'multi select > should show "create..." prompt only if isValidNewOption returns thruthy value':
      {
        props: {
          isMulti: true,
          options: OPTIONS,
        },
      },
  }
);

cases<Opts>(
  'close by hitting escape with search text present',
  ({ props }) => {
    props = { ...BASIC_PROPS, ...props };
    const { container, rerender } = render(<Creatable menuIsOpen {...props} />);
    rerender(<Creatable menuIsOpen inputValue="new Option" {...props} />);
    fireEvent.keyDown(container, { keyCode: 27, key: 'Escape' });
    expect(container.querySelector('input')!.textContent).toEqual('');
  },
  {
    'single select > should remove the search text': {},
    'multi select > should remove the search text': {
      props: {
        isMulti: true,
        options: OPTIONS,
      },
    },
  }
);

test('should remove the new option after closing on blur', () => {
  const { container, rerender } = render(
    <Creatable menuIsOpen options={OPTIONS} />
  );
  rerender(<Creatable menuIsOpen options={OPTIONS} inputValue="new Option" />);
  fireEvent.blur(container);
  expect(container.querySelector('input')!.textContent).toEqual('');
});

cases<Opts>(
  'getNewOptionData() prop',
  ({ props }) => {
    props = { ...BASIC_PROPS, ...props };
    let getNewOptionDataSpy = jest.fn((label) => ({
      label: `custom text ${label}`,
      value: label,
    }));
    const { container, rerender } = render(
      <Creatable menuIsOpen getNewOptionData={getNewOptionDataSpy} {...props} />
    );
    rerender(
      <Creatable
        menuIsOpen
        getNewOptionData={getNewOptionDataSpy}
        inputValue="new Option"
        {...props}
      />
    );

    expect(container.querySelector('.react-select__menu')!.textContent).toEqual(
      'custom text new Option'
    );
  },
  {
    'single select > should create option as per label returned from getNewOptionData':
      {},
    'multi select > should create option as per label returned from getNewOptionData':
      {
        props: {
          isMulti: true,
          options: OPTIONS,
        },
      },
  }
);

cases<Opts>(
  'formatCreateLabel() prop',
  ({ props = { options: OPTIONS } }) => {
    props = { ...BASIC_PROPS, ...props };
    let formatCreateLabelSpy = jest.fn((label) => `custom label "${label}"`);
    const { container, rerender } = render(
      <Creatable
        menuIsOpen
        formatCreateLabel={formatCreateLabelSpy}
        {...props}
      />
    );

    rerender(
      <Creatable
        menuIsOpen
        formatCreateLabel={formatCreateLabelSpy}
        inputValue="new Option"
        {...props}
      />
    );
    expect(container.querySelector('.react-select__menu')!.textContent).toEqual(
      'custom label "new Option"'
    );
  },
  {
    'single select > should show label of custom option as per text returned from formatCreateLabel':
      {},
    'multi select > should show label of custom option as per text returned from formatCreateLabel':
      {
        props: {
          isMulti: true,
          options: OPTIONS,
        },
      },
  }
);

interface CustomOption {
  readonly key: string;
  readonly title: string;
}

const CUSTOM_OPTIONS: readonly CustomOption[] = [
  { key: 'testa', title: 'Test A' },
  { key: 'testb', title: 'Test B' },
  { key: 'testc', title: 'Test C' },
  { key: 'testd', title: 'Test D' },
];

interface CustomOptsProps extends Partial<Omit<BasicProps, 'options'>> {
  isMulti?: boolean;
  options: readonly CustomOption[];
}

interface CustomOpts {
  props: CustomOptsProps;
}

cases<CustomOpts>(
  'compareOption() method',
  ({ props }) => {
    props = { ...BASIC_PROPS, ...props };

    const getOptionLabel = ({ title }: CustomOption) => title;
    const getOptionValue = ({ key }: CustomOption) => key;

    const { container, rerender } = render(
      <Creatable
        menuIsOpen
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        {...props}
      />
    );

    rerender(
      <Creatable
        menuIsOpen
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        inputValue="testc"
        {...props}
      />
    );
    expect(container.querySelector('.react-select__menu')!.textContent).toEqual(
      'Test C'
    );
  },
  {
    'single select > should handle options with custom structure': {
      props: {
        options: CUSTOM_OPTIONS,
      },
    },
    'multi select > should handle options with custom structure': {
      props: {
        isMulti: true,
        options: CUSTOM_OPTIONS,
      },
    },
  }
);
