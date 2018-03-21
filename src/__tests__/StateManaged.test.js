import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import cases from 'jest-in-case';

import { OPTIONS } from './constants';
import Select from '../';
import SelectBase from '../Select';
import { components } from '../components';
import { A11yText } from '../primitives';

const { ClearIndicator, Control, Input, Menu, MultiValue, Placeholder, Option, SingleValue } = components;

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

cases('accessibility - select input with defaults', ({ props = BASIC_PROPS, expectAriaHaspopup = false, expectAriaExpanded = false }) => {
  let selectWrapper = mount(<Select {...props} />);
  let selectInput = selectWrapper.find('Control input');

  expect(selectInput.props().role).toBe('combobox');
  expect(selectInput.props()['aria-haspopup']).toBe(expectAriaHaspopup);
  expect(selectInput.props()['aria-expanded']).toBe(expectAriaExpanded);
}, {
    'single select > with menu closed > input should have aria role combobox, and aria-haspopup, aria-expanded as false': {
    },
    'single select > with menu open > input should have aria role combobox, and aria-haspopup, aria-expanded as true': {
      props: {
        ...BASIC_PROPS,
        menuIsOpen: true,
      },
      expectAriaHaspopup: true,
      expectAriaExpanded: true,
    },
    'multi select > with menu closed > input should have aria role combobox, and aria-haspopup, aria-expanded as false': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
      }
    },
    'multi select > with menu open > input should have aria role combobox, and aria-haspopup, aria-expanded as true': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
        menuIsOpen: true,
      },
      expectAriaHaspopup: true,
      expectAriaExpanded: true,
    },
  });

/**
 * TODO: Need to get hightlight a menu option and then match value with aria-activedescendant prop
 */
cases('accessibility > aria-activedescendant', ({ props = { ...BASIC_PROPS } }) => {
  let selectWrapper = mount(<Select {...props} />);
  // Open Menu
  selectWrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });
  selectWrapper.find(Menu).simulate('keyDown', { keyCode: 40, key: 'ArrowDown' });

  expect(selectWrapper.find('Control input').props()['aria-activedescendant']).toBe('1');
}, {
    'single select': {
      skip: true,
    },
    'multi select': {
      skip: true,
      props: {
        ...BASIC_PROPS,
        value: { label: '2', value: 'two' },
      }
    }
  });

cases('accessibility > passes through aria-labelledby prop', ({ props = { ...BASIC_PROPS, 'aria-labelledby': 'testing' } }) => {
  let selectWrapper = mount(<Select {...props} />);
  expect(selectWrapper.find('Control input').props()['aria-labelledby']).toBe('testing');
}, {
    'single select > should pass aria-labelledby prop down to input': {},
    'multi select > should pass aria-labelledby prop down to input': {
      props: {
        ...BASIC_PROPS,
        'aria-labelledby': 'testing',
        isMulti: true,
      }
    }
  });

cases('accessibility > passes through aria-describedby prop', ({ props = { ...BASIC_PROPS, 'aria-describedby': 'testing' } }) => {
  let selectWrapper = mount(<Select {...props} />);
  expect(selectWrapper.find('Control input').props()['aria-describedby']).toBe('testing');
}, {
    'single select > should pass aria-labelledby prop down to input': {},
    'multi select > should pass aria-labelledby prop down to input': {
      props: {
        ...BASIC_PROPS,
        'aria-describedby': 'testing',
        isMulti: true,
      }
    }
  });

cases('accessibility > passes through aria-label prop', ({ props = { ...BASIC_PROPS, 'aria-label': 'testing' } }) => {
  let selectWrapper = mount(<Select {...props} />);
  expect(selectWrapper.find('Control input').props()['aria-label']).toBe('testing');
}, {
    'single select > should pass aria-labelledby prop down to input': {},
    'multi select > should pass aria-labelledby prop down to input': {
      props: {
        ...BASIC_PROPS,
        'aria-label': 'testing',
        isMulti: true,
      }
    }
  });

test('accessibility > to show the number of options available in A11yText', () => {
  let selectWrapper = mount(<Select {...BASIC_PROPS} />);
  expect(selectWrapper.find(A11yText).text()).toBe('17 results available.');

  selectWrapper.setProps({ inputValue: '0' });
  expect(selectWrapper.find(A11yText).text()).toBe('2 results available.');

  selectWrapper.setProps({ inputValue: '10' });
  expect(selectWrapper.find(A11yText).text()).toBe('1 result available.');

  selectWrapper.setProps({ inputValue: '100' });
  expect(selectWrapper.find(A11yText).text()).toBe('0 results available.');
});

