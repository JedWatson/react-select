import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import cases from 'jest-in-case';

import {
  OPTIONS,
  OPTIONS_ACCENTED,
  OPTIONS_NUMBER_VALUE,
  OPTIONS_BOOLEAN_VALUE,
  OPTIONS_DISABLED,
} from './constants';
import Select from '../Select';

import { matchers } from 'jest-emotion';

expect.extend(matchers);

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

test('snapshot - defaults', () => {
  const { container } = render(<Select />);
  expect(container).toMatchSnapshot();
});

test('instanceId prop > to have instanceId as id prefix for the select components', () => {
  let { container } = render(
    <Select {...BASIC_PROPS} menuIsOpen instanceId={'custom-id'} />
  );
  expect(container.querySelector('input').id).toContain('custom-id');
  container.querySelectorAll('div.react-select__option').forEach(opt => {
    expect(opt.id).toContain('custom-id');
  });
});

test('hidden input field is not present if name is not passes', () => {
  let { container } = render(<Select options={OPTIONS} />);
  expect(container.querySelector('input[type="hidden"]')).toBeNull();
});

test('hidden input field is present if name passes', () => {
  let { container } = render(
    <Select name="test-input-name" options={OPTIONS} />
  );
  expect(container.querySelector('input[type="hidden"]')).toBeTruthy();
});

test('single select > passing multiple values > should select the first value', () => {
  const props = { ...BASIC_PROPS, value: [OPTIONS[0], OPTIONS[4]] };
  let { container } = render(<Select {...props} />);

  expect(container.querySelector('.react-select__control').textContent).toBe(
    '0'
  );
});

test('isRtl boolean prop sets direction: rtl on container', () => {
  let { container } = render(
    <Select {...BASIC_PROPS} value={[OPTIONS[0]]} isRtl isClearable />
  );
  expect(container.firstChild).toHaveStyleRule('direction', 'rtl');
});

test('isOptionSelected() prop > single select > mark value as isSelected if isOptionSelected returns true for the option', () => {
  // Select all but option with label '1'
  let isOptionSelected = jest.fn(option => option.label !== '1');
  let { container } = render(
    <Select {...BASIC_PROPS} isOptionSelected={isOptionSelected} menuIsOpen />
  );
  let options = container.querySelectorAll('.react-select__option');

  // Option label 0 to be selected
  expect(options[0].classList).toContain('react-select__option--is-selected');
  // Option label 1 to be not selected
  expect(options[1].classList).not.toContain(
    'react-select__option--is-selected'
  );
});

test('isOptionSelected() prop > multi select > to not show the selected options in Menu for multiSelect', () => {
  // Select all but option with label '1'
  let isOptionSelected = jest.fn(option => option.label !== '1');
  let { container } = render(
    <Select
      {...BASIC_PROPS}
      isMulti
      isOptionSelected={isOptionSelected}
      menuIsOpen
    />
  );

  expect(container.querySelectorAll('.react-select__option')).toHaveLength(1);
  expect(container.querySelector('.react-select__option').textContent).toBe(
    '1'
  );
});

cases(
  'formatOptionLabel',
  ({ props, valueComponentSelector, expectedOptions }) => {
    let { container } = render(<Select {...props} />);
    let value = container.querySelector(valueComponentSelector);
    expect(value.textContent).toBe(expectedOptions);
  },
  {
    'single select > should format label of options according to text returned by formatOptionLabel': {
      props: {
        ...BASIC_PROPS,
        formatOptionLabel: ({ label, value }, { context }) =>
          `${label} ${value} ${context}`,
        value: OPTIONS[0],
      },
      valueComponentSelector: '.react-select__single-value',
      expectedOptions: '0 zero value',
    },
    'multi select > should format label of options according to text returned by formatOptionLabel': {
      props: {
        ...BASIC_PROPS,
        formatOptionLabel: ({ label, value }, { context }) =>
          `${label} ${value} ${context}`,
        isMulti: true,
        value: OPTIONS[0],
      },
      valueComponentSelector: '.react-select__multi-value',
      expectedOptions: '0 zero value',
    },
  }
);

cases(
  'name prop',
  ({ expectedName, props }) => {
    let { container } = render(<Select {...props} />);
    let input = container.querySelector('input[type=hidden]');

    expect(input.name).toBe(expectedName);
  },
  {
    'single select > should assign the given name': {
      props: { ...BASIC_PROPS, name: 'form-field-single-select' },
      expectedName: 'form-field-single-select',
    },
    'multi select > should assign the given name': {
      props: {
        ...BASIC_PROPS,
        name: 'form-field-multi-select',
        isMulti: true,
        value: OPTIONS[2],
      },
      expectedName: 'form-field-multi-select',
    },
  }
);

cases(
  'menuIsOpen prop',
  ({ props = BASIC_PROPS }) => {
    let { container, rerender } = render(<Select {...props} />);
    expect(container.querySelector('.react-select__menu')).toBeFalsy();

    rerender(<Select {...props} menuIsOpen />);
    expect(container.querySelector('.react-select__menu')).toBeTruthy();

    rerender(<Select {...props} />);
    expect(container.querySelector('.react-select__menu')).toBeFalsy();
  },
  {
    'single select > should show menu if menuIsOpen is true and hide menu if menuIsOpen prop is false': {},
    'multi select > should show menu if menuIsOpen is true and hide menu if menuIsOpen prop is false': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
      },
    },
  }
);

cases(
  'filterOption() prop - default filter behavior',
  ({ props, searchString, expectResultsLength }) => {
    let { container, rerender } = render(<Select {...props} />);
    rerender(<Select {...props} inputValue={searchString} />);
    expect(container.querySelectorAll('.react-select__option')).toHaveLength(
      expectResultsLength
    );
  },
  {
    'single select > should match accented char': {
      props: {
        ...BASIC_PROPS,
        menuIsOpen: true,
        options: OPTIONS_ACCENTED,
      },
      searchString: 'ecole', // should match "école"
      expectResultsLength: 1,
    },
    'single select > should ignore accented char in query': {
      props: {
        ...BASIC_PROPS,
        menuIsOpen: true,
        options: OPTIONS_ACCENTED,
      },
      searchString: 'schoöl', // should match "school"
      expectResultsLength: 1,
    },
  }
);

cases(
  'filterOption() prop - should filter only if function returns truthy for value',
  ({ props, searchString, expectResultsLength }) => {
    let { container, rerender } = render(<Select {...props} />);
    rerender(<Select {...props} inputValue={searchString} />);
    expect(container.querySelectorAll('.react-select__option')).toHaveLength(
      expectResultsLength
    );
  },
  {
    'single select > should filter all options as per searchString': {
      props: {
        ...BASIC_PROPS,
        filterOption: (value, search) => value.value.indexOf(search) > -1,
        menuIsOpen: true,
        value: OPTIONS[0],
      },
      searchString: 'o',
      expectResultsLength: 5,
    },
    'multi select > should filter all options other that options in value of select': {
      props: {
        ...BASIC_PROPS,
        filterOption: (value, search) => value.value.indexOf(search) > -1,
        isMulti: true,
        menuIsOpen: true,
        value: OPTIONS[0],
      },
      searchString: 'o',
      expectResultsLength: 4,
    },
  }
);

cases(
  'filterOption prop is null',
  ({ props, searchString, expectResultsLength }) => {
    let { container, rerender } = render(<Select {...props} />);
    rerender(<Select {...props} inputValue={searchString} />);
    expect(container.querySelectorAll('.react-select__option')).toHaveLength(
      expectResultsLength
    );
  },
  {
    'single select > should show all the options': {
      props: {
        ...BASIC_PROPS,
        filterOption: null,
        menuIsOpen: true,
        value: OPTIONS[0],
      },
      searchString: 'o',
      expectResultsLength: 17,
    },
    'multi select > should show all the options other than selected options': {
      props: {
        ...BASIC_PROPS,
        filterOption: null,
        isMulti: true,
        menuIsOpen: true,
        value: OPTIONS[0],
      },
      searchString: 'o',
      expectResultsLength: 16,
    },
  }
);

cases(
  'no option found on search based on filterOption prop',
  ({ props, searchString }) => {
    let { getByText, rerender } = render(<Select {...props} />);
    rerender(<Select {...props} inputValue={searchString} />);
    expect(getByText('No options').className).toContain(
      'menu-notice--no-options'
    );
  },
  {
    'single Select > should show NoOptionsMessage': {
      props: {
        ...BASIC_PROPS,
        filterOption: (value, search) => value.value.indexOf(search) > -1,
        menuIsOpen: true,
      },
      searchString: 'some text not in options',
    },
    'multi select > should show NoOptionsMessage': {
      props: {
        ...BASIC_PROPS,
        filterOption: (value, search) => value.value.indexOf(search) > -1,
        menuIsOpen: true,
      },
      searchString: 'some text not in options',
    },
  }
);

cases(
  'noOptionsMessage() function prop',
  ({ props, expectNoOptionsMessage, searchString }) => {
    let { getByText, rerender } = render(<Select {...props} />);
    rerender(<Select {...props} inputValue={searchString} />);
    expect(getByText(expectNoOptionsMessage).className).toContain(
      'menu-notice--no-options'
    );
  },
  {
    'single Select > should show NoOptionsMessage returned from noOptionsMessage function prop': {
      props: {
        ...BASIC_PROPS,
        filterOption: (value, search) => value.value.indexOf(search) > -1,
        menuIsOpen: true,
        noOptionsMessage: () =>
          'this is custom no option message for single select',
      },
      expectNoOptionsMessage:
        'this is custom no option message for single select',
      searchString: 'some text not in options',
    },
    'multi select > should show NoOptionsMessage returned from noOptionsMessage function prop': {
      props: {
        ...BASIC_PROPS,
        filterOption: (value, search) => value.value.indexOf(search) > -1,
        menuIsOpen: true,
        noOptionsMessage: () =>
          'this is custom no option message for multi select',
      },
      expectNoOptionsMessage:
        'this is custom no option message for multi select',
      searchString: 'some text not in options',
    },
  }
);

