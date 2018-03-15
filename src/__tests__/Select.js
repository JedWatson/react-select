import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import cases from 'jest-in-case';

import Select from '../Select';
import { components } from '../components';

const { Menu, MultiValue, NoOptionsMessage, Option, SingleValue } = components;

const opts = [
  { label: '1', value: 'one' },
  { label: '2', value: 'two' },
  { label: '3', value: 'three' },
];

test('snapshot - defaults', () => {
  const tree = shallow(<Select />);
  expect(toJson(tree)).toMatchSnapshot();
});

cases('formatOptionLabel', ({ props, valueComponent, expectedOptions }) => {
  let tree = shallow(
    <Select
      {...props}
    />
  );
  let value = tree.find(valueComponent).at(0);
  expect(value.props().children).toBe(expectedOptions);
}, {
    'for single select': {
      props: {
        formatOptionLabel: ({ label, value }, { context }) => (`${label} ${value} ${context}`),
        options: opts,
        value: opts[0],
      },
      valueComponent: SingleValue,
      expectedOptions: '1 one value'
    },
    'for multi select': {
      props: {
        formatOptionLabel: ({ label, value }, { context }) => (`${label} ${value} ${context}`),
        isMulti: true,
        options: opts,
        value: opts[0],
      },
      valueComponent: MultiValue,
      expectedOptions: '1 one value'
    }
  });

cases('should assign the given name', ({ expectedName, props }) => {
  let tree = shallow(<Select {...props} />);
  let input = tree.find('input');
  expect(input.props().name).toBe(expectedName);
}, {
    'for single select': { props: { name: 'form-field-single-select' }, expectedName: 'form-field-single-select' },
    'for multi select': {
      props: {
        name: 'form-field-multi-select',
        isMulti: true,
        options: opts,
        value: opts[2]
      },
      expectedName: 'form-field-multi-select'
    },
  });

cases('should show and hide menu based on menuIsOpen prop', ({ props }) => {
  let selectWrapper = shallow(<Select {...props} />);
  expect(selectWrapper.find(Menu).exists()).toBeTruthy();

  selectWrapper.setProps({ menuIsOpen: false });
  expect(selectWrapper.find(Menu).exists()).toBeFalsy();
}, {
    'with single select': {
      props: {
        value: opts[2],
        menuIsOpen: true
      }
    },
    'with multi select': {
      props: {
        value: opts[2],
        menuIsOpen: true
      }
    }
  });

cases('filterOption - should filter as passed function', ({ props }) => {
  let selectWrapper = shallow(<Select {...props} />);
  selectWrapper.setProps({ inputValue: 'o' });
  expect(selectWrapper.find(Option).length).toBe(2);
  expect(selectWrapper.find(NoOptionsMessage).exists()).toBeFalsy();

  selectWrapper.setProps({ inputValue: 'on' });
  expect(selectWrapper.find(Option).length).toBe(1);
  expect(selectWrapper.find(NoOptionsMessage).exists()).toBeFalsy();

  selectWrapper.setProps({ inputValue: 'not' });
  expect(selectWrapper.find(Option).exists()).toBeFalsy();
  expect(selectWrapper.find(NoOptionsMessage).exists()).toBeTruthy();
}, {
    'single select': {
      props: {
        filterOption: (value, search) => value.value.indexOf(search) > -1,
        options: opts,
        value: opts[2],
        menuIsOpen: true
      },
    },
    'multi select': {
      props: {
        filterOption: (value, search) => value.value.indexOf(search) > -1,
        options: opts,
        value: opts[2],
        menuIsOpen: true,
        isMulti: true,
      },
    }
  });

cases('value prop - should set it as initial value', ({ props }) => {
  let selectWrapper = shallow(<Select {...props} />);
  expect(selectWrapper.state('selectValue')).toEqual([{ label: '3', value: 'three' }]);
}, {
    'for single select': {
      props: {
        options: opts,
        value: opts[2],
      }
    },
    'for multi select': {
      props: {
        isMulti: true,
        options: opts,
        value: opts[2],
      }
    }
  });