/**
 * Not a case anymore, not getting this label in V2
 */
test.skip('accessibility > multi select > remove value label', () => {
  const props = { ...BASIC_PROPS, isMulti: true, value: [OPTIONS[0], OPTIONS[1]] };
  let selectWrapper = mount(<Select {...props} />);
  expect(selectWrapper).toBeTruthy();
});

cases('autoFocus',
  ({ props = BASIC_PROPS }) => {
    let selectWrapper = mount(<Select {...props} />);
    expect(selectWrapper.find('Control input').props().id).toBe(document.activeElement.id);

  },
  {
    'single select > should focus select on mount': {
      props: {
        ...BASIC_PROPS,
        autoFocus: true,
      },
    },
    'multi select > should focus select on mount': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
        autoFocus: true,
      },
    }
  }
);

/**
 * onFocus hook is not being called when component is mounted is autoFocus true
 * Reproducible here ->  https://codesandbox.io/s/71xrkj0qj
 */
cases('onFocus prop', ({ props = { ...BASIC_PROPS, autoFocus: true } }) => {
  let onFocusSpy = jest.fn();
  let selectWrapper = mount(<Select {...props} onFocus={onFocusSpy} />);
  expect(selectWrapper.find('Control input').props().id).toBe(document.activeElement.id);
  expect(onFocusSpy).toHaveBeenCalledTimes(1);
}, {
    'single select > should call auto focus only once when select is autoFocus': {
      skip: true,
    },
    'multi select > should call auto focus only once when select is autoFocus': {
      skip: true,
      props: {
        ...BASIC_PROPS,
        autoFocus: true,
        isMulti: true
      },
    },
  });

cases('onFocus prop is called on on focus of input', ({ props = { ...BASIC_PROPS } }) => {
  let onFocusSpy = jest.fn();
  let selectWrapper = mount(<Select {...props} onFocus={onFocusSpy} />);
  selectWrapper.find('Control input').simulate('focus');
  expect(onFocusSpy).toHaveBeenCalledTimes(1);
}, {
    'single select > should call onFocus handler on focus on input': {},
    'multi select > should call onFocus handler on focus on input': {
      props: {
        ...BASIC_PROPS,
        isMulti: true
      },
    },
  });

cases('onBlur prop', ({ props = { ...BASIC_PROPS } }) => {
  let onBlurSpy = jest.fn();
  let selectWrapper = mount(<Select {...props} onBlur={onBlurSpy} />);
  selectWrapper.find('Control input').simulate('blur');
  expect(onBlurSpy).toHaveBeenCalledTimes(1);
}, {
    'single select > should call onBlur handler on blur on input': {},
    'multi select > should call onBlur handler on blur on input': {
      props: {
        ...BASIC_PROPS,
        isMulti: true
      },
    },
  });

cases('placeholder', ({ props, expectPlaceholder = 'Select...' }) => {
  let selectWrapper = mount(<Select {...props} />);
  expect(selectWrapper.find('Control').text()).toBe(expectPlaceholder);
}, {
    'single select > should display default placeholder "Select...': {},
    'single select > should display provided placeholder': {
      props: {
        placeholder: 'single Select...',
      },
      expectPlaceholder: 'single Select...',
    },
    'multi select > should display default placeholder "Select...': {},
    'multi select > should display provided placeholder': {
      props: {
        placeholder: 'multi Select...',
      },
      expectPlaceholder: 'multi Select...',
    }
  });