cases(
  'value prop',
  ({ props, expectedValue }) => {
    let value;
    render(
      <Select
        {...props}
        components={{
          Control: ({ getValue }) => {
            value = getValue();
            return null;
          },
        }}
      />
    );
    expect(value).toEqual(expectedValue);
  },
  {
    'single select > should set it as initial value': {
      props: {
        ...BASIC_PROPS,
        value: OPTIONS[2],
      },
      expectedValue: [{ label: '2', value: 'two' }],
    },
    'single select > with option values as number > should set it as initial value': {
      props: {
        ...BASIC_PROPS,
        value: OPTIONS_NUMBER_VALUE[2],
      },
      expectedValue: [{ label: '2', value: 2 }],
    },
    'multi select > should set it as initial value': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
        value: OPTIONS[1],
      },
      expectedValue: [{ label: '1', value: 'one' }],
    },
    'multi select > with option values as number > should set it as initial value': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
        value: OPTIONS_NUMBER_VALUE[1],
      },
      expectedValue: [{ label: '1', value: 1 }],
    },
  }
);

cases(
  'update the value prop',
  ({
    props = { ...BASIC_PROPS, value: OPTIONS[1] },
    updateValueTo,
    expectedInitialValue,
    expectedUpdatedValue,
  }) => {
    let { container, rerender } = render(<Select {...props} />);
    expect(container.querySelector('input[type="hidden"]').value).toEqual(
      expectedInitialValue
    );

    rerender(<Select {...props} value={updateValueTo} />);

    expect(container.querySelector('input[type="hidden"]').value).toEqual(
      expectedUpdatedValue
    );
  },
  {
    'single select > should update the value when prop is updated': {
      updateValueTo: OPTIONS[3],
      expectedInitialValue: 'one',
      expectedUpdatedValue: 'three',
    },
    'single select > value of options is number > should update the value when prop is updated': {
      props: {
        ...BASIC_PROPS,
        options: OPTIONS_NUMBER_VALUE,
        value: OPTIONS_NUMBER_VALUE[2],
      },
      updateValueTo: OPTIONS_NUMBER_VALUE[3],
      expectedInitialValue: '2',
      expectedUpdatedValue: '3',
    },
    'multi select > should update the value when prop is updated': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
        value: OPTIONS[1],
      },
      updateValueTo: OPTIONS[3],
      expectedInitialValue: 'one',
      expectedUpdatedValue: 'three',
    },
    'multi select > value of options is number > should update the value when prop is updated': {
      props: {
        ...BASIC_PROPS,
        delimiter: ',',
        isMulti: true,
        options: OPTIONS_NUMBER_VALUE,
        value: OPTIONS_NUMBER_VALUE[2],
      },
      updateValueTo: [OPTIONS_NUMBER_VALUE[3], OPTIONS_NUMBER_VALUE[2]],
      expectedInitialValue: '2',
      expectedUpdatedValue: '3,2',
    },
  }
);

cases(
  'calls onChange on selecting an option',
  ({
    props = { ...BASIC_PROPS, menuIsOpen: true },
    event: [eventName, eventOptions],
    expectedSelectedOption,
    optionsSelected,
    focusedOption,
    expectedActionMetaOption,
  }) => {
    let onChangeSpy = jest.fn();
    props = { ...props, onChange: onChangeSpy };
    let { container } = render(<Select {...props} />);

    if (focusedOption) {
      focusOption(container, focusedOption, props.options);
    }

    let selectOption = [
      ...container.querySelectorAll('div.react-select__option'),
    ].find(n => n.textContent === optionsSelected.label);

    fireEvent[eventName](selectOption, eventOptions);
    expect(onChangeSpy).toHaveBeenCalledWith(expectedSelectedOption, {
      action: 'select-option',
      option: expectedActionMetaOption,
      name: BASIC_PROPS.name,
    });
  },
  {
    'single select > option is clicked > should call onChange() prop with selected option': {
      event: ['click'],
      optionsSelected: { label: '2', value: 'two' },
      expectedSelectedOption: { label: '2', value: 'two' },
    },
    'single select > option with number value > option is clicked > should call onChange() prop with selected option': {
      props: {
        ...BASIC_PROPS,
        menuIsOpen: true,
        options: OPTIONS_NUMBER_VALUE,
      },
      event: ['click'],
      optionsSelected: { label: '0', value: 0 },
      expectedSelectedOption: { label: '0', value: 0 },
    },
    'single select > option with boolean value > option is clicked > should call onChange() prop with selected option': {
      props: {
        ...BASIC_PROPS,
        menuIsOpen: true,
        options: OPTIONS_BOOLEAN_VALUE,
      },
      event: ['click'],
      optionsSelected: { label: 'true', value: true },
      expectedSelectedOption: { label: 'true', value: true },
    },
    'single select > tab key is pressed while focusing option > should call onChange() prop with selected option': {
      event: ['keyDown', { keyCode: 9, key: 'Tab' }],
      optionsSelected: { label: '1', value: 'one' },
      focusedOption: { label: '1', value: 'one' },
      expectedSelectedOption: { label: '1', value: 'one' },
    },
    'single select > enter key is pressed while focusing option > should call onChange() prop with selected option': {
      event: ['keyDown', { keyCode: 13, key: 'Enter' }],
      optionsSelected: { label: '3', value: 'three' },
      focusedOption: { label: '3', value: 'three' },
      expectedSelectedOption: { label: '3', value: 'three' },
    },
    'single select > space key is pressed while focusing option > should call onChange() prop with selected option': {
      event: ['keyDown', { keyCode: 32, key: ' ' }],
      optionsSelected: { label: '1', value: 'one' },
      focusedOption: { label: '1', value: 'one' },
      expectedSelectedOption: { label: '1', value: 'one' },
    },
    'multi select > option is clicked > should call onChange() prop with selected option': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS,
      },
      event: ['click'],
      optionsSelected: { label: '2', value: 'two' },
      expectedSelectedOption: [{ label: '2', value: 'two' }],
      expectedActionMetaOption: { label: '2', value: 'two' },
    },
    'multi select > option with number value > option is clicked > should call onChange() prop with selected option': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS_NUMBER_VALUE,
      },
      event: ['click'],
      optionsSelected: { label: '0', value: 0 },
      expectedSelectedOption: [{ label: '0', value: 0 }],
      expectedActionMetaOption: { label: '0', value: 0 },
    },
    'multi select > option with boolean value > option is clicked > should call onChange() prop with selected option': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS_BOOLEAN_VALUE,
      },
      event: ['click'],
      optionsSelected: { label: 'true', value: true },
      expectedSelectedOption: [{ label: 'true', value: true }],
      expectedActionMetaOption: { label: 'true', value: true },
    },
    'multi select > tab key is pressed while focusing option > should call onChange() prop with selected option': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS,
      },
      event: ['keyDown', { keyCode: 9, key: 'Tab' }],
      menuIsOpen: true,
      optionsSelected: { label: '1', value: 'one' },
      focusedOption: { label: '1', value: 'one' },
      expectedSelectedOption: [{ label: '1', value: 'one' }],
      expectedActionMetaOption: { label: '1', value: 'one' },
    },
    'multi select > enter key is pressed while focusing option > should call onChange() prop with selected option': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS,
      },
      event: ['keyDown', { keyCode: 13, key: 'Enter' }],
      optionsSelected: { label: '3', value: 'three' },
      focusedOption: { label: '3', value: 'three' },
      expectedSelectedOption: [{ label: '3', value: 'three' }],
      expectedActionMetaOption: { label: '3', value: 'three' },
    },
    'multi select > space key is pressed while focusing option > should call onChange() prop with selected option': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS,
      },
      event: ['keyDown', { keyCode: 32, key: ' ' }],
      optionsSelected: { label: '1', value: 'one' },
      focusedOption: { label: '1', value: 'one' },
      expectedSelectedOption: [{ label: '1', value: 'one' }],
      expectedActionMetaOption: { label: '1', value: 'one' },
    },
  }
);

