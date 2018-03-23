import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import cases from 'jest-in-case';

import { OPTIONS } from './constants';
import Select from '../';
import SelectBase from '../Select';
import { components } from '../components';

const { Control, Menu, MultiValue, Option } = components;

const BASIC_PROPS = { options: OPTIONS, name: 'test-input-name' };

test('defaults > snapshot', () => {
  const tree = shallow(<Select />);
  expect(toJson(tree)).toMatchSnapshot();
});

test('passes down the className prop', () => {
  let selectWrapper = mount(<Select {...BASIC_PROPS} className="test-class" />);
  expect(selectWrapper.find(SelectBase).props().className).toBe('test-class');
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

test('If menuIsOpen prop is passed Menu should not close on clicking Dropdown Indicator', () => {
  let selectWrapper = mount(<Select {...BASIC_PROPS} menuIsOpen />);
  expect(selectWrapper.find(Menu).exists()).toBeTruthy();

  selectWrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });
  expect(selectWrapper.find(Menu).exists()).toBeTruthy();
});

cases('clicking clearIndicator to clear select', ({ props = BASIC_PROPS }) => {
  let selectWrapper = mount(<Select {...props} isClearable />);
  // Open Menu
  selectWrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });
  // Select value
  selectWrapper.simulate('keyDown', { keyCode: 13, key: 'Enter' });
  // Menu is closed
  expect(selectWrapper.find(Menu).exists()).toBeFalsy();
  expect(selectWrapper.find('input[type="hidden"]').props().value).toBe('zero');

  selectWrapper.find('div.react-select__clear-indicator').simulate('mouseDown', { button: 0 });

  expect(selectWrapper.find(Menu).exists()).toBeFalsy();
  expect(selectWrapper.find('input[type="hidden"]').props().value).toBe('');
}, {
    'single select > should not show the X (clear) button and menu should remain close': {
      props: {
        ...BASIC_PROPS,
      },
    },
    'multi select > should not show X (sdfdsfclear) button and menu should remain close': {
      ...BASIC_PROPS,
      isMulti: true,
    },
  });

cases('onMenuOpen called when menu is opened', ({ props = BASIC_PROPS }) => {
  let onMenuOpenSpy = jest.fn();
  let selectWrapper = mount(<Select {...props} onMenuOpen={onMenuOpenSpy} />);
  // Menu not open by defualt
  expect(selectWrapper.find(Menu).exists()).toBeFalsy();
  expect(onMenuOpenSpy).not.toHaveBeenCalled();
  // Open Menu
  selectWrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });
  // onMenuOpenSpy
  expect(onMenuOpenSpy).toHaveBeenCalledTimes(1);
}, {
    'single select > should call onMenuOpen prop on opening menu': {},
    'multi select > should call onMenuOpen prop on opening menu': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
      },
    },
  });

cases('onMenuClose called when menu is closed', ({ props = { ...BASIC_PROPS, menuIsOpen: true } }) => {
  let onMenuCloseSpy = jest.fn();
  let selectWrapper = mount(<Select {...props} onMenuClose={onMenuCloseSpy} />);
  // Menu is open by defualt
  expect(selectWrapper.find(Menu).exists()).toBeTruthy();
  expect(onMenuCloseSpy).not.toHaveBeenCalled();
  // closing Menu
  selectWrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });
  expect(onMenuCloseSpy).toHaveBeenCalledTimes(1);
}, {
    'single select > should call onMenuClose prop on closing menu': {},
    'multi select > should call onMenuClose prop on closing menu': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
        menuIsOpen: true,
      },
    },
  });

test('Menu is controllable by menuIsOpen prop', () => {
  let selectWrapper = mount(<Select {...BASIC_PROPS} />);
  expect(selectWrapper.find(Menu).exists()).toBeFalsy();

  selectWrapper.setProps({ menuIsOpen: true });
  expect(selectWrapper.find(Menu).exists()).toBeTruthy();

  selectWrapper.setProps({ menuIsOpen: false });
  expect(selectWrapper.find(Menu).exists()).toBeFalsy();
});

cases('Menu to open by default if menuIsOpen prop is true', ({ props = { ...BASIC_PROPS, menuIsOpen: true } }) => {
  let selectWrapper = mount(<Select {...props} />);
  expect(selectWrapper.find(Menu).exists()).toBeTruthy();
  selectWrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });
  // menu is not closed
  expect(selectWrapper.find(Menu).exists()).toBeTruthy();
}, {
    'single select > should keep Menu open by default if true is passed for menuIsOpen prop': {},
    'multi select > should keep Menu open by default if true is passed for menuIsOpen prop': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
        menuIsOpen: true
      },
    },
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

