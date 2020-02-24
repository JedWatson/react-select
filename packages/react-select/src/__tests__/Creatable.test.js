import React from 'react';
import { shallow, mount } from 'enzyme';
import { render } from '@testing-library/react';
import toJson from 'enzyme-to-json';
import cases from 'jest-in-case';

import Creatable from '../Creatable';
import { OPTIONS } from './constants';
import { components } from '../components';
const { Menu, NoOptionsMessage } = components;

const BASIC_PROPS = {
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

cases(
  'filtered option is an exact match for an existing option',
  ({ props }) => {
    props = { ...BASIC_PROPS, ...props };
    const { container, rerender } = render(<Creatable menuIsOpen {...props} />);
    rerender(<Creatable inputValue="one" menuIsOpen {...props} />);
    expect(
      container.querySelector('.react-select__menu').textContent
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

cases(
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
      container.querySelector('.react-select__menu-notice--no-options')
        .textContent
    ).toEqual(expect.stringContaining('No options'));
  },
  {
    'single select > should not show "create..." prompt"': {},
    'multi select > should not show "create..." prompt"': {
      props: {
        isMulti: true,
        option: OPTIONS,
      },
    },
  }
);

cases(
  'inputValue does not match any option after filter',
  ({ props }) => {
    props = { ...BASIC_PROPS, ...props };

    const { container, rerender } = render(<Creatable menuIsOpen {...props} />);
    rerender(
      <Creatable menuIsOpen {...props} inputValue="option not is list" />
    );

    expect(container.querySelector('.react-select__menu').textContent).toBe(
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

cases(
  'isValidNewOption() prop',
  ({ props }) => {
    props = { ...BASIC_PROPS, ...props };
    let isValidNewOption = jest.fn(options => options === 'new Option');

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

    expect(container.querySelector('.react-select__menu').textContent).toEqual(
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
      container.querySelector('.react-select__menu').textContent
    ).not.toEqual('Create "invalid new Option"');

    expect(
      container.querySelector('.react-select__menu-notice--no-options')
    ).toBeTruthy();
  },
  {
    'single select > should show "create..." prompt only if isValidNewOption returns thruthy value': {},
    'multi select > should show "create..." prompt only if isValidNewOption returns thruthy value': {
      props: {
        isMulti: true,
        options: OPTIONS,
      },
    },
  }
);

cases(
  'close by hitting escape with search text present',
  ({ props = { options: OPTIONS } }) => {
    const creatableSelectWrapper = mount(<Creatable menuIsOpen {...props} />);
    creatableSelectWrapper.setState({ inputValue: 'new Option' });
    creatableSelectWrapper.update();
    creatableSelectWrapper.simulate('keyDown', { keyCode: 27, key: 'Escape' });
    creatableSelectWrapper.update();
    expect(creatableSelectWrapper.state('inputValue')).toBe('');
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
  const creatableSelectWrapper = mount(
    <Creatable menuIsOpen options={OPTIONS} />
  );
  creatableSelectWrapper.setState({ inputValue: 'new Option' });
  creatableSelectWrapper.find('Control input').simulate('blur');
  expect(creatableSelectWrapper.state('inputValue')).toBe('');
});

cases(
  'getNewOptionData() prop',
  ({ props = { options: OPTIONS } }) => {
    let getNewOptionDataSpy = jest.fn(label => ({
      label: `custom text ${label}`,
      value: label,
    }));
    const creatableSelectWrapper = mount(
      <Creatable menuIsOpen {...props} getNewOptionData={getNewOptionDataSpy} />
    );
    creatableSelectWrapper.setState({ inputValue: 'new Option' });
    expect(creatableSelectWrapper.find(Menu).text()).toEqual(
      expect.stringContaining('custom text new Option')
    );
  },
  {
    'single select > should create option as per label returned from getNewOptionData': {},
    'multi select > should create option as per label returned from getNewOptionData': {
      props: {
        isMulti: true,
        options: OPTIONS,
      },
    },
  }
);

cases(
  'formatCreateLabel() prop',
  ({ props = { options: OPTIONS } }) => {
    let formatCreateLabelSpy = jest.fn(label => `custom label "${label}"`);
    const creatableSelectWrapper = mount(
      <Creatable
        menuIsOpen
        {...props}
        formatCreateLabel={formatCreateLabelSpy}
      />
    );
    creatableSelectWrapper.setState({ inputValue: 'new Option' });
    expect(creatableSelectWrapper.find(Menu).text()).toEqual(
      expect.stringContaining('custom label "new Option"')
    );
  },
  {
    'single select > should show label of custom option as per text returned from formatCreateLabel': {},
    'multi select > should show label of custom option as per text returned from formatCreateLabel': {
      props: {
        isMulti: true,
        options: OPTIONS,
      },
    },
  }
);