cases(
  'calls onChange on de-selecting an option in multi select',
  ({
    props = { ...BASIC_PROPS },
    event: [eventName, eventOptions],
    expectedSelectedOption,
    expectedMetaOption,
    optionsSelected,
    focusedOption,
  }) => {
    let onChangeSpy = jest.fn();
    props = {
      ...props,
      onChange: onChangeSpy,
      menuIsOpen: true,
      hideSelectedOptions: false,
      isMulti: true,
      menuIsOpen: true,
    };
    let { container } = render(<Select {...props} />);

    let selectOption = [
      ...container.querySelectorAll('div.react-select__option'),
    ].find(n => n.textContent === optionsSelected.label);
    if (focusedOption) {
      focusOption(container, focusedOption, props.options);
    }
    fireEvent[eventName](selectOption, eventOptions);
    expect(onChangeSpy).toHaveBeenCalledWith(expectedSelectedOption, {
      action: 'deselect-option',
      option: expectedMetaOption,
      name: BASIC_PROPS.name,
    });
  },
  {
    'option is clicked > should call onChange() prop with correct selected options and meta': {
      props: {
        ...BASIC_PROPS,
        options: OPTIONS,
        value: [{ label: '2', value: 'two' }],
      },
      event: ['click'],
      optionsSelected: { label: '2', value: 'two' },
      expectedSelectedOption: [],
      expectedMetaOption: { label: '2', value: 'two' },
    },
    'option with number value > option is clicked > should call onChange() prop with selected option': {
      props: {
        ...BASIC_PROPS,
        options: OPTIONS_NUMBER_VALUE,
        value: [{ label: '0', value: 0 }],
      },
      event: ['click'],
      optionsSelected: { label: '0', value: 0 },
      expectedSelectedOption: [],
      expectedMetaOption: { label: '0', value: 0 },
    },
    'option with boolean value > option is clicked > should call onChange() prop with selected option': {
      props: {
        ...BASIC_PROPS,
        options: OPTIONS_BOOLEAN_VALUE,
        value: [{ label: 'true', value: true }],
      },
      event: ['click'],
      optionsSelected: { label: 'true', value: true },
      expectedSelectedOption: [],
      expectedMetaOption: { label: 'true', value: true },
    },
    'tab key is pressed while focusing option > should call onChange() prop with selected option': {
      props: {
        ...BASIC_PROPS,
        options: OPTIONS,
        value: [{ label: '1', value: 'one' }],
      },
      event: ['keyDown', { keyCode: 9, key: 'Tab' }],
      menuIsOpen: true,
      optionsSelected: { label: '1', value: 'one' },
      focusedOption: { label: '1', value: 'one' },
      expectedSelectedOption: [],
      expectedMetaOption: { label: '1', value: 'one' },
    },
    'enter key is pressed while focusing option > should call onChange() prop with selected option': {
      props: {
        ...BASIC_PROPS,
        options: OPTIONS,
        value: { label: '3', value: 'three' },
      },
      event: ['keyDown', { keyCode: 13, key: 'Enter' }],
      optionsSelected: { label: '3', value: 'three' },
      focusedOption: { label: '3', value: 'three' },
      expectedSelectedOption: [],
      expectedMetaOption: { label: '3', value: 'three' },
    },
    'space key is pressed while focusing option > should call onChange() prop with selected option': {
      props: {
        ...BASIC_PROPS,
        options: OPTIONS,
        value: [{ label: '1', value: 'one' }],
      },
      event: ['keyDown', { keyCode: 32, key: ' ' }],
      optionsSelected: { label: '1', value: 'one' },
      focusedOption: { label: '1', value: 'one' },
      expectedSelectedOption: [],
      expectedMetaOption: { label: '1', value: 'one' },
    },
  }
);

function focusOption(container, option, options) {
  let indexOfSelectedOption = options.findIndex(o => o.value === option.value);

  for (let i = -1; i < indexOfSelectedOption; i++) {
    fireEvent.keyDown(container.querySelector('.react-select__menu'), {
      keyCode: 40,
      key: 'ArrowDown',
    });
  }
  expect(
    container.querySelector('.react-select__option--is-focused').textContent
  ).toEqual(option.label);
}

cases(
  'hitting escape on select option',
  ({
    props,
    event: [eventName, eventOptions],
    focusedOption,
    optionsSelected,
  }) => {
    let onChangeSpy = jest.fn();
    let { container } = render(
      <Select
        {...props}
        onChange={onChangeSpy}
        onInputChange={jest.fn()}
        onMenuClose={jest.fn()}
      />
    );

    let selectOption = [
      ...container.querySelectorAll('div.react-select__option'),
    ].find(n => n.textContent === optionsSelected.label);
    focusOption(container, focusedOption, props.options);

    fireEvent[eventName](selectOption, eventOptions);
    expect(onChangeSpy).not.toHaveBeenCalled();
  },
  {
    'single select > should not call onChange prop': {
      props: {
        ...BASIC_PROPS,
        menuIsOpen: true,
      },
      optionsSelected: { label: '1', value: 'one' },
      focusedOption: { label: '1', value: 'one' },
      event: ['keyDown', { keyCode: 27 }],
    },
    'multi select > should not call onChange prop': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
        menuIsOpen: true,
      },
      optionsSelected: { label: '1', value: 'one' },
      focusedOption: { label: '1', value: 'one' },
      event: ['keyDown', { keyCode: 27 }],
    },
  }
);

cases(
  'click to open select',
  ({ props = BASIC_PROPS, expectedToFocus }) => {
    let { container, rerender } = render(
      <Select
        {...props}
        onMenuOpen={() => {
          rerender(<Select {...props} menuIsOpen onMenuOpen={() => {}} />);
        }}
      />
    );

    fireEvent.mouseDown(
      container.querySelector('.react-select__dropdown-indicator'),
      { button: 0 }
    );
    expect(
      container.querySelector('.react-select__option--is-focused').textContent
    ).toEqual(expectedToFocus.label);
  },
  {
    'single select > should focus the first option': {
      expectedToFocus: { label: '0', value: 'zero' },
    },
    'multi select > should focus the first option': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
      },
      expectedToFocus: { label: '0', value: 'zero' },
    },
  }
);

test('clicking when focused does not open select when openMenuOnClick=false', () => {
  let spy = jest.fn();
  let { container } = render(
    <Select {...BASIC_PROPS} openMenuOnClick={false} onMenuOpen={spy} />
  );

  // this will get updated on input click, though click on input is not bubbling up to control component
  userEvent.click(container.querySelector('.react-select__input input'));
  expect(spy).not.toHaveBeenCalled();
});

cases(
  'focus on options > keyboard interaction with Menu',
  ({ props, selectedOption, nextFocusOption, keyEvent = [] }) => {
    let { container } = render(
      <Select classNamePrefix="react-select" {...props} />
    );

    let indexOfSelectedOption = props.options.indexOf(selectedOption);

    for (let i = -1; i < indexOfSelectedOption; i++) {
      fireEvent.keyDown(container.querySelector('.react-select__menu'), {
        keyCode: 40,
        key: 'ArrowDown',
      });
    }

    expect(
      container.querySelector('.react-select__option--is-focused').textContent
    ).toEqual(selectedOption.label);

    for (let event of keyEvent) {
      fireEvent.keyDown(container.querySelector('.react-select__menu'), event);
    }

    expect(
      container.querySelector('.react-select__option--is-focused').textContent
    ).toEqual(nextFocusOption.label);
  },
  {
    'single select > ArrowDown key on first option should focus second option': {
      props: {
        ...BASIC_PROPS,
        menuIsOpen: true,
      },
      keyEvent: [{ keyCode: 40, key: 'ArrowDown' }],
      selectedOption: OPTIONS[0],
      nextFocusOption: OPTIONS[1],
    },
    'single select > ArrowDown key on last option should focus first option': {
      props: {
        menuIsOpen: true,
        options: OPTIONS,
      },
      keyEvent: [{ keyCode: 40, key: 'ArrowDown' }],
      selectedOption: OPTIONS[OPTIONS.length - 1],
      nextFocusOption: OPTIONS[0],
    },
    'single select > ArrowUp key on first option should focus last option': {
      props: {
        menuIsOpen: true,
        options: OPTIONS,
      },
      keyEvent: [{ keyCode: 38, key: 'ArrowUp' }],
      selectedOption: OPTIONS[0],
      nextFocusOption: OPTIONS[OPTIONS.length - 1],
    },
    'single select > ArrowUp key on last option should focus second last option': {
      props: {
        menuIsOpen: true,
        options: OPTIONS,
      },
      keyEvent: [{ keyCode: 38, key: 'ArrowUp' }],
      selectedOption: OPTIONS[OPTIONS.length - 1],
      nextFocusOption: OPTIONS[OPTIONS.length - 2],
    },
    'single select > disabled options should be focusable': {
      props: {
        menuIsOpen: true,
        options: OPTIONS_DISABLED,
      },
      keyEvent: [{ keyCode: 40, key: 'ArrowDown' }],
      selectedOption: OPTIONS_DISABLED[0],
      nextFocusOption: OPTIONS_DISABLED[1],
    },
    'single select > PageDown key takes us to next page with default page size of 5': {
      props: {
        menuIsOpen: true,
        options: OPTIONS,
      },
      keyEvent: [{ keyCode: 34, key: 'PageDown' }],
      selectedOption: OPTIONS[0],
      nextFocusOption: OPTIONS[5],
    },
    'single select > PageDown key takes us to next page with custom pageSize 7': {
      props: {
        menuIsOpen: true,
        pageSize: 7,
        options: OPTIONS,
      },
      keyEvent: [{ keyCode: 34, key: 'PageDown' }],
      selectedOption: OPTIONS[0],
      nextFocusOption: OPTIONS[7],
    },
    'single select > PageDown key takes to the last option is options below is less then page size': {
      props: {
        menuIsOpen: true,
        options: OPTIONS,
      },
      keyEvent: [{ keyCode: 34, key: 'PageDown' }],
      selectedOption: OPTIONS[OPTIONS.length - 3],
      nextFocusOption: OPTIONS[OPTIONS.length - 1],
    },
    'single select > PageUp key takes us to previous page with default page size of 5': {
      props: {
        menuIsOpen: true,
        options: OPTIONS,
      },
      keyEvent: [{ keyCode: 33, key: 'PageUp' }],
      selectedOption: OPTIONS[6],
      nextFocusOption: OPTIONS[1],
    },
    'single select > PageUp key takes us to previous page with custom pageSize of 7': {
      props: {
        menuIsOpen: true,
        pageSize: 7,
        options: OPTIONS,
      },
      keyEvent: [{ keyCode: 33, key: 'PageUp' }],
      selectedOption: OPTIONS[9],
      nextFocusOption: OPTIONS[2],
    },
    'single select > PageUp key takes us to first option - (previous options < pageSize)': {
      props: {
        menuIsOpen: true,
        options: OPTIONS,
      },
      keyEvent: [{ keyCode: 33, key: 'PageUp' }],
      selectedOption: OPTIONS[1],
      nextFocusOption: OPTIONS[0],
    },
    'single select > Home key takes up to the first option': {
      props: {
        menuIsOpen: true,
        options: OPTIONS,
      },
      keyEvent: [{ keyCode: 36, key: 'Home' }],
      selectedOption: OPTIONS[OPTIONS.length - 3],
      nextFocusOption: OPTIONS[0],
    },
    'single select > End key takes down to the last option': {
      props: {
        menuIsOpen: true,
        options: OPTIONS,
      },
      keyEvent: [{ keyCode: 35, key: 'End' }],
      selectedOption: OPTIONS[2],
      nextFocusOption: OPTIONS[OPTIONS.length - 1],
    },
    'multi select > ArrowDown key on first option should focus second option': {
      props: {
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS,
      },
      keyEvent: [{ keyCode: 40, key: 'ArrowDown' }],
      selectedOption: OPTIONS[0],
      nextFocusOption: OPTIONS[1],
    },
    'multi select > ArrowDown key on last option should focus first option': {
      props: {
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS,
      },
      keyEvent: [{ keyCode: 40, key: 'ArrowDown' }],
      selectedOption: OPTIONS[OPTIONS.length - 1],
      nextFocusOption: OPTIONS[0],
    },
    'multi select > ArrowUp key on first option should focus last option': {
      props: {
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS,
      },
      keyEvent: [{ keyCode: 38, key: 'ArrowUp' }],
      selectedOption: OPTIONS[0],
      nextFocusOption: OPTIONS[OPTIONS.length - 1],
    },
    'multi select > ArrowUp key on last option should focus second last option': {
      props: {
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS,
      },
      keyEvent: [{ keyCode: 38, key: 'ArrowUp' }],
      selectedOption: OPTIONS[OPTIONS.length - 1],
      nextFocusOption: OPTIONS[OPTIONS.length - 2],
    },
    'multi select > PageDown key takes us to next page with default page size of 5': {
      props: {
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS,
      },
      keyEvent: [{ keyCode: 34, key: 'PageDown' }],
      selectedOption: OPTIONS[0],
      nextFocusOption: OPTIONS[5],
    },
    'multi select > PageDown key takes us to next page with custom pageSize of 8': {
      props: {
        isMulti: true,
        menuIsOpen: true,
        pageSize: 8,
        options: OPTIONS,
      },
      keyEvent: [{ keyCode: 34, key: 'PageDown' }],
      selectedOption: OPTIONS[0],
      nextFocusOption: OPTIONS[8],
    },
    'multi select > PageDown key takes to the last option is options below is less then page size': {
      props: {
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS,
      },
      keyEvent: [{ keyCode: 34, key: 'PageDown' }],
      selectedOption: OPTIONS[OPTIONS.length - 3],
      nextFocusOption: OPTIONS[OPTIONS.length - 1],
    },
    'multi select > PageUp key takes us to previous page with default page size of 5': {
      props: {
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS,
      },
      keyEvent: [{ keyCode: 33, key: 'PageUp' }],
      selectedOption: OPTIONS[6],
      nextFocusOption: OPTIONS[1],
    },
    'multi select > PageUp key takes us to previous page with default page size of 9': {
      props: {
        isMulti: true,
        menuIsOpen: true,
        pageSize: 9,
        options: OPTIONS,
      },
      keyEvent: [{ keyCode: 33, key: 'PageUp' }],
      selectedOption: OPTIONS[10],
      nextFocusOption: OPTIONS[1],
    },
    'multi select > PageUp key takes us to first option - previous options < pageSize': {
      props: {
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS,
      },
      keyEvent: [{ keyCode: 33, key: 'PageUp' }],
      selectedOption: OPTIONS[1],
      nextFocusOption: OPTIONS[0],
    },
    'multi select > Home key takes up to the first option': {
      props: {
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS,
      },
      keyEvent: [{ keyCode: 36, key: 'Home' }],
      selectedOption: OPTIONS[OPTIONS.length - 3],
      nextFocusOption: OPTIONS[0],
    },
    'multi select > End key takes down to the last option': {
      props: {
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS,
      },
      keyEvent: [{ keyCode: 35, key: 'End' }],
      selectedOption: OPTIONS[2],
      nextFocusOption: OPTIONS[OPTIONS.length - 1],
    },
  }
);

