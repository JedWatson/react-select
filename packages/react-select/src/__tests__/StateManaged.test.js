import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import cases from 'jest-in-case';

import { OPTIONS } from './constants';
import Select from '../';

function openMenu(container) {
  expect(
    container.querySelector('.react-select__menu')
  ).not.toBeInTheDocument();

  toggleMenuOpen(container);

  expect(container.querySelector('.react-select__menu')).toBeInTheDocument();
}

function toggleMenuOpen(container) {
  fireEvent.mouseDown(
    container.querySelector('.react-select__dropdown-indicator'),
    { button: 0 }
  );
}

function closeMenu(container) {
  expect(container.querySelector('.react-select__menu')).toBeInTheDocument();
  toggleMenuOpen(container);
  expect(
    container.querySelector('.react-select__menu')
  ).not.toBeInTheDocument();
}

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

test('defaults > snapshot', () => {
  const { container } = render(<Select />);
  expect(container).toMatchSnapshot();
});

test('passes down the className prop', () => {
  const { container } = render(<Select {...BASIC_PROPS} />);
  expect(container.querySelector('.react-select')).toBeTruthy();
});

cases(
  'click on dropdown indicator',
  ({ props }) => {
    let { container } = render(<Select {...props} />);
    // Menu not open by defualt
    expect(
      container.querySelector('.react-select__menu')
    ).not.toBeInTheDocument();
    openMenu(container);
    closeMenu(container);
  },
  {
    'single select > should toggle Menu': { props: BASIC_PROPS },
    'multi select > should toggle Menu': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
      },
    },
  }
);

test('If menuIsOpen prop is passed Menu should not close on clicking Dropdown Indicator', () => {
  const { container } = render(<Select menuIsOpen {...BASIC_PROPS} />);
  expect(container.querySelector('.react-select__menu')).toBeTruthy();

  toggleMenuOpen(container);
  expect(container.querySelector('.react-select__menu')).toBeTruthy();
});

test('defaultMenuIsOpen prop > should open by menu default and clicking on Dropdown Indicator should toggle menu', () => {
  const { container } = render(<Select defaultMenuIsOpen {...BASIC_PROPS} />);
  expect(container.querySelector('.react-select__menu')).toBeTruthy();

  toggleMenuOpen(container);
  expect(container.querySelector('.react-select__menu')).toBeFalsy();
});

test('Menu is controllable by menuIsOpen prop', () => {
  const menuClass = `.${BASIC_PROPS.classNamePrefix}__menu`;
  const { container, rerender } = render(<Select {...BASIC_PROPS} />);
  expect(container.querySelector(menuClass)).toBeFalsy();

  rerender(<Select menuIsOpen {...BASIC_PROPS} />);
  expect(container.querySelector(menuClass)).toBeTruthy();

  rerender(<Select menuIsOpen={false} {...BASIC_PROPS} />);
  expect(container.querySelector(menuClass)).toBeFalsy();
});

cases(
  'Menu to open by default if menuIsOpen prop is true',
  ({ props }) => {
    props = { ...BASIC_PROPS, ...props, menuIsOpen: true };
    const menuClass = `.${BASIC_PROPS.classNamePrefix}__menu`;
    const { container } = render(<Select {...props} />);
    expect(container.querySelector(menuClass)).toBeTruthy();

    userEvent.click(
      container.querySelector('div.react-select__dropdown-indicator')
    );

    expect(container.querySelector(menuClass)).toBeTruthy();
  },
  {
    'single select > should keep Menu open by default if true is passed for menuIsOpen prop': {},
    'multi select > should keep Menu open by default if true is passed for menuIsOpen prop': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
        menuIsOpen: true,
      },
    },
  }
);

test('multi select > selecting multiple values', () => {
  let { container } = render(<Select {...BASIC_PROPS} isMulti />);
  openMenu(container);
  fireEvent.keyDown(container.querySelector('.react-select__menu'), {
    keyCode: 13,
    key: 'Enter',
  });
  expect(container.querySelector('.react-select__control').textContent).toBe(
    '0'
  );

  openMenu(container);
  fireEvent.keyDown(container.querySelector('.react-select__menu'), {
    keyCode: 13,
    key: 'Enter',
  });
  expect(container.querySelector('.react-select__control').textContent).toBe(
    '01'
  );
});

test('defaultInputValue prop > should update the inputValue on change of input if defaultInputValue prop is provided', () => {
  const props = { ...BASIC_PROPS, defaultInputValue: '0' };
  let { container } = render(<Select {...props} />);
  let input = container.querySelector('.react-select__control input');

  expect(input.value).toBe('0');
  userEvent.type(input, 'A');
  expect(input.value).toBe('0A');
});

test('inputValue prop > should not update the inputValue when on change of input if inputValue prop is provided', () => {
  const props = { ...BASIC_PROPS, inputValue: '0' };
  let { container } = render(<Select {...props} />);
  let input = container.querySelector('.react-select__control input');
  expect(input.value).toBe('0');
  userEvent.type(input, 'A');
  expect(input.value).toBe('0');
});