cases('display placeholder once value is removed', ({ props }) => {
  let selectWrapper = mount(<Select {...props} />);
  expect(selectWrapper.find(Placeholder).exists()).toBeFalsy();
  selectWrapper.setProps({ value: '' });
  expect(selectWrapper.find(Placeholder).exists()).toBeTruthy();
}, {
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

cases('OnMenuClose called when menu is closed', ({ props = { ...BASIC_PROPS, menuIsOpen: true } }) => {
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

cases('menuIsOpen prop', ({ props = { ...BASIC_PROPS, menuIsOpen: true } }) => {
  let selectWrapper = mount(<Select {...props} />);
  expect(selectWrapper.find(Menu).exists()).toBeTruthy();
  selectWrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });
  // menu is not closed
  expect(selectWrapper.find(Menu).exists()).toBeTruthy();
}, {
    'single select > should maintain a menuIsOpen value in state if menuIsOpen is passed as prop': {},
    'multi select > should maintain a menuIsOpen value in state if menuIsOpen is passed as prop': {
      props: {
        ...BASIC_PROPS,
        isMulti: true,
        menuIsOpen: true
      },
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

test('renders a read only input when isSearchable is false', () => {
  let selectWrapper = mount(<Select options={OPTIONS} isSearchable={false} />);
  let inputWrapper = selectWrapper.find('Control input');
  expect(inputWrapper.props().readOnly).toBe(true);
});

test('not hide the options from the menu if hideSelectedOptions is false', () => {
  let selectWrapper = mount(<Select options={OPTIONS} hideSelectedOptions={false} isMulti menuIsOpen />);
  let firstOption = selectWrapper.find(Option).at(0);
  let secondoption = selectWrapper.find(Option).at(1);
  expect(firstOption.text()).toBe('0');
  expect(secondoption.text()).toBe('1');

  firstOption.find('div.react-select__option').simulate('click', { button: 0 });

  expect(firstOption.text()).toBe('0');
  expect(secondoption.text()).toBe('1');
});

cases('jump over the disabled option', ({ props = { ...BASIC_PROPS }, eventsToSimulate, expectedSelectedOption }) => {
  let selectWrapper = mount(<Select {...props} />);
  // open the menu
  selectWrapper.find('div.react-select__dropdown-indicator').simulate('keyDown', { keyCode: 40, key: 'ArrowDown' });
  eventsToSimulate.map(eventToSimulate => {
    selectWrapper.find(Menu).simulate(...eventToSimulate);
  });
  selectWrapper.find(Menu).simulate('keyDown', { keyCode: 13, key: 'Enter' });
  expect(selectWrapper.find('input[type="hidden"]').props().value).toBe(expectedSelectedOption);
}, {
    'with isOptionDisabled prop > jumps over the first option if it is disabled': {
      props: {
        ...BASIC_PROPS,
        isOptionDisabled: (option) => ['zero'].indexOf(option.value) > -1,
      },
      eventsToSimulate: [],
      expectedSelectedOption: OPTIONS[1].value,
    },
    'with isDisabled option value > jumps over the first option if it is disabled': {
      props: {
        ...BASIC_PROPS,
        options: [{ label: 'option 1', value: 'opt1', isDisabled: true }, ...OPTIONS],
      },
      eventsToSimulate: [],
      expectedSelectedOption: OPTIONS[0].value,
    },
    'with isOptionDisabled prop > jumps over the disabled option': {
      props: {
        ...BASIC_PROPS,
        isOptionDisabled: (option) => ['two'].indexOf(option.value) > -1,
      },
      eventsToSimulate: [
        ['keyDown', { keyCode: 40, key: 'ArrowDown' }],
        ['keyDown', { keyCode: 40, key: 'ArrowDown' }],
      ],
      expectedSelectedOption: OPTIONS[3].value,
    },
    'with isDisabled option value > jumps over the disabled option': {
      props: {
        ...BASIC_PROPS,
        options: [{ label: 'option 1', value: 'opt1' }, { label: 'option 2', value: 'opt2', isDisabled: true }, { label: 'option 3', value: 'opt3' }],
      },
      eventsToSimulate: [
        ['keyDown', { keyCode: 40, key: 'ArrowDown' }],
      ],
      expectedSelectedOption: 'opt3',
    },
    'with isOptionDisabled prop > skips over last option when looping round when last option is disabled': {
      props: {
        ...BASIC_PROPS,
        options: OPTIONS.slice(0, 3),
        isOptionDisabled: (option) => ['two'].indexOf(option.value) > -1,
      },
      eventsToSimulate: [
        ['keyDown', { keyCode: 40, key: 'ArrowDown' }],
        ['keyDown', { keyCode: 40, key: 'ArrowDown' }],
      ],
      expectedSelectedOption: OPTIONS[0].value,
    },
    'with isDisabled option value > skips over last option when looping round when last option is disabled': {
      props: {
        ...BASIC_PROPS,
        options: [{ label: 'option 1', value: 'opt1' }, { label: 'option 2', value: 'opt2' }, { label: 'option 3', value: 'opt3', isDisabled: true }],
      },
      eventsToSimulate: [
        ['keyDown', { keyCode: 40, key: 'ArrowDown' }],
        ['keyDown', { keyCode: 40, key: 'ArrowDown' }],
      ],
      expectedSelectedOption: 'opt1',
    },
    'with isOptionDisabled prop > should not select anything when all options are disabled': {
      props: {
        ...BASIC_PROPS,
        isOptionDisabled: () => true,
      },
      eventsToSimulate: [],
      expectedSelectedOption: '',
    },
    'with isDisabled option value > should not select anything when all options are disabled': {
      props: {
        ...BASIC_PROPS,
        options: [{ label: 'option 1', value: 'opt1', isDisabled: true }, { label: 'option 2', value: 'opt2', isDisabled: true }, { label: 'option 3', value: 'opt3', isDisabled: true }],
      },
      eventsToSimulate: [],
      expectedSelectedOption: '',
    }
  });

cases('clicking on disabled option', ({ props = BASIC_PROPS, optionsSelected, expectedSelectedOption }) => {
  let selectWrapper = mount(<Select {...props} menuIsOpen />);
  let selectOption = selectWrapper.find('div.react-select__option').findWhere(n => n.props().children === optionsSelected);
  selectOption.simulate('click', { button: 0 });
  expect(selectWrapper.find('input[type="hidden"]').props().value).toBe(expectedSelectedOption);
}, {
    'single select > should not select the disabled option': {
      props: {
        ...BASIC_PROPS,
        options: [{ label: 'option 1', value: 'opt1' }, { label: 'option 2', value: 'opt2', isDisabled: true }],
      },
      optionsSelected: 'option 2',
      expectedSelectedOption: '',
    },
    'multi select > should not select the disabled option': {
      props: {
        ...BASIC_PROPS,
        options: [{ label: 'option 1', value: 'opt1' }, { label: 'option 2', value: 'opt2', isDisabled: true }],
      },
      optionsSelected: 'option 2',
      expectedSelectedOption: '',
    },
  });

test('does not select anything when a disabled option is the only item in the list after a search', () => {
  let onChangeSpy = jest.fn();
  const options = [{ label: 'opt', value: 'opt1', isDisabled: true }, ...OPTIONS];
  let selectWrapper = mount(<Select options={options} menuIsOpen name="test-name" onChange={onChangeSpy} />);
  selectWrapper.setProps({ inputValue: 'opt' });
  selectWrapper.find(Menu).simulate('keyDown', { keyCode: 13, key: 'Enter' });

  expect(onChangeSpy).not.toHaveBeenCalled();
  // Menu is still open
  expect(selectWrapper.find(Option).text()).toBe('opt');
});

test('passes down the className prop', () => {
  let selectWrapper = mount(<Select {...BASIC_PROPS} className="test-class" />);
  expect(selectWrapper.find(SelectBase).props().className).toBe('test-class');
});

test('render custom Input Component', () => {
  const InputComponent = () => (<div />);
  let selectWrapper = mount(<Select {...BASIC_PROPS} components={{ Input: InputComponent }} />);

  expect(selectWrapper.find(Input).exists()).toBeFalsy();
  expect(selectWrapper.find(InputComponent).exists()).toBeTruthy();
});

test('render custom Menu Component', () => {
  const MenuComponent = () => (<div />);
  let selectWrapper = mount(<Select {...BASIC_PROPS} menuIsOpen components={{ Menu: MenuComponent }} />);

  expect(selectWrapper.find(Menu).exists()).toBeFalsy();
  expect(selectWrapper.find(MenuComponent).exists()).toBeTruthy();
});

test('render custom Option Component', () => {
  const OptionComponent = () => (<div />);
  let selectWrapper = mount(<Select {...BASIC_PROPS} menuIsOpen components={{ Option: OptionComponent }} />);

  expect(selectWrapper.find(Option).exists()).toBeFalsy();
  expect(selectWrapper.find(OptionComponent).exists()).toBeTruthy();
});

cases('isClearable is false', ({ props = BASIC_PROPS }) => {
  let selectWrapper = mount(<Select {...props} />);
  expect(selectWrapper.find(ClearIndicator).exists()).toBeFalsy();
}, {
    'single select > should not show the X (clear) button': {
      props: {
        ...BASIC_PROPS,
        isClearable: false,
        value: OPTIONS[0]
      },
    },
    'multi select > should not show X (clear) button': {
      ...BASIC_PROPS,
      isMulti: true,
      isClearable: false,
      value: [OPTIONS[0]]
    },
  });

test('clear list using clear button', () => {
  let selectWrapper = mount(<Select {...BASIC_PROPS} isMulti />);
  // Open Menu
  selectWrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });
  selectWrapper.find(Menu).simulate('keyDown', { keyCode: 13, key: 'Enter' });
  expect(selectWrapper.find(MultiValue).length).toBe(1);
  selectWrapper.find('div.react-select__clear-indicator').simulate('mousedown', { button: 0 });
  expect(selectWrapper.find(MultiValue).exists()).toBeFalsy();
  expect(selectWrapper.find(ClearIndicator).exists()).toBeFalsy();
});

test('multi select > select multiple options when isSearchable is false', () => {
  let selectWrapper = mount(<Select {...BASIC_PROPS} isMulti menuIsOpen delimiter="," isSearchable={false} />);
  selectWrapper.find('div.react-select__option').at(0).simulate('click', { button: 0 });
  selectWrapper.find('div.react-select__option').at(0).simulate('click', { button: 0 });
  expect(selectWrapper.find(Control).text()).toBe('01');
});

test('multi select > calls onChange when option is selected and isSearchable is false', () => {
  let onChangeSpy = jest.fn();
  let selectWrapper = mount(<Select {...BASIC_PROPS} isMulti menuIsOpen delimiter="," isSearchable={false} onChange={onChangeSpy} />);
  selectWrapper.find('div.react-select__option').at(0).simulate('click', { button: 0 });
  expect(onChangeSpy).toBeCalledWith([{ label: '0', value: 'zero' }], { action: 'select-option' });
});

test('multi select > removes the selected option from the menu when isSearchable is false', () => {
  let selectWrapper = mount(<Select {...BASIC_PROPS} isMulti menuIsOpen delimiter="," isSearchable={false} />);
  expect(selectWrapper.find(Option).length).toBe(17);
  selectWrapper.find('div.react-select__option').at(0).simulate('click', { button: 0 });
  // expect '0' to not be options
  selectWrapper.find(Option).map(option => {
    expect(option.text()).not.toBe('0');
  });
  expect(selectWrapper.find(Option).length).toBe(16);
});

test('to clear value when hitting escape if escapeClearsValue and isClearable are true', () => {
  let selectWrapper = mount(<Select options={OPTIONS} isClearable escapeClearsValue />);
  // Open Menu
  selectWrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });
  selectWrapper.find('div.react-select__option').at(0).simulate('click', { button: 0 });
  expect(selectWrapper.find(SingleValue).text()).toBe('0');
  selectWrapper.simulate('keyDown', { keyCode: 27, key: 'Escape' });
  expect(selectWrapper.find(SingleValue).exists()).toBeFalsy();
});

test('to not clear value when hitting escape if escapeClearsValue is false (default) and isClearable is true', () => {
  let selectWrapper = mount(<Select options={OPTIONS} isClearable />);
  // Open Menu
  selectWrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });
  selectWrapper.find('div.react-select__option').at(0).simulate('click', { button: 0 });
  expect(selectWrapper.find(SingleValue).text()).toBe('0');
  selectWrapper.simulate('keyDown', { keyCode: 27, key: 'Escape' });
  expect(selectWrapper.find(SingleValue).text()).toBe('0');
});