// TODO: Cover more scenario
cases(
  'hitting escape with inputValue in select',
  ({ props }) => {
    let spy = jest.fn();
    let { container } = render(
      <Select {...props} onInputChange={spy} onMenuClose={jest.fn()} />
    );

    fireEvent.keyDown(container.querySelector('.react-select'), {
      keyCode: 27,
      key: 'Escape',
    });
    expect(spy).toHaveBeenCalledWith('', { action: 'menu-close' });
  },
  {
    'single select > should call onInputChange prop with empty string as inputValue': {
      props: {
        ...BASIC_PROPS,
        inputValue: 'test',
        menuIsOpen: true,
        value: OPTIONS[0],
      },
    },
    'multi select > should call onInputChange prop with empty string as inputValue': {
      props: {
        ...BASIC_PROPS,
        inputValue: 'test',
        isMulti: true,
        menuIsOpen: true,
        value: OPTIONS[0],
      },
    },
  }
);

cases(
  'Clicking dropdown indicator on select with closed menu with primary button on mouse',
  ({ props = BASIC_PROPS }) => {
    let onMenuOpenSpy = jest.fn();
    props = { ...props, onMenuOpen: onMenuOpenSpy };
    let { container } = render(<Select {...props} />);
    // Menu is closed
    expect(
      container.querySelector('.react-select__menu')
    ).not.toBeInTheDocument();
    fireEvent.mouseDown(
      container.querySelector('div.react-select__dropdown-indicator'),
      { button: 0 }
    );
    expect(onMenuOpenSpy).toHaveBeenCalled();
  },
  {
    'single select > should call onMenuOpen prop when select is opened and onMenuClose prop when select is closed': {},
    'multi select > should call onMenuOpen prop when select is opened and onMenuClose prop when select is closed': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
      },
    },
  }
);

cases(
  'Clicking dropdown indicator on select with open menu with primary button on mouse',
  ({ props = BASIC_PROPS }) => {
    let onMenuCloseSpy = jest.fn();
    props = { ...props, onMenuClose: onMenuCloseSpy };
    let { container } = render(<Select {...props} menuIsOpen />);
    // Menu is open
    expect(container.querySelector('.react-select__menu')).toBeInTheDocument();
    fireEvent.mouseDown(
      container.querySelector('div.react-select__dropdown-indicator'),
      { button: 0 }
    );
    expect(onMenuCloseSpy).toHaveBeenCalled();
  },
  {
    'single select > should call onMenuOpen prop when select is opened and onMenuClose prop when select is closed': {},
    'multi select > should call onMenuOpen prop when select is opened and onMenuClose prop when select is closed': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
      },
    },
  }
);

cases(
  'Clicking Enter on a focused select',
  ({ props, expectedValue }) => {
    let event;
    let { container } = render(
      <div
        onKeyDown={_event => {
          event = _event;
          event.persist();
        }}
      >
        <Select {...props} />
      </div>
    );
    if (props.menuIsOpen) {
      fireEvent.keyDown(container.querySelector('.react-select__menu'), {
        keyCode: 40,
        key: 'ArrowDown',
      });
    }

    fireEvent.keyDown(container.querySelector('.react-select'), {
      key: 'Enter',
      keyCode: 13,
    });
    expect(event.defaultPrevented).toBe(expectedValue);
  },
  {
    'while menuIsOpen && focusedOption && !isComposing  > should invoke event.preventDefault': {
      props: {
        ...BASIC_PROPS,
        menuIsOpen: true,
      },
      expectedValue: true,
    },
    'while !menuIsOpen > should not invoke event.preventDefault': {
      props: {
        ...BASIC_PROPS,
      },
      expectedValue: false,
    },
  }
);

// QUESTION: Is this test right? I tried right clicking on the dropdown indicator in a browser and the select opened but this test says it shouldn't?
cases(
  'clicking on select using secondary button on mouse',
  ({ props = BASIC_PROPS }) => {
    let onMenuOpenSpy = jest.fn();
    let onMenuCloseSpy = jest.fn();
    let { container, rerender } = render(
      <Select
        {...props}
        onMenuClose={onMenuCloseSpy}
        onMenuOpen={onMenuOpenSpy}
      />
    );
    let downButton = container.querySelector(
      'div.react-select__dropdown-indicator'
    );

    // does not open menu if menu is closed
    fireEvent.mouseDown(downButton, { button: 1 });
    expect(onMenuOpenSpy).not.toHaveBeenCalled();

    // does not close menu if menu is opened
    rerender(
      <Select
        {...props}
        menuIsOpen
        onMenuClose={onMenuCloseSpy}
        onMenuOpen={onMenuOpenSpy}
      />
    );
    fireEvent.mouseDown(downButton, { button: 1 });
    expect(onMenuCloseSpy).not.toHaveBeenCalled();
  },
  {
    'single select > secondary click is ignored > should not call onMenuOpen and onMenuClose prop': {
      skip: true,
    },
    'multi select > secondary click is ignored > should not call onMenuOpen and onMenuClose prop': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
      },
      skip: true,
    },
  }
);

cases(
  'required on input is not there by default',
  ({ props = BASIC_PROPS }) => {
    let { container } = render(<Select {...props} onInputChange={jest.fn()} />);
    let input = container.querySelector('.react-select__input input');
    expect(input.required).toBe(false);
  },
  {
    'single select > should not have required attribute': {},
    'multi select > should not have required attribute': { isMulti: true },
  }
);