test('defaultValue prop > should update the value on selecting option', () => {
  const props = { ...BASIC_PROPS, defaultValue: [OPTIONS[0]] };
  let { container } = render(<Select {...props} menuIsOpen />);
  expect(container.querySelector('input[type="hidden"]').value).toBe('zero');
  userEvent.click(container.querySelectorAll('div.react-select__option')[1]);
  expect(container.querySelector('input[type="hidden"]').value).toBe('one');
});

test('value prop > should not update the value on selecting option', () => {
  const props = { ...BASIC_PROPS, value: [OPTIONS[0]] };
  let { container } = render(<Select {...props} menuIsOpen />);
  expect(container.querySelector('input[type="hidden"]').value).toBe('zero');
  userEvent.click(container.querySelectorAll('div.react-select__option')[1]);
  expect(container.querySelector('input[type="hidden"]').value).toBe('zero');
});

cases(
  'Integration tests > selecting an option > mouse interaction',
  ({
    props = { ...BASIC_PROPS },
    event: [eventName, eventArgs],
    selectOption,
    expectSelectedOption,
  }) => {
    let { container, getByText } = render(<Select {...props} />);
    let toSelectOption = getByText(selectOption.label);
    fireEvent[eventName](toSelectOption, eventArgs);
    expect(container.querySelector('input[type="hidden"]').value).toBe(
      expectSelectedOption
    );
  },
  {
    'single select > clicking on an option > should select the clicked option': {
      props: {
        ...BASIC_PROPS,
        menuIsOpen: true,
      },
      event: ['click', { button: 0 }],
      selectOption: OPTIONS[2],
      expectSelectedOption: 'two',
    },
    'multi select > clicking on an option > should select the clicked option': {
      props: {
        ...BASIC_PROPS,
        delimiter: ', ',
        isMulti: true,
        menuIsOpen: true,
      },
      event: ['click', { button: 0 }],
      selectOption: OPTIONS[2],
      expectSelectedOption: 'two',
    },
  }
);