test('multi select > clicking on X next to selection option', () => {
  let selectWrapper = mount(<Select options={OPTIONS} isMulti defaultValue={[OPTIONS[2], OPTIONS[4]]} />);
  // there are two values in select
  expect(selectWrapper.find(MultiValue).length).toBe(2);
  // select has 2 and 4 as value
  expect(selectWrapper.find(Control).text()).toBe('24');

  const selectFirstValueWrapper = selectWrapper.find(MultiValue).at(0);
  selectFirstValueWrapper.find('div.react-select__multi-value__remove').simulate('click', { button: 0 });
  // now there is one values in select
  expect(selectWrapper.find(MultiValue).length).toBe(1);
  // first value 2, is removed from the select
  expect(selectWrapper.find(Control).text()).toBe('4');

});

/**
 * backspace is not removing the option when isClearable and backspaceRemovesValue true
 * This is working in example on website not working on enzyme wrapper
 */
cases('hitting backspace with selected options', ({ props = BASIC_PROPS, expectedValueAfterBackSpace }) => {
  let selectWrapper = mount(<Select {...props} />);
  expect(selectWrapper.find(Control).text()).toBe(props.value.label);
  selectWrapper.find(Control).simulate('keyDown', { keyCode: 8, key: 'Backspace' });
  expect(selectWrapper.find(Control).text()).toBe(expectedValueAfterBackSpace);
}, {
    'single select > should not remove when backspaceRemovesValue is false': {
      props: {
        ...BASIC_PROPS,
        isClearable: true,
        backspaceRemovesValue: false,
        value: OPTIONS[3],
      },
      expectedValueAfterBackSpace: OPTIONS[3].label,
    },
    'single select > should remove when backspaceRemovesValue is true': {
      props: {
        ...BASIC_PROPS,
        isClearable: true,
        backspaceRemovesValue: true,
        value: OPTIONS[3],
      },
      expectedValueAfterBackSpace: '',
      skip: true,
    },
    'multi select - should not remove when backspaceRemovesValue is false': {
      props: {
        ...BASIC_PROPS,
        isClearable: true,
        isMulti: false,
        backspaceRemovesValue: false,
        value: OPTIONS[5],
      },
      expectedValueAfterBackSpace: OPTIONS[5].label,
    },
    'multi select - should not remove when backspaceRemovesValue is true': {
      props: {
        ...BASIC_PROPS,
        isClearable: true,
        isMulti: false,
        backspaceRemovesValue: true,
        value: OPTIONS[5],
      },
      expectedValueAfterBackSpace: '',
      skip: true,
    }
  });

cases('selecting an option > mouse interaction', ({ props = { ...BASIC_PROPS }, event, selectOption, expectSelectedOption }) => {
  let selectWrapper = mount(<Select {...props} />);
  let toSelectOption = selectWrapper.find('div.react-select__option').findWhere(n => n.props().children === selectOption.label);
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

cases('value prop', ({ props = { ...BASIC_PROPS, value: OPTIONS[0] } }) => {
  let selectWrapper = mount(<Select {...props} />);
  expect(selectWrapper.find('input[type="hidden"]').props().value).toBe('zero');

  // select new value from option
  selectWrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });
  selectWrapper.find(Option).at(4).find('div').simulate('click', { button: 0 });

  // value stays the same as passed by props
  expect(selectWrapper.find('input[type="hidden"]').props().value).toBe('zero');
}, {
    'single select > should always show the value passed as props': {},
    'multi select > should always show the value passed as props': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
        value: OPTIONS[0],
      }
    },
  });

/**
 * Unable to trigger change event on input and test
 * as event.currentTarget.value goes as empty string
 */
test.skip('inputValue prop > should not update the inputValue when on change of input if inputValue prop is provided', () => {
  const props = { ...BASIC_PROPS, inputValue: OPTIONS[0].label };
  let selectWrapper = mount(<Select {...props} />);
  selectWrapper.find('Control input').simulate('change', { currentTarget: { value: 'A' }, target: { value: 'A' } });
  expect(selectWrapper.find('Control input').props().value).toBe('0');
});

/**
 * selects the option on hitting spacebar
 * need varification
 */
test.skip('hitting spacebar should not select option if isSearchable is true (default)', () => {
  let selectWrapper = mount(<Select {...BASIC_PROPS} />);
  // Open Menu
  selectWrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });
  selectWrapper.simulate('keyDown', { keyCode: 32, key: 'Spacebar' });
  expect(selectWrapper.find('input[type="hidden"]').props().value).toBe('zero');
});