cases(
  'value of hidden input control',
  ({ props, expectedValue }) => {
    let { container } = render(<Select {...props} />);
    let hiddenInput = container.querySelector('input[type="hidden"]');
    expect(hiddenInput.value).toEqual(expectedValue);
  },
  {
    'single select > should set value of input as value prop': {
      props: {
        ...BASIC_PROPS,
        value: OPTIONS[3],
      },
      expectedValue: 'three',
    },
    'single select > options with number values > should set value of input as value prop': {
      props: {
        ...BASIC_PROPS,
        options: OPTIONS_NUMBER_VALUE,
        value: OPTIONS_NUMBER_VALUE[3],
      },
      expectedValue: '3',
    },
    'single select > options with boolean values > should set value of input as value prop': {
      props: {
        ...BASIC_PROPS,
        options: OPTIONS_BOOLEAN_VALUE,
        value: OPTIONS_BOOLEAN_VALUE[1],
      },
      expectedValue: 'false',
    },
    'multi select > should set value of input as value prop': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
        value: OPTIONS[3],
      },
      expectedValue: 'three',
    },
    'multi select > with delimiter prop > should set value of input as value prop': {
      props: {
        ...BASIC_PROPS,
        delimiter: ', ',
        isMulti: true,
        value: [OPTIONS[3], OPTIONS[5]],
      },
      expectedValue: 'three, five',
    },
    'multi select > options with number values > should set value of input as value prop': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
        options: OPTIONS_NUMBER_VALUE,
        value: OPTIONS_NUMBER_VALUE[3],
      },
      expectedValue: '3',
    },
    'multi select > with delimiter prop > options with number values > should set value of input as value prop': {
      props: {
        ...BASIC_PROPS,
        delimiter: ', ',
        isMulti: true,
        options: OPTIONS_NUMBER_VALUE,
        value: [OPTIONS_NUMBER_VALUE[3], OPTIONS_NUMBER_VALUE[1]],
      },
      expectedValue: '3, 1',
    },
    'multi select > options with boolean values > should set value of input as value prop': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
        options: OPTIONS_BOOLEAN_VALUE,
        value: OPTIONS_BOOLEAN_VALUE[1],
      },
      expectedValue: 'false',
    },
    'multi select > with delimiter prop > options with boolean values > should set value of input as value prop': {
      props: {
        ...BASIC_PROPS,
        delimiter: ', ',
        isMulti: true,
        options: OPTIONS_BOOLEAN_VALUE,
        value: [OPTIONS_BOOLEAN_VALUE[1], OPTIONS_BOOLEAN_VALUE[0]],
      },
      expectedValue: 'false, true',
    },
  }
);

cases(
  'isOptionDisabled() prop',
  ({ props, expectedEnabledOption, expectedDisabledOption }) => {
    let { container } = render(<Select {...props} />);

    const enabledOptionsValues = [
      ...container.querySelectorAll('.react-select__option'),
    ]
      .filter(n => !n.classList.contains('react-select__option--is-disabled'))
      .map(option => option.textContent);

    enabledOptionsValues.forEach(option => {
      expect(expectedDisabledOption.indexOf(option)).toBe(-1);
    });

    const disabledOptionsValues = [
      ...container.querySelectorAll('.react-select__option'),
    ]
      .filter(n => n.classList.contains('react-select__option--is-disabled'))
      .map(option => option.textContent);

    disabledOptionsValues.forEach(option => {
      expect(expectedEnabledOption.indexOf(option)).toBe(-1);
    });
  },
  {
    'single select > should add isDisabled as true prop only to options that are disabled': {
      props: {
        ...BASIC_PROPS,
        menuIsOpen: true,
        isOptionDisabled: option =>
          ['zero', 'two', 'five', 'ten'].indexOf(option.value) > -1,
      },
      expectedEnabledOption: ['1', '3', '11'],
      expectedDisabledOption: ['0', '2', '5'],
    },
    'multi select > should add isDisabled as true prop only to options that are disabled': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
        menuIsOpen: true,
        isOptionDisabled: option =>
          ['zero', 'two', 'five', 'ten'].indexOf(option.value) > -1,
      },
      expectedEnabledOption: ['1', '3', '11'],
      expectedDisabledOption: ['0', '2', '5'],
    },
  }
);

cases(
  'isDisabled prop',
  ({ props }) => {
    let { container } = render(<Select {...props} />);

    let control = container.querySelector('.react-select__control');
    expect(
      control.classList.contains('react-select__control--is-disabled')
    ).toBeTruthy();

    let input = container.querySelector('.react-select__control input');
    expect(input.disabled).toBeTruthy();
  },
  {
    'single select > should add isDisabled prop to select components': {
      props: {
        ...BASIC_PROPS,
        isDisabled: true,
      },
    },
    'multi select > should add isDisabled prop to select components': {
      props: {
        ...BASIC_PROPS,
        isDisabled: true,
        isMulti: true,
      },
    },
  }
);

test('hitting Enter on option should not call onChange if the event comes from IME', () => {
  let spy = jest.fn();
  let { container } = render(
    <Select
      className="react-select"
      classNamePrefix="react-select"
      menuIsOpen
      onChange={spy}
      onInputChange={jest.fn()}
      onMenuClose={jest.fn()}
      options={OPTIONS}
      tabSelectsValue={false}
    />
  );

  let selectOption = container.querySelector('div.react-select__option');
  let menu = container.querySelector('.react-select__menu');
  fireEvent.keyDown(menu, { keyCode: 40, key: 'ArrowDown' });
  fireEvent.keyDown(menu, { keyCode: 40, key: 'ArrowDown' });

  fireEvent.keyDown(selectOption, { keyCode: 229, key: 'Enter' });

  expect(spy).not.toHaveBeenCalled();
});

test('hitting tab on option should not call onChange if tabSelectsValue is false', () => {
  let spy = jest.fn();
  let { container } = render(
    <Select
      className="react-select"
      classNamePrefix="react-select"
      menuIsOpen
      onChange={spy}
      onInputChange={jest.fn()}
      onMenuClose={jest.fn()}
      options={OPTIONS}
      tabSelectsValue={false}
    />
  );

  let selectOption = container.querySelector('div.react-select__option');
  let menu = container.querySelector('.react-select__menu');
  fireEvent.keyDown(menu, { keyCode: 40, key: 'ArrowDown' });
  fireEvent.keyDown(menu, { keyCode: 40, key: 'ArrowDown' });

  fireEvent.keyDown(selectOption, { keyCode: 9, key: 'Tab' });
  expect(spy).not.toHaveBeenCalled();
});

test('multi select > to not show selected value in options', () => {
  let onInputChangeSpy = jest.fn();
  let onMenuCloseSpy = jest.fn();
  let { container, rerender } = render(
    <Select
      {...BASIC_PROPS}
      isMulti
      menuIsOpen
      onInputChange={onInputChangeSpy}
      onMenuClose={onMenuCloseSpy}
    />
  );

  let availableOptions = [
    ...container.querySelectorAll('.react-select__option'),
  ].map(option => option.textContent);
  expect(availableOptions.indexOf('0') > -1).toBeTruthy();

  rerender(
    <Select
      {...BASIC_PROPS}
      isMulti
      menuIsOpen
      onInputChange={onInputChangeSpy}
      onMenuClose={onMenuCloseSpy}
      value={OPTIONS[0]}
    />
  );

  // Re-open Menu
  fireEvent.mouseDown(
    container.querySelector('div.react-select__dropdown-indicator'),
    {
      button: 0,
    }
  );
  availableOptions = [
    ...container.querySelectorAll('.react-select__option'),
  ].map(option => option.textContent);

  expect(availableOptions.indexOf('0') > -1).toBeFalsy();
});

test('multi select > to not hide the selected options from the menu if hideSelectedOptions is false', () => {
  let { container } = render(
    <Select
      className="react-select"
      classNamePrefix="react-select"
      hideSelectedOptions={false}
      isMulti
      menuIsOpen
      onChange={jest.fn()}
      onInputChange={jest.fn()}
      onMenuClose={jest.fn()}
      options={OPTIONS}
    />
  );
  let firstOption = container.querySelectorAll('.react-select__option')[0];
  let secondoption = container.querySelectorAll('.react-select__option')[1];
  expect(firstOption.textContent).toBe('0');
  expect(secondoption.textContent).toBe('1');

  userEvent.click(firstOption);

  expect(firstOption.textContent).toBe('0');
  expect(secondoption.textContent).toBe('1');
});

test('multi select > call onChange with all values but last selected value and remove event on hitting backspace', () => {
  let onChangeSpy = jest.fn();
  let { container } = render(
    <Select
      {...BASIC_PROPS}
      isMulti
      onChange={onChangeSpy}
      value={[OPTIONS[0], OPTIONS[1], OPTIONS[2]]}
    />
  );
  expect(container.querySelector('.react-select__control').textContent).toBe(
    '012'
  );

  fireEvent.keyDown(container.querySelector('.react-select__control'), {
    keyCode: 8,
    key: 'Backspace',
  });
  expect(onChangeSpy).toHaveBeenCalledWith(
    [
      { label: '0', value: 'zero' },
      { label: '1', value: 'one' },
    ],
    {
      action: 'pop-value',
      removedValue: { label: '2', value: 'two' },
      name: BASIC_PROPS.name,
    }
  );
});

test('should not call onChange on hitting backspace when backspaceRemovesValue is false', () => {
  let onChangeSpy = jest.fn();
  let { container } = render(
    <Select
      {...BASIC_PROPS}
      backspaceRemovesValue={false}
      onChange={onChangeSpy}
    />
  );
  fireEvent.keyDown(container.querySelector('.react-select__control'), {
    keyCode: 8,
    key: 'Backspace',
  });
  expect(onChangeSpy).not.toHaveBeenCalled();
});

test('should not call onChange on hitting backspace even when backspaceRemovesValue is true if isClearable is false', () => {
  let onChangeSpy = jest.fn();
  let { container } = render(
    <Select
      {...BASIC_PROPS}
      backspaceRemovesValue
      isClearable={false}
      onChange={onChangeSpy}
    />
  );
  fireEvent.keyDown(container.querySelector('.react-select__control'), {
    keyCode: 8,
    key: 'Backspace',
  });
  expect(onChangeSpy).not.toHaveBeenCalled();
});