cases(
  'Integration tests > selection an option > keyboard interaction',
  ({
    props = { ...BASIC_PROPS },
    eventsToSimulate,
    expectedSelectedOption,
  }) => {
    let { container } = render(<Select {...props} />);
    openMenu(container);
    eventsToSimulate.map(([eventName, eventArgs]) => {
      fireEvent[eventName](
        container.querySelector('.react-select__menu'),
        eventArgs
      );
    });
    fireEvent.keyDown(container.querySelector('.react-select__menu'), {
      keyCode: 13,
      key: 'Enter',
    });
    expect(container.querySelector('input[type="hidden"]').value).toBe(
      expectedSelectedOption
    );
  },
  {
    'single select > open select and hit enter > should select first option': {
      eventsToSimulate: [],
      expectedSelectedOption: OPTIONS[0].value,
    },
    'single select > (open select -> 3 x ArrowDown -> Enter) > should select the forth option in the select': {
      eventsToSimulate: [
        ['keyDown', { keyCode: 40, key: 'ArrowDown' }],
        ['keyDown', { keyCode: 40, key: 'ArrowDown' }],
        ['keyDown', { keyCode: 40, key: 'ArrowDown' }],
      ],
      expectedSelectedOption: OPTIONS[3].value,
    },
    'single select > (open select -> 2 x ArrowDown -> 2 x ArrowUp -> Enter) > should select the first option in the select': {
      eventsToSimulate: [
        ['keyDown', { keyCode: 40, key: 'ArrowDown' }],
        ['keyDown', { keyCode: 40, key: 'ArrowDown' }],
        ['keyDown', { keyCode: 38, key: 'ArrowUp' }],
        ['keyDown', { keyCode: 38, key: 'ArrowUp' }],
      ],
      expectedSelectedOption: OPTIONS[0].value,
    },
    'single select > (open select -> 1 x ArrowUp -> Enter) > should select the last option in the select': {
      eventsToSimulate: [['keyDown', { keyCode: 38, key: 'ArrowUp' }]],
      expectedSelectedOption: OPTIONS[OPTIONS.length - 1].value,
    },
    'single select > (open select -> 1 x PageDown -> Enter) > should select the first option on next page - default pageSize 5': {
      eventsToSimulate: [['keyDown', { keyCode: 34, key: 'PageDown' }]],
      expectedSelectedOption: OPTIONS[5].value,
    },
    'single select > (open select -> 1 x PageDown -> 1 x ArrowDown -> 1 x PageUp -> Enter) > should select the second option - default pageSize 5': {
      eventsToSimulate: [
        ['keyDown', { keyCode: 34, key: 'PageDown' }],
        ['keyDown', { keyCode: 40, key: 'ArrowDown' }],
        ['keyDown', { keyCode: 33, key: 'PageUp' }],
      ],
      expectedSelectedOption: OPTIONS[1].value,
    },
    'single select > (open select -> End -> Enter) > should select the last option': {
      eventsToSimulate: [['keyDown', { keyCode: 35, key: 'End' }]],
      expectedSelectedOption: OPTIONS[OPTIONS.length - 1].value,
    },
    'single select > (open select -> 3 x PageDown -> Home -> Enter) > should select the last option': {
      eventsToSimulate: [
        ['keyDown', { keyCode: 34, key: 'PageDown' }],
        ['keyDown', { keyCode: 34, key: 'PageDown' }],
        ['keyDown', { keyCode: 34, key: 'PageDown' }],
        ['keyDown', { keyCode: 36, key: 'Home' }],
      ],
      expectedSelectedOption: OPTIONS[0].value,
    },
    'single select > cycle options > ( open select -> End -> ArrowDown -> Enter) > should select the first option': {
      eventsToSimulate: [
        ['keyDown', { keyCode: 35, key: 'End' }],
        ['keyDown', { keyCode: 40, key: 'ArrowDown' }],
      ],
      expectedSelectedOption: OPTIONS[0].value,
    },
    'single select > cycle options > (open select -> ArrowUp -> Enter) > should select the last option': {
      eventsToSimulate: [['keyDown', { keyCode: 38, key: 'ArrowUp' }]],
      expectedSelectedOption: OPTIONS[OPTIONS.length - 1].value,
    },
    'multi select > open select and hit enter > should select first option': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
      },
      eventsToSimulate: [],
      expectedSelectedOption: OPTIONS[0].value,
    },
    'multi select > (open select -> 3 x ArrowDown -> Enter) > should select the forth option in the select': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
      },
      eventsToSimulate: [
        ['keyDown', { keyCode: 40, key: 'ArrowDown' }],
        ['keyDown', { keyCode: 40, key: 'ArrowDown' }],
        ['keyDown', { keyCode: 40, key: 'ArrowDown' }],
      ],
      expectedSelectedOption: OPTIONS[3].value,
    },
    'multi select > (open select -> 2 x ArrowDown -> 2 x ArrowUp -> Enter) > should select the first option in the select': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
      },
      eventsToSimulate: [
        ['keyDown', { keyCode: 40, key: 'ArrowDown' }],
        ['keyDown', { keyCode: 40, key: 'ArrowDown' }],
        ['keyDown', { keyCode: 38, key: 'ArrowUp' }],
        ['keyDown', { keyCode: 38, key: 'ArrowUp' }],
      ],
      expectedSelectedOption: OPTIONS[0].value,
    },
    'multi select > (open select -> 1 x ArrowUp -> Enter) > should select the last option in the select': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
      },
      eventsToSimulate: [['keyDown', { keyCode: 38, key: 'ArrowUp' }]],
      expectedSelectedOption: OPTIONS[OPTIONS.length - 1].value,
    },
    'multi select > (open select -> 1 x PageDown -> Enter) > should select the first option on next page - default pageSize 5': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
      },
      eventsToSimulate: [['keyDown', { keyCode: 34, key: 'PageDown' }]],
      expectedSelectedOption: OPTIONS[5].value,
    },
    'multi select > (open select -> 1 x PageDown -> 1 x ArrowDown -> 1 x PageUp -> Enter) > should select the second option - default pageSize 5': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
      },
      eventsToSimulate: [
        ['keyDown', { keyCode: 34, key: 'PageDown' }],
        ['keyDown', { keyCode: 40, key: 'ArrowDown' }],
        ['keyDown', { keyCode: 33, key: 'PageUp' }],
      ],
      expectedSelectedOption: OPTIONS[1].value,
    },
    'multi select > (open select -> End -> Enter) > should select the last option': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
      },
      eventsToSimulate: [['keyDown', { keyCode: 35, key: 'End' }]],
      expectedSelectedOption: OPTIONS[OPTIONS.length - 1].value,
    },
    'multi select > (open select -> 3 x PageDown -> Home -> Enter) > should select the last option': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
      },
      eventsToSimulate: [
        ['keyDown', { keyCode: 34, key: 'PageDown' }],
        ['keyDown', { keyCode: 34, key: 'PageDown' }],
        ['keyDown', { keyCode: 34, key: 'PageDown' }],
        ['keyDown', { keyCode: 36, key: 'Home' }],
      ],
      expectedSelectedOption: OPTIONS[0].value,
    },
    'multi select > cycle options > ( open select -> End -> ArrowDown -> Enter) > should select the first option': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
      },
      eventsToSimulate: [
        ['keyDown', { keyCode: 35, key: 'End' }],
        ['keyDown', { keyCode: 40, key: 'ArrowDown' }],
      ],
      expectedSelectedOption: OPTIONS[0].value,
    },
    'multi select > cycle options > (open select -> ArrowUp -> Enter) > should select the last option': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
      },
      eventsToSimulate: [['keyDown', { keyCode: 38, key: 'ArrowUp' }]],
      expectedSelectedOption: OPTIONS[OPTIONS.length - 1].value,
    },
  }
);