test('to not clear value when hitting escape if escapeClearsValue is true (default) and isClearable is false', () => {
  let selectWrapper = mount(<Select options={OPTIONS} escapeClearsValue isClearable={false} />);
  // Open Menu
  selectWrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });
  selectWrapper.find('div.react-select__option').at(0).simulate('click', { button: 0 });
  expect(selectWrapper.find(SingleValue).text()).toBe('0');
  selectWrapper.simulate('keyDown', { keyCode: 27, key: 'Escape' });
  expect(selectWrapper.find(SingleValue).text()).toBe('0');
});

test('to not clear value when hitting escape if escapeClearsValue is false (default) and isClearable is false', () => {
  let selectWrapper = mount(<Select options={OPTIONS} escapeClearsValue isClearable={false} />);
  // Open Menu
  selectWrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });
  selectWrapper.find('div.react-select__option').at(0).simulate('click', { button: 0 });
  expect(selectWrapper.find(SingleValue).text()).toBe('0');
  selectWrapper.simulate('keyDown', { keyCode: 27, key: 'Escape' });
  expect(selectWrapper.find(SingleValue).text()).toBe('0');
});

test('close menu on hitting escape even if escapeClearsValue and isClearable are true', () => {
  let selectWrapper = mount(<Select options={OPTIONS} escapeClearsValue isClearable />);
  // Open Menu
  selectWrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });
  selectWrapper.find('div.react-select__option').at(0).simulate('click', { button: 0 });

  // re-open menu
  selectWrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });
  selectWrapper.simulate('keyDown', { keyCode: 27, key: 'Escape' });
  expect(selectWrapper.find(Menu).exists()).toBeFalsy();
  expect(selectWrapper.find(SingleValue).text()).toBe('0');
});