cases(
  'should call onChange with `null` on hitting backspace when backspaceRemovesValue is true',
  ({ props = { ...BASIC_PROPS }, expectedValue }) => {
    let onChangeSpy = jest.fn();
    let { container } = render(
      <Select
        {...props}
        backspaceRemovesValue
        isClearable
        onChange={onChangeSpy}
      />
    );
    fireEvent.keyDown(container.querySelector('.react-select__control'), {
      keyCode: 8,
      key: 'Backspace',
    });
    expect(onChangeSpy).toHaveBeenCalledWith(null, expectedValue);
  },
  {
    'and isMulti is false': {
      props: {
        ...BASIC_PROPS,
        isMulti: false,
      },
      expectedValue: {
        action: 'clear',
        name: 'test-input-name',
      },
    },
    'and isMulti is true': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
      },
      expectedValue: {
        action: 'pop-value',
        name: 'test-input-name',
        removedValue: undefined,
      },
    },
  }
);

test('multi select > clicking on X next to option will call onChange with all options other that the clicked option', () => {
  let onChangeSpy = jest.fn();
  let { container } = render(
    <Select
      {...BASIC_PROPS}
      isMulti
      onChange={onChangeSpy}
      value={[OPTIONS[0], OPTIONS[2], OPTIONS[4]]}
    />
  );
  // there are 3 values in select
  expect(container.querySelectorAll('.react-select__multi-value').length).toBe(
    3
  );

  const selectValueElement = [
    ...container.querySelectorAll('.react-select__multi-value'),
  ].find(multiValue => multiValue.textContent === '4');
  userEvent.click(
    selectValueElement.querySelector('div.react-select__multi-value__remove')
  );

  expect(onChangeSpy).toHaveBeenCalledWith(
    [
      { label: '0', value: 'zero' },
      { label: '2', value: 'two' },
    ],
    {
      action: 'remove-value',
      removedValue: { label: '4', value: 'four' },
      name: BASIC_PROPS.name,
    }
  );
});

/**
 * TODO: Need to get hightlight a menu option and then match value with aria-activedescendant prop
 */
cases(
  'accessibility > aria-activedescendant',
  ({ props = { ...BASIC_PROPS } }) => {
    let { container } = render(<Select {...props} menuIsOpen />);

    fireEvent.keyDown(container.querySelector('.react-select__menu'), {
      keyCode: 40,
      key: 'ArrowDown',
    });
    expect(
      container
        .querySelector('.react-select__input input')
        .getAttribute('aria-activedescendant')
    ).toBe('1');
  },
  {
    'single select > should update aria-activedescendant as per focused option': {
      skip: true,
    },
    'multi select > should update aria-activedescendant as per focused option': {
      skip: true,
      props: {
        ...BASIC_PROPS,
        value: { label: '2', value: 'two' },
      },
    },
  }
);

cases(
  'accessibility > passes through aria-labelledby prop',
  ({ props = { ...BASIC_PROPS, 'aria-labelledby': 'testing' } }) => {
    let { container } = render(<Select {...props} />);
    expect(
      container
        .querySelector('.react-select__input input')
        .getAttribute('aria-labelledby')
    ).toBe('testing');
  },
  {
    'single select > should pass aria-labelledby prop down to input': {},
    'multi select > should pass aria-labelledby prop down to input': {
      props: {
        ...BASIC_PROPS,
        'aria-labelledby': 'testing',
        isMulti: true,
      },
    },
  }
);

cases(
  'accessibility > passes through aria-label prop',
  ({ props = { ...BASIC_PROPS, 'aria-label': 'testing' } }) => {
    let { container } = render(<Select {...props} />);
    expect(
      container
        .querySelector('.react-select__input input')
        .getAttribute('aria-label')
    ).toBe('testing');
  },
  {
    'single select > should pass aria-labelledby prop down to input': {},
    'multi select > should pass aria-labelledby prop down to input': {
      props: {
        ...BASIC_PROPS,
        'aria-label': 'testing',
        isMulti: true,
      },
    },
  }
);

test('accessibility > to show the number of options available in A11yText when the menu is Open', () => {
  let { container, rerender } = render(
    <Select {...BASIC_PROPS} inputValue={''} autoFocus menuIsOpen />
  );

  let setInputValue = val => {
    rerender(<Select {...BASIC_PROPS} autoFocus menuIsOpen inputValue={val} />);
  };

  const liveRegionId = '#aria-context';
  fireEvent.focus(container.querySelector('.react-select__input input'));

  expect(container.querySelector(liveRegionId).textContent).toMatch(
    /17 results available/
  );

  setInputValue('0');
  expect(container.querySelector(liveRegionId).textContent).toMatch(
    /2 results available/
  );

  setInputValue('10');
  expect(container.querySelector(liveRegionId).textContent).toMatch(
    /1 result available/
  );

  setInputValue('100');
  expect(container.querySelector(liveRegionId).textContent).toMatch(
    /0 results available/
  );
});

test('accessibility > interacting with disabled options shows correct A11yText', () => {
  let { container } = render(
    <Select
      {...BASIC_PROPS}
      options={OPTIONS_DISABLED}
      inputValue={''}
      menuIsOpen
    />
  );
  const liveRegionId = '#aria-context';
  const liveRegionEventId = '#aria-selection-event';
  fireEvent.focus(container.querySelector('.react-select__input input'));

  // navigate to disabled option
  let menu = container.querySelector('.react-select__menu');
  fireEvent.keyDown(menu, { keyCode: 40, key: 'ArrowDown' });
  fireEvent.keyDown(menu, { keyCode: 40, key: 'ArrowDown' });

  expect(container.querySelector(liveRegionId).textContent).toMatch(
    'option 1 focused disabled, 2 of 17. 17 results available. Use Up and Down to choose options, press Escape to exit the menu, press Tab to select the option and exit the menu.'
  );

  // attempt to select disabled option
  fireEvent.keyDown(container.querySelector('.react-select__menu'), {
    keyCode: 13,
    key: 'Enter',
  });

  expect(container.querySelector(liveRegionEventId).textContent).toMatch(
    'option 1 is disabled. Select another option.'
  );
});

test('accessibility > screenReaderStatus function prop > to pass custom text to A11yText', () => {
  const screenReaderStatus = ({ count }) =>
    `There are ${count} options available`;

  const liveRegionId = '#aria-context';
  let { container, rerender } = render(
    <Select
      {...BASIC_PROPS}
      inputValue={''}
      screenReaderStatus={screenReaderStatus}
      menuIsOpen
    />
  );

  let setInputValue = val => {
    rerender(
      <Select
        {...BASIC_PROPS}
        screenReaderStatus={screenReaderStatus}
        menuIsOpen
        inputValue={val}
      />
    );
  };

  fireEvent.focus(container.querySelector('.react-select__input input'));

  expect(container.querySelector(liveRegionId).textContent).toMatch(
    'There are 17 options available'
  );

  setInputValue('0');
  expect(container.querySelector(liveRegionId).textContent).toMatch(
    'There are 2 options available'
  );

  setInputValue('10');
  expect(container.querySelector(liveRegionId).textContent).toMatch(
    'There are 1 options available'
  );

  setInputValue('100');
  expect(container.querySelector(liveRegionId).textContent).toMatch(
    'There are 0 options available'
  );
});

test('closeMenuOnSelect prop > when passed as false it should not call onMenuClose on selecting option', () => {
  let onMenuCloseSpy = jest.fn();
  let { container } = render(
    <Select
      {...BASIC_PROPS}
      onMenuClose={onMenuCloseSpy}
      menuIsOpen
      closeMenuOnSelect={false}
      blurInputOnSelect={false}
    />
  );
  userEvent.click(container.querySelector('div.react-select__option'));
  expect(onMenuCloseSpy).not.toHaveBeenCalled();
});

cases(
  'autoFocus',
  ({ props = { ...BASIC_PROPS, autoFocus: true } }) => {
    let { container } = render(<Select {...props} />);
    expect(container.querySelector('.react-select__input input')).toBe(
      document.activeElement
    );
  },
  {
    'single select > should focus select on mount': {},
    'multi select > should focus select on mount': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
        autoFocus: true,
      },
    },
  }
);

/**
 * onFocus hook is not being called when component is mounted is autoFocus true
 * Reproducible here ->  https://codesandbox.io/s/71xrkj0qj
 */
cases(
  'onFocus prop with autoFocus',
  ({ props = { ...BASIC_PROPS, autoFocus: true } }) => {
    let onFocusSpy = jest.fn();
    let { container } = render(<Select {...props} onFocus={onFocusSpy} />);
    expect(container.querySelector('.react-select__input input')).toBe(
      document.activeElement
    );
    expect(onFocusSpy).toHaveBeenCalledTimes(1);
  },
  {
    'single select > should call auto focus only once when select is autoFocus': {
      skip: true,
    },
    'multi select > should call auto focus only once when select is autoFocus': {
      skip: true,
      props: {
        ...BASIC_PROPS,
        autoFocus: true,
        isMulti: true,
      },
    },
  }
);

cases(
  'onFocus prop is called on on focus of input',
  ({ props = { ...BASIC_PROPS } }) => {
    let onFocusSpy = jest.fn();
    let { container } = render(<Select {...props} onFocus={onFocusSpy} />);
    fireEvent.focus(container.querySelector('.react-select__input input'));
    expect(onFocusSpy).toHaveBeenCalledTimes(1);
  },
  {
    'single select > should call onFocus handler on focus on input': {},
    'multi select > should call onFocus handler on focus on input': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
      },
    },
  }
);