cases('calls onChange prop with selected option on selecting an option', ({ props, event, expectedSelectedOption, optionsSelected, focusedOption }) => {
  let spy = jest.fn();
  let multiSelectWrapper = mount(<Select options={opts} {...props} onChange={spy} />);

  let selectOption = multiSelectWrapper.find('div.react-select__option').findWhere(n => n.props().children === optionsSelected.label);
  multiSelectWrapper.setState({ focusedOption });

  selectOption.simulate(...event);
  expect(spy).toHaveBeenCalledWith(expectedSelectedOption, { action: 'select-option' });
}, {
    'single select - when clicked': {
      props: {
        menuIsOpen: true,
      },
      event: ['click'],
      optionsSelected: { label: '2', value: 'two' },
      expectedSelectedOption: { label: '2', value: 'two' },
    },
    'single select - when tab is pressed': {
      props: {
        menuIsOpen: true,
      },
      event: ['keyDown', { keyCode: 9 }],
      menuIsOpen: true,
      optionsSelected: { label: '1', value: 'one' },
      focusedOption: { label: '1', value: 'one' },
      expectedSelectedOption: { label: '1', value: 'one' },
    },
    'single select - when enter is pressed on option': {
      props: {
        menuIsOpen: true,
      },
      event: ['keyDown', { keyCode: 13 }],
      optionsSelected: { label: '3', value: 'three' },
      focusedOption: { label: '3', value: 'three' },
      expectedSelectedOption: { label: '3', value: 'three' },
    },
    'single select - when space bar is pressed': {
      props: {
        menuIsOpen: true,
      },
      event: ['keyDown', { keyCode: 32 }],
      optionsSelected: { label: '1', value: 'one' },
      focusedOption: { label: '1', value: 'one' },
      expectedSelectedOption: { label: '1', value: 'one' },
    },
    'multi select - when clicked': {
      props: {
        isMulti: true,
        menuIsOpen: true,
      },
      event: ['click'],
      optionsSelected: { label: '2', value: 'two' },
      expectedSelectedOption: [{ label: '2', value: 'two' }],
    },
    'multi select - when tab is pressed': {
      props: {
        isMulti: true,
        menuIsOpen: true,
      },
      event: ['keyDown', { keyCode: 9 }],
      menuIsOpen: true,
      optionsSelected: { label: '1', value: 'one' },
      focusedOption: { label: '1', value: 'one' },
      expectedSelectedOption: [{ label: '1', value: 'one' }],
    },
    'multi select - when enter is pressed on option': {
      props: {
        isMulti: true,
        menuIsOpen: true,
      },
      event: ['keyDown', { keyCode: 13 }],
      optionsSelected: { label: '3', value: 'three' },
      focusedOption: { label: '3', value: 'three' },
      expectedSelectedOption: [{ label: '3', value: 'three' }],
    },
    'multi select - when space bar is pressed': {
      props: {
        isMulti: true,
        menuIsOpen: true,
      },
      event: ['keyDown', { keyCode: 32 }],
      optionsSelected: { label: '1', value: 'one' },
      focusedOption: { label: '1', value: 'one' },
      expectedSelectedOption: [{ label: '1', value: 'one' }],
    },
  });

cases('should not call onChange prop when hitting', ({ props, event, focusedOption, optionsSelected }) => {
  let spy = jest.fn();
  let selectWrapper = mount(<Select {...props} onChange={spy} />);

  let selectOption = selectWrapper.find('div.react-select__option').findWhere(n => n.props().children === optionsSelected.label);
  selectWrapper.setState({ focusedOption });

  selectOption.simulate(...event);
  expect(spy).not.toHaveBeenCalled();

}, {
    'escape key - single select': {
      props: {
        options: opts,
        menuIsOpen: true,
      },
      optionsSelected: { label: '1', value: 'one' },
      focusedOption: { label: '1', value: 'one' },
      event: ['keyDown', { keyCode: 27 }],
    },
    'escape key - multi select': {
      props: {
        options: opts,
        isMulti: true,
        menuIsOpen: true,
      },
      optionsSelected: { label: '1', value: 'one' },
      focusedOption: { label: '1', value: 'one' },
      event: ['keyDown', { keyCode: 27 }],
    }
  });