test('hitting escape does not call onChange if menu is Open', () => {
  let onChangeSpy = jest.fn();
  let selectWrapper = mount(<Select options={OPTIONS} escapeClearsValue isClearable onChange={onChangeSpy} />);
  // Open Menu
  selectWrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });
  selectWrapper.simulate('keyDown', { keyCode: 27, key: 'Escape' });
  expect(onChangeSpy).not.toHaveBeenCalled();
});

test('hitting spacebar should select option if isSearchable is false', () => {
  let selectWrapper = mount(<Select {...BASIC_PROPS} isSearchable />);
  // Open Menu
  selectWrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });
  selectWrapper.simulate('keyDown', { keyCode: 32, key: 'Spacebar' });
  expect(selectWrapper.find('input[type="hidden"]').props().value).toBe('zero');
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

test('multi select > have default value delimiter seperated', () => {
  let selectWrapper = mount(<Select {...BASIC_PROPS} isMulti delimiter={';'} value={[OPTIONS[0], OPTIONS[1]]} />);
  expect(selectWrapper.find('input[type="hidden"]').props().value).toBe('zero;one');
});

test('multi select > with multi character delimiter', () => {
  let selectWrapper = mount(<Select {...BASIC_PROPS} isMulti delimiter={'===&==='} />);
  // Open Menu
  selectWrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });
  selectWrapper.simulate('keyDown', { keyCode: 13, key: 'Enter' });
  // Open Menu
  selectWrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });
  selectWrapper.simulate('keyDown', { keyCode: 13, key: 'Enter' });

  expect(selectWrapper.find('input[type="hidden"]').props().value).toBe('zero===&===one');
});