cases(
  'onBlur prop',
  ({ props = { ...BASIC_PROPS } }) => {
    let onBlurSpy = jest.fn();
    let { container } = render(
      <Select
        {...props}
        onBlur={onBlurSpy}
        onInputChange={jest.fn()}
        onMenuClose={jest.fn()}
      />
    );
    fireEvent.blur(container.querySelector('.react-select__input input'));
    expect(onBlurSpy).toHaveBeenCalledTimes(1);
  },
  {
    'single select > should call onBlur handler on blur on input': {},
    'multi select > should call onBlur handler on blur on input': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
      },
    },
  }
);

test('onInputChange() function prop to be called on blur', () => {
  let onInputChangeSpy = jest.fn();
  let { container } = render(
    <Select
      {...BASIC_PROPS}
      onBlur={jest.fn()}
      onInputChange={onInputChangeSpy}
      onMenuClose={jest.fn()}
    />
  );
  fireEvent.blur(container.querySelector('.react-select__input input'));
  // Once by blur and other time by menu-close
  expect(onInputChangeSpy).toHaveBeenCalledTimes(2);
});

test('onMenuClose() function prop to be called on blur', () => {
  let onMenuCloseSpy = jest.fn();
  let { container } = render(
    <Select
      {...BASIC_PROPS}
      onBlur={jest.fn()}
      onInputChange={jest.fn()}
      onMenuClose={onMenuCloseSpy}
    />
  );
  fireEvent.blur(container.querySelector('.react-select__input input'));
  expect(onMenuCloseSpy).toHaveBeenCalledTimes(1);
});

cases(
  'placeholder',
  ({ props, expectPlaceholder = 'Select...' }) => {
    let { container } = render(<Select {...props} />);
    expect(container.querySelector('.react-select__control').textContent).toBe(
      expectPlaceholder
    );
  },
  {
    'single select > should display default placeholder "Select..."': {
      props: BASIC_PROPS,
    },
    'single select > should display provided string placeholder': {
      props: {
        ...BASIC_PROPS,
        placeholder: 'single Select...',
      },
      expectPlaceholder: 'single Select...',
    },
    'single select > should display provided node placeholder': {
      props: {
        ...BASIC_PROPS,
        placeholder: <span>single Select...</span>,
      },
      expectPlaceholder: 'single Select...',
    },
    'multi select > should display default placeholder "Select..."': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
      },
    },
    'multi select > should display provided placeholder': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
        placeholder: 'multi Select...',
      },
      expectPlaceholder: 'multi Select...',
    },
  }
);

cases(
  'display placeholder once value is removed',
  ({ props }) => {
    let { container, rerender } = render(<Select {...props} />);
    expect(
      container.querySelector('.react-select__placeholder')
    ).not.toBeInTheDocument();
    rerender(<Select {...props} value="" />);
    expect(
      container.querySelector('.react-select__placeholder')
    ).toBeInTheDocument();
  },
  {
    'single select > should display placeholder once the value is removed from select': {
      props: {
        ...BASIC_PROPS,
        value: OPTIONS[0],
      },
    },
    'multi select > should display placeholder once the value is removed from select': {
      props: {
        ...BASIC_PROPS,
        value: OPTIONS[0],
      },
    },
  }
);

test('renders a read only input when isSearchable is false', () => {
  let { container } = render(
    <Select
      classNamePrefix="react-select"
      options={OPTIONS}
      isSearchable={false}
    />
  );
  let input = container.querySelector('.react-select__value-container input');
  expect(input.readOnly).toBe(true);
});

cases(
  'clicking on disabled option',
  ({ props = BASIC_PROPS, optionsSelected }) => {
    let onChangeSpy = jest.fn();
    props = { ...props, onChange: onChangeSpy };
    let { container } = render(<Select {...props} menuIsOpen />);
    let selectOption = [
      ...container.querySelectorAll('div.react-select__option'),
    ].find(n => n.textContent === optionsSelected);
    userEvent.click(selectOption);
    expect(onChangeSpy).not.toHaveBeenCalled();
  },
  {
    'single select > should not select the disabled option': {
      props: {
        ...BASIC_PROPS,
        options: [
          { label: 'option 1', value: 'opt1' },
          { label: 'option 2', value: 'opt2', isDisabled: true },
        ],
      },
      optionsSelected: 'option 2',
    },
    'multi select > should not select the disabled option': {
      props: {
        ...BASIC_PROPS,
        options: [
          { label: 'option 1', value: 'opt1' },
          { label: 'option 2', value: 'opt2', isDisabled: true },
        ],
      },
      optionsSelected: 'option 2',
    },
  }
);

cases(
  'pressing enter on disabled option',
  ({ props = BASIC_PROPS, optionsSelected }) => {
    let onChangeSpy = jest.fn();
    props = { ...props, onChange: onChangeSpy };
    let { container } = render(<Select {...props} menuIsOpen />);
    let selectOption = [
      ...container.querySelectorAll('div.react-select__option'),
    ].find(n => n.textContent === optionsSelected);
    fireEvent.keyDown(selectOption, { keyCode: 13, key: 'Enter' });
    expect(onChangeSpy).not.toHaveBeenCalled();
  },
  {
    'single select > should not select the disabled option': {
      props: {
        ...BASIC_PROPS,
        options: [
          { label: 'option 1', value: 'opt1' },
          { label: 'option 2', value: 'opt2', isDisabled: true },
        ],
      },
      optionsSelected: 'option 2',
    },
    'multi select > should not select the disabled option': {
      props: {
        ...BASIC_PROPS,
        options: [
          { label: 'option 1', value: 'opt1' },
          { label: 'option 2', value: 'opt2', isDisabled: true },
        ],
      },
      optionsSelected: 'option 2',
    },
  }
);

test('does not select anything when a disabled option is the only item in the list after a search', () => {
  let onChangeSpy = jest.fn();
  const options = [
    { label: 'opt', value: 'opt1', isDisabled: true },
    ...OPTIONS,
  ];
  const props = { ...BASIC_PROPS, onChange: onChangeSpy, options };
  let { container, rerender } = render(
    <Select {...props} menuIsOpen inputValue="" />
  );
  rerender(<Select {...props} menuIsOpen inputValue="opt" />);

  fireEvent.keyDown(container.querySelector('.react-select__menu'), {
    keyCode: 13,
    key: 'Enter',
  });

  expect(onChangeSpy).not.toHaveBeenCalled();
  // Menu is still open
  expect(container.querySelector('.react-select__option').textContent).toBe(
    'opt'
  );
});

test('render custom Input Component', () => {
  const InputComponent = () => <div className="my-input-component" />;
  let { container } = render(
    <Select {...BASIC_PROPS} components={{ Input: InputComponent }} />
  );

  expect(
    container.querySelector('.react-select__input input')
  ).not.toBeInTheDocument();
  expect(container.querySelector('.my-input-component')).toBeInTheDocument();
});

test('render custom Menu Component', () => {
  const MenuComponent = () => <div className="my-menu-component" />;
  let { container } = render(
    <Select {...BASIC_PROPS} menuIsOpen components={{ Menu: MenuComponent }} />
  );

  expect(
    container.querySelector('.react-select__menu')
  ).not.toBeInTheDocument();
  expect(container.querySelector('.my-menu-component')).toBeInTheDocument();
});

test('render custom Option Component', () => {
  const OptionComponent = () => <div className="my-option-component" />;
  let { container } = render(
    <Select
      {...BASIC_PROPS}
      components={{ Option: OptionComponent }}
      menuIsOpen
    />
  );

  expect(
    container.querySelector('.react-select__option')
  ).not.toBeInTheDocument();
  expect(container.querySelector('.my-option-component')).toBeInTheDocument();
});

cases(
  'isClearable is false',
  ({ props = BASIC_PROPS }) => {
    let { container } = render(<Select {...props} />);
    expect(
      container.querySelector('react-select__clear-indicator')
    ).not.toBeInTheDocument();
  },
  {
    'single select > should not show the X (clear) button': {
      props: {
        ...BASIC_PROPS,
        isClearable: false,
        value: OPTIONS[0],
      },
    },
    'multi select > should not show X (clear) button': {
      ...BASIC_PROPS,
      isMulti: true,
      isClearable: false,
      value: [OPTIONS[0]],
    },
  }
);

test('clear select by clicking on clear button > should not call onMenuOpen', () => {
  let onChangeSpy = jest.fn();
  let props = { ...BASIC_PROPS, onChange: onChangeSpy };
  let { container } = render(
    <Select {...props} isMulti value={[OPTIONS[0]]} />
  );

  expect(container.querySelectorAll('.react-select__multi-value').length).toBe(
    1
  );
  fireEvent.mouseDown(
    container.querySelector('.react-select__clear-indicator'),
    { button: 0 }
  );
  expect(onChangeSpy).toBeCalledWith(null, {
    action: 'clear',
    name: BASIC_PROPS.name,
  });
});

test('clearing select using clear button to not call onMenuOpen or onMenuClose', () => {
  let onMenuCloseSpy = jest.fn();
  let onMenuOpenSpy = jest.fn();
  let props = {
    ...BASIC_PROPS,
    onMenuClose: onMenuCloseSpy,
    onMenuOpen: onMenuOpenSpy,
  };
  let { container } = render(
    <Select {...props} isMulti value={[OPTIONS[0]]} />
  );
  expect(container.querySelectorAll('.react-select__multi-value').length).toBe(
    1
  );
  fireEvent.mouseDown(
    container.querySelector('.react-select__clear-indicator'),
    { button: 0 }
  );
  expect(onMenuOpenSpy).not.toHaveBeenCalled();
  expect(onMenuCloseSpy).not.toHaveBeenCalled();
});

test('multi select >  calls onChange when option is selected and isSearchable is false', () => {
  let onChangeSpy = jest.fn();
  let props = { ...BASIC_PROPS, onChange: onChangeSpy };
  let { container } = render(
    <Select {...props} isMulti menuIsOpen delimiter="," isSearchable={false} />
  );
  userEvent.click(container.querySelector('.react-select__option'));
  const selectedOption = { label: '0', value: 'zero' };
  expect(onChangeSpy).toHaveBeenCalledWith([selectedOption], {
    action: 'select-option',
    option: selectedOption,
    name: BASIC_PROPS.name,
  });
});

