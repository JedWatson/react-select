import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import cases from 'jest-in-case';

import { OPTIONS } from './constants';
import Select from '../';
import { components } from '../components';

const { Control, Menu, MultiValue, Placeholder, Option } = components;

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

cases('accessibility > aria-activedescendant', ({ props = { ...BASIC_PROPS, value: { label: '2', value: 'two' }, menuIsOpen: true } }) => {
  let selectWrapper = mount(<Select {...props} />);
  let selectInput = selectWrapper.find('Control input');
  let activeDescendant = selectInput.props()['aria-activedescendant'];
  expect(selectWrapper.find(`#${activeDescendant}`.text())).toBe('2');
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

// https://codesandbox.io/s/71xrkj0qj <- not working code sandbox link
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

cases('onMenuOpen called when menu is opened',({ props = BASIC_PROPS }) => {
  let onMenuOpenSpy = jest.fn();
  let selectWrapper = mount(<Select {...props} onMenuOpen={onMenuOpenSpy}/>);
  // Menu not open by defualt
  expect(selectWrapper.find(Menu).exists()).toBeFalsy();
  expect(onMenuOpenSpy).not.toHaveBeenCalled();
  // Open Menu
  selectWrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });
  // onMenuOpenSpy
  expect(onMenuOpenSpy).toHaveBeenCalledTimes(1);
}, {
  'single select > should call onMenuOpen prop on opening menu': { },
  'multi select > should call onMenuOpen prop on opening menu': {
    props: {
      ...BASIC_PROPS,
      isMulti: true,
    },
  },
});

cases('OnMenuClose called when menu is closed',({ props = { ...BASIC_PROPS, menuIsOpen: true } }) => {
  let onMenuCloseSpy = jest.fn();
  let selectWrapper = mount(<Select {...props} onMenuClose={onMenuCloseSpy}/>);
  // Menu is open by defualt
  expect(selectWrapper.find(Menu).exists()).toBeTruthy();
  expect(onMenuCloseSpy).not.toHaveBeenCalled();
  // closing Menu
  selectWrapper.find('div.react-select__dropdown-indicator').simulate('mouseDown', { button: 0 });
  expect(onMenuCloseSpy).toHaveBeenCalledTimes(1);
}, {
  'single select > should call onMenuClose prop on closing menu': { },
  'multi select > should call onMenuClose prop on closing menu': {
    props: {
      ...BASIC_PROPS,
      isMulti: true,
      menuIsOpen: true,
    },
  },
});