cases('menu should remain closed after clearing value', ({ props = BASIC_PROPS }) => {
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
    'single select > should not show the Xsdfdsf (clear) button': {
      props: {
        ...BASIC_PROPS,
      },
    },
    'multi select > should not show X (sdfdsfclear) button': {
      ...BASIC_PROPS,
      isMulti: true,
    },
  });

test('clicking ArrowUp on closed select should select last element', () => {
  let selectWrapper = mount(<Select {...BASIC_PROPS} />);
  selectWrapper.find('div.react-select__control').simulate('keyDown', { keyCode: 38, key: 'ArrowUp' });
  selectWrapper.simulate('keyDown', { keyCode: 13, key: 'Enter' });
  expect(selectWrapper.find('input[type="hidden"]').props().value).toBe('sixteen');
});

test('to only render groups with at least one match when filtering', () => {
  const options = [
    {
      label: 'group 1',
      options: [{ value: 1, label: '1' }, { value: 2, label: '2' }],
    },
    {
      label: 'group 2',
      options: [{ value: 3, label: '3' }, { value: 4, label: '4' }],
    },
  ];
  const selectWrapper = mount(<Select options={options} menuIsOpen />);
  selectWrapper.setProps({ inputValue: '1' });

  expect(selectWrapper.find('Group').length).toBe(1);
  expect(selectWrapper.find('Group').find('Option').length).toBe(1);
});

test('not render any groups when there is not a single match when filtering', () => {
  const options = [
    {
      label: 'group 1',
      options: [{ value: 1, label: '1' }, { value: 2, label: '2' }],
    },
    {
      label: 'group 2',
      options: [{ value: 3, label: '3' }, { value: 4, label: '4' }],
    },
  ];
  const selectWrapper = mount(<Select options={options} menuIsOpen />);
  selectWrapper.setProps({ inputValue: '5' });

  expect(selectWrapper.find('Group').length).toBe(0);
});
