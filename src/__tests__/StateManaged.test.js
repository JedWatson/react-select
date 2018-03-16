import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import cases from 'jest-in-case';

import { OPTIONS } from './constants';
import Select from '../';
import { components } from '../components';

const { Control, Menu, Option } = components;

const BASIC_PROPS = { options: OPTIONS, name: 'test-input-name' };

test('defaults > snapshot', () => {

  const tree = shallow(<Select />);
  expect(toJson(tree)).toMatchSnapshot();
});

test('multi select > selecting multiple values', () => {
  let selectWrapper = mount(<Select {...BASIC_PROPS} isMulti />);
  // Open Menu
  selectWrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });
  selectWrapper.find(Menu).simulate('keyDown', { keyCode: 13, key: 'Enter' });
  expect(selectWrapper.find(Control).text()).toBe('0');

  selectWrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });
  selectWrapper.find(Menu).simulate('keyDown', { keyCode: 13, key: 'Enter' });
  expect(selectWrapper.find(Control).text()).toBe('01');
});

test('multi select > to not show selected value in options', () => {
  let selectWrapper = mount(<Select {...BASIC_PROPS} isMulti />);

  // Open Menu
  selectWrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });

  let availableOptions = selectWrapper.find(Option).map(option => option.text());
  expect(availableOptions.indexOf('0') > -1).toBeTruthy();

  // select the first option
  selectWrapper.find(Menu).simulate('keyDown', { keyCode: 13, key: 'Enter' });
  
  // Re-open Menu
  selectWrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });
  availableOptions = selectWrapper.find(Option).map(option => option.text());

  expect(availableOptions.indexOf('0') > -1).toBeFalsy();
});

test('multi select > remove the last selected option on backspace', () => {
  let selectWrapper = mount(<Select {...BASIC_PROPS} isMulti />);

  // Open Menu
  selectWrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });

  // select the first option
  selectWrapper.find(Menu).simulate('keyDown', { keyCode: 13, key: 'Enter' });
  
  // Re-open Menu
  selectWrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });
  // select the first option again
  selectWrapper.find(Menu).simulate('keyDown', { keyCode: 13, key: 'Enter' });
  expect(selectWrapper.find(Control).text()).toBe('01');

  selectWrapper.find(Control).simulate('keyDown', { keyCode: 8, key: 'Backspace' });
  expect(selectWrapper.find(Control).text()).toBe('0');
});

cases('hitting backspace with selected options', ({ props = BASIC_PROPS, expectedValueAfterBackSpace }) => {
  let selectWrapper = mount(<Select {...props} />);
  expect(selectWrapper.find(Control).text()).toBe(props.value.label);
  selectWrapper.find(Control).simulate('keyDown', { keyCode: 8, key: 'Backspace' });
  expect(selectWrapper.find(Control).text()).toBe(expectedValueAfterBackSpace);

}, {
  'single select > should not remove when backspaceRemovesValue is false': {
    props: {
      ...BASIC_PROPS,
      backspaceRemovesValue: false,
      value: OPTIONS[3],
    },
    expectedValueAfterBackSpace: OPTIONS[3].label,
  },
  'single select > should remove when backspaceRemovesValue is true': {
    props: {
      ...BASIC_PROPS,
      backspaceRemovesValue: true,
      value: OPTIONS[3],
    },
    expectedValueAfterBackSpace: '',
    skip: true,
  },
  'multi select - should not remove when backspaceRemovesValue is false': {
    props: {
      ...BASIC_PROPS,
      isMulti: false,
      backspaceRemovesValue: false,
      value: OPTIONS[5],
    },
    expectedValueAfterBackSpace: OPTIONS[5].label,
  },
  'multi select - should not remove when backspaceRemovesValue is true': {
    props: {
      ...BASIC_PROPS,
      isMulti: false,
      backspaceRemovesValue: true,
      value: OPTIONS[5],
    },
    expectedValueAfterBackSpace: '',
    skip: true,
  }
});

cases('click on dropdown indicator', ({ props = BASIC_PROPS }) => {
  let selectWrapper = mount(<Select {...props} />);
  // Menu not open by defualt
  expect(selectWrapper.find(Menu).exists()).toBeFalsy();
  // Open Menu
  selectWrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });
  expect(selectWrapper.find(Menu).exists()).toBeTruthy();
  
  // close open menu
  selectWrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });
  expect(selectWrapper.find(Menu).exists()).toBeFalsy();
}, {
  'single select > should toggle Menu': {
  },
  'multi select > should toggle Menu': {
    props: {
      ...BASIC_PROPS,
      isMulti: true,
    }
  },
});

cases('selecting an option > mouse interaction', ({ props = { ...BASIC_PROPS }, event, selectOption, expectSelectedOption }) => {
  let selectWrapper = mount(<Select {...props} />);
  let toSelectOption = selectWrapper.find('div.react-select__option').findWhere(n =>n.props().children === selectOption.label);
  toSelectOption.simulate(...event);
  expect(selectWrapper.find('input[type="hidden"]').props().value).toBe(expectSelectedOption);
}, {
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
  }
});

cases('selection an option > keyboard interaction', ({ props = { ...BASIC_PROPS }, eventsToSimulate, expectedSelectedOption }) => {
  let selectWrapper = mount(<Select {...props} />);
  // open the menu
  selectWrapper.find('div.react-select__dropdown-indicator').simulate('keyDown', { keyCode: 40, key: 'ArrowDown' });
  eventsToSimulate.map(eventToSimulate => {
    selectWrapper.find(Menu).simulate(...eventToSimulate);
  });
  selectWrapper.find(Menu).simulate('keyDown', { keyCode: 13, key: 'Enter' });
  expect(selectWrapper.find('input[type="hidden"]').props().value).toBe(expectedSelectedOption);
}, {
  'single select > open select and hit enter > should select first option': {
    eventsToSimulate: [
    ],
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
    eventsToSimulate: [
      ['keyDown', { keyCode: 38, key: 'ArrowUp' }],
    ],
    expectedSelectedOption: OPTIONS[OPTIONS.length - 1].value,
  },
  'single select > (open select -> 1 x PageDown -> Enter) > should select the first option on next page - default pageSize 5': {
    eventsToSimulate: [
      ['keyDown', { keyCode: 34, key: 'PageDown' }],
    ],
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
    eventsToSimulate: [
      ['keyDown', { keyCode: 35, key: 'End' }],
    ],
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
    eventsToSimulate: [
      ['keyDown', { keyCode: 38, key: 'ArrowUp' }],
    ],
    expectedSelectedOption: OPTIONS[OPTIONS.length - 1].value,
  },
  'multi select > open select and hit enter > should select first option': {
    props: {
      ...BASIC_PROPS,
      isMulti: true,
    },
    eventsToSimulate: [
    ],
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
    eventsToSimulate: [
      ['keyDown', { keyCode: 38, key: 'ArrowUp' }],
    ],
    expectedSelectedOption: OPTIONS[OPTIONS.length - 1].value,
  },
  'multi select > (open select -> 1 x PageDown -> Enter) > should select the first option on next page - default pageSize 5': {
    props: {
      ...BASIC_PROPS,
      isMulti: true,
    },
    eventsToSimulate: [
      ['keyDown', { keyCode: 34, key: 'PageDown' }],
    ],
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
    eventsToSimulate: [
      ['keyDown', { keyCode: 35, key: 'End' }],
    ],
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
    eventsToSimulate: [
      ['keyDown', { keyCode: 38, key: 'ArrowUp' }],
    ],
    expectedSelectedOption: OPTIONS[OPTIONS.length - 1].value,
  },
});