test('getOptionLabel() prop > to format the option label', () => {
  const getOptionLabel = option => `This a custom option ${option.label} label`;
  const { container } = render(
    <Select {...BASIC_PROPS} menuIsOpen getOptionLabel={getOptionLabel} />
  );
  expect(container.querySelector('.react-select__option').textContent).toBe(
    'This a custom option 0 label'
  );
});

test('formatGroupLabel function prop > to format Group label', () => {
  const formatGroupLabel = group => `This is custom ${group.label} header`;
  const options = [
    {
      label: 'group 1',
      options: [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
      ],
    },
  ];
  const { container } = render(
    <Select
      classNamePrefix="react-select"
      options={options}
      menuIsOpen
      formatGroupLabel={formatGroupLabel}
    />
  );
  expect(
    container.querySelector('.react-select__group-heading').textContent
  ).toBe('This is custom group 1 header');
});

test('to only render groups with at least one match when filtering', () => {
  const options = [
    {
      label: 'group 1',
      options: [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
      ],
    },
    {
      label: 'group 2',
      options: [
        { value: 3, label: '3' },
        { value: 4, label: '4' },
      ],
    },
  ];
  const { container } = render(
    <Select
      classNamePrefix="react-select"
      options={options}
      menuIsOpen
      inputValue="1"
    />
  );

  expect(container.querySelectorAll('.react-select__group').length).toBe(1);
  expect(
    container
      .querySelector('.react-select__group')
      .querySelectorAll('.react-select__option').length
  ).toBe(1);
});

test('not render any groups when there is not a single match when filtering', () => {
  const options = [
    {
      label: 'group 1',
      options: [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
      ],
    },
    {
      label: 'group 2',
      options: [
        { value: 3, label: '3' },
        { value: 4, label: '4' },
      ],
    },
  ];
  const { container } = render(
    <Select
      classNamePrefix="react-select"
      options={options}
      menuIsOpen
      inputValue="5"
    />
  );

  expect(container.querySelectorAll('.react-select__group').length).toBe(0);
});

test('multi select > have default value delimiter seperated', () => {
  let { container } = render(
    <Select
      {...BASIC_PROPS}
      delimiter={';'}
      isMulti
      value={[OPTIONS[0], OPTIONS[1]]}
    />
  );
  expect(container.querySelector('input[type="hidden"]').value).toBe(
    'zero;one'
  );
});

test('multi select > with multi character delimiter', () => {
  let { container } = render(
    <Select
      {...BASIC_PROPS}
      delimiter={'===&==='}
      isMulti
      value={[OPTIONS[0], OPTIONS[1]]}
    />
  );
  expect(container.querySelector('input[type="hidden"]').value).toBe(
    'zero===&===one'
  );
});

test('hitting spacebar should select option if isSearchable is false', () => {
  let onChangeSpy = jest.fn();
  let props = { ...BASIC_PROPS, onChange: onChangeSpy };
  let { container } = render(<Select {...props} isSearchable menuIsOpen />);
  // focus the first option
  fireEvent.keyDown(container.querySelector('.react-select__menu'), {
    keyCode: 40,
    key: 'ArrowDown',
  });
  fireEvent.keyDown(container.querySelector('.react-select'), {
    keyCode: 32,
    key: ' ',
  });
  expect(onChangeSpy).toHaveBeenCalledWith(
    { label: '0', value: 'zero' },
    { action: 'select-option', name: BASIC_PROPS.name }
  );
});

test('hitting escape does not call onChange if menu is Open', () => {
  let onChangeSpy = jest.fn();
  let props = { ...BASIC_PROPS, onChange: onChangeSpy };
  let { container } = render(
    <Select {...props} menuIsOpen escapeClearsValue isClearable />
  );

  // focus the first option
  fireEvent.keyDown(container.querySelector('.react-select__menu'), {
    keyCode: 40,
    key: 'ArrowDown',
  });
  expect(onChangeSpy).not.toHaveBeenCalled();
});

test('multi select > removes the selected option from the menu options when isSearchable is false', () => {
  let { container, rerender } = render(
    <Select
      {...BASIC_PROPS}
      delimiter=","
      isMulti
      isSearchable={false}
      menuIsOpen
    />
  );
  expect(container.querySelectorAll('.react-select__option').length).toBe(17);
  rerender(
    <Select
      {...BASIC_PROPS}
      delimiter=","
      isMulti
      isSearchable={false}
      menuIsOpen
      value={OPTIONS[0]}
    />
  );
  // expect '0' to not be options
  container.querySelectorAll('.react-select__option').forEach(option => {
    expect(option.textContent).not.toBe('0');
  });
  expect(container.querySelectorAll('.react-select__option').length).toBe(16);
});

test('hitting ArrowUp key on closed select should focus last element', () => {
  let { container } = render(<Select {...BASIC_PROPS} menuIsOpen />);

  fireEvent.keyDown(container.querySelector('.react-select__control'), {
    keyCode: 38,
    key: 'ArrowUp',
  });

  expect(
    container.querySelector('.react-select__option--is-focused').textContent
  ).toEqual('16');
});

test('close menu on hitting escape and clear input value if menu is open even if escapeClearsValue and isClearable are true', () => {
  let onMenuCloseSpy = jest.fn();
  let onInputChangeSpy = jest.fn();
  let props = {
    ...BASIC_PROPS,
    onInputChange: onInputChangeSpy,
    onMenuClose: onMenuCloseSpy,
    value: OPTIONS[0],
  };
  let { container } = render(
    <Select {...props} menuIsOpen escapeClearsValue isClearable />
  );
  fireEvent.keyDown(container.querySelector('.react-select'), {
    keyCode: 27,
    key: 'Escape',
  });
  expect(
    container.querySelector('.react-select__single-value').textContent
  ).toEqual('0');

  expect(onMenuCloseSpy).toHaveBeenCalled();
  // once by onMenuClose and other is direct
  expect(onInputChangeSpy).toHaveBeenCalledTimes(2);
  expect(onInputChangeSpy).toHaveBeenCalledWith('', { action: 'menu-close' });
  expect(onInputChangeSpy).toHaveBeenLastCalledWith('', {
    action: 'menu-close',
  });
});

test('to not clear value when hitting escape if escapeClearsValue is false (default) and isClearable is false', () => {
  let onChangeSpy = jest.fn();
  let props = { ...BASIC_PROPS, onChange: onChangeSpy, value: OPTIONS[0] };
  let { container } = render(
    <Select {...props} escapeClearsValue isClearable={false} />
  );

  fireEvent.keyDown(container.querySelector('.react-select'), {
    keyCode: 27,
    key: 'Escape',
  });
  expect(onChangeSpy).not.toHaveBeenCalled();
});

test('to not clear value when hitting escape if escapeClearsValue is true and isClearable is false', () => {
  let onChangeSpy = jest.fn();
  let props = { ...BASIC_PROPS, onChange: onChangeSpy, value: OPTIONS[0] };
  let { container } = render(
    <Select {...props} escapeClearsValue isClearable={false} />
  );

  fireEvent.keyDown(container.querySelector('.react-select'), {
    keyCode: 27,
    key: 'Escape',
  });
  expect(onChangeSpy).not.toHaveBeenCalled();
});

test('to not clear value when hitting escape if escapeClearsValue is false (default) and isClearable is true', () => {
  let onChangeSpy = jest.fn();
  let props = { ...BASIC_PROPS, onChange: onChangeSpy, value: OPTIONS[0] };
  let { container } = render(<Select {...props} isClearable />);

  fireEvent.keyDown(container.querySelector('.react-select'), {
    keyCode: 27,
    key: 'Escape',
  });
  expect(onChangeSpy).not.toHaveBeenCalled();
});

test('to clear value when hitting escape if escapeClearsValue and isClearable are true', () => {
  let onInputChangeSpy = jest.fn();
  let props = { ...BASIC_PROPS, onChange: onInputChangeSpy, value: OPTIONS[0] };
  let { container } = render(
    <Select {...props} isClearable escapeClearsValue />
  );

  fireEvent.keyDown(container.querySelector('.react-select'), {
    keyCode: 27,
    key: 'Escape',
  });
  expect(onInputChangeSpy).toHaveBeenCalledWith(null, {
    action: 'clear',
    name: BASIC_PROPS.name,
  });
});

/**
 * Selects the option on hitting spacebar on V2
 * Needs varification
 */
test.skip('hitting spacebar should not select option if isSearchable is true (default)', () => {
  // let onChangeSpy = jest.fn();
  // let props = { ...BASIC_PROPS, onChange: onChangeSpy };
  // let { container } = render(<Select {...props} menuIsOpen />);
  // // Open Menu
  // selectWrapper.setState({ focusedOption: OPTIONS[0] });
  // fireEvent.keyDown(container, { keyCode: 32, key: ' ' });
  // expect(onChangeSpy).not.toHaveBeenCalled();
});

test('renders with custom theme', () => {
  const primary = 'rgb(255, 164, 83)';
  const { container } = render(
    <Select
      {...BASIC_PROPS}
      value={OPTIONS[0]}
      menuIsOpen
      theme={theme => ({
        ...theme,
        borderRadius: 180,
        colors: {
          ...theme.colors,
          primary,
        },
      })}
    />
  );
  const menu = container.querySelector('.react-select__menu');
  expect(
    window.getComputedStyle(menu).getPropertyValue('border-radius')
  ).toEqual('180px');
  const firstOption = container.querySelector('.react-select__option');
  expect(
    window.getComputedStyle(firstOption).getPropertyValue('background-color')
  ).toEqual(primary);
});
