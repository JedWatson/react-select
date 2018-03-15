import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import cases from 'jest-in-case';

import { OPTIONS, OPTIONS_NUMBER_VALUE, OPTIONS_BOOLEAN_VALUE } from './constants';
import Select from '../Select';
import { components } from '../components';

const { Menu, MultiValue, NoOptionsMessage, Option, SingleValue } = components;

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
    'single select > should format label of options according to text returned by formatOptionLabel': {
      props: {
        formatOptionLabel: ({ label, value }, { context }) => (`${label} ${value} ${context}`),
        options: OPTIONS,
        value: OPTIONS[0],
      },
      valueComponent: SingleValue,
      expectedOptions: '0 zero value'
    },
    'multi select > should format label of options according to text returned by formatOptionLabel': {
      props: {
        formatOptionLabel: ({ label, value }, { context }) => (`${label} ${value} ${context}`),
        isMulti: true,
        options: OPTIONS,
        value: OPTIONS[0],
      },
      valueComponent: MultiValue,
      expectedOptions: '0 zero value'
    }
  });

cases('name prop', ({ expectedName, props }) => {
  let tree = shallow(<Select {...props} />);
  let input = tree.find('input');
  expect(input.props().name).toBe(expectedName);
}, {
    'single select > should assign the given name': { props: { name: 'form-field-single-select' }, expectedName: 'form-field-single-select' },
    'multi select > should assign the given name': {
      props: {
        name: 'form-field-multi-select',
        isMulti: true,
        options: OPTIONS,
        value: OPTIONS[2]
      },
      expectedName: 'form-field-multi-select'
    },
  });

cases('menuIsOpen prop', ({ props }) => {
  let selectWrapper = shallow(<Select {...props} />);
  expect(selectWrapper.find(Menu).exists()).toBeFalsy();

  selectWrapper.setProps({ menuIsOpen: true });
  expect(selectWrapper.find(Menu).exists()).toBeTruthy();

  selectWrapper.setProps({ menuIsOpen: false });
  expect(selectWrapper.find(Menu).exists()).toBeFalsy();
}, {
    'single select > should show menu if menuIsOpen is true and hide menu if menuIsOpen prop is false': {
      props: {
        options: OPTIONS,
        value: OPTIONS[2],
      }
    },
    'multi select > should show menu if menuIsOpen is true and hide menu if menuIsOpen prop is false': {
      props: {
        value: OPTIONS[2],
        options: OPTIONS,
      }
    }
  });

cases('filterOption() prop - should filter only if function returns truthy for value', ({ props, searchString, expectResultsLength }) => {
  let selectWrapper = shallow(<Select {...props} />);
  selectWrapper.setProps({ inputValue: searchString });
  expect(selectWrapper.find(Option).length).toBe(expectResultsLength);
}, {
    'single select > should filter all options as per searchString': {
      props: {
        filterOption: (value, search) => value.value.indexOf(search) > -1,
        options: OPTIONS,
        value: OPTIONS[0],
        menuIsOpen: true
      },
      searchString: 'o',
      expectResultsLength: 5,
    },
    'multi select > should filter all options other that options in value of select': {
      props: {
        filterOption: (value, search) => value.value.indexOf(search) > -1,
        options: OPTIONS,
        value: OPTIONS[0],
        menuIsOpen: true,
        isMulti: true,
      },
      searchString: 'o',
      expectResultsLength: 4,
    },
  });

cases('no option found on search based on filterOption prop', ({ props, searchString }) => {
  let selectWrapper = shallow(<Select {...props} />);
  selectWrapper.setProps({ inputValue: searchString });
  expect(selectWrapper.find(NoOptionsMessage).exists()).toBeTruthy();
}, {
    'single Select > should show NoOptionsMessage': {
      props: {
        filterOption: (value, search) => value.value.indexOf(search) > -1,
        options: OPTIONS,
        value: OPTIONS[0],
        menuIsOpen: true
      },
      searchString: 'some text not in options',
    },
    'multi select > should show NoOptionsMessage': {
      props: {
        filterOption: (value, search) => value.value.indexOf(search) > -1,
        options: OPTIONS,
        value: OPTIONS[0],
        menuIsOpen: true
      },
      searchString: 'some text not in options',
    }
  });

cases('value prop', ({ props, expectedValue }) => {
  let selectWrapper = shallow(<Select {...props} />);
  expect(selectWrapper.state('selectValue')).toEqual(expectedValue);
}, {
    'single select > should set it as initial value': {
      props: {
        options: OPTIONS,
        value: OPTIONS[2],
      },
      expectedValue: [{ label: '2', value: 'two' }],
    },
    'multi select > should set it as initial value': {
      props: {
        isMulti: true,
        options: OPTIONS,
        value: OPTIONS[1],
      },
      expectedValue: [{ label: '1', value: 'one' }],
    }
  });

cases('selecting an option', ({ props = { menuIsOpen: true, options: OPTIONS }, event, expectedSelectedOption, optionsSelected, focusedOption }) => {
  let spy = jest.fn();
  let multiSelectWrapper = mount(<Select {...props} onChange={spy} />);

  let selectOption = multiSelectWrapper.find('div.react-select__option').findWhere(n => n.props().children === optionsSelected.label);
  multiSelectWrapper.setState({ focusedOption });

  selectOption.simulate(...event);
  expect(spy).toHaveBeenCalledWith(expectedSelectedOption, { action: 'select-option' });
}, {
    'single select > option is clicked > should call onChange() prop with selected option': {
      event: ['click'],
      optionsSelected: { label: '2', value: 'two' },
      expectedSelectedOption: { label: '2', value: 'two' },
    },
    'single select > option with number value > option is clicked > should call onChange() prop with selected option': {
      props: {
        menuIsOpen: true,
        options: OPTIONS_NUMBER_VALUE,
      },
      event: ['click'],
      optionsSelected: { label: '2', value: 2 },
      expectedSelectedOption: { label: '2', value: 2 },
    },
    'single select > option with boolean value > option is clicked > should call onChange() prop with selected option': {
      props: {
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
      event: ['keyDown', { keyCode: 32, Key: 'Spacebar' }],
      optionsSelected: { label: '1', value: 'one' },
      focusedOption: { label: '1', value: 'one' },
      expectedSelectedOption: { label: '1', value: 'one' },
    },
    'multi select > option is clicked > should call onChange() prop with selected option': {
      props: {
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS
      },
      event: ['click'],
      optionsSelected: { label: '2', value: 'two' },
      expectedSelectedOption: [{ label: '2', value: 'two' }],
    },
    'multi select > option with number value > option is clicked > should call onChange() prop with selected option': {
      props: {
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS_NUMBER_VALUE,
      },
      event: ['click'],
      optionsSelected: { label: '2', value: 2 },
      expectedSelectedOption: [{ label: '2', value: 2 }],
    },
    'multi select > option with boolean value > option is clicked > should call onChange() prop with selected option': {
      props: {
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS_BOOLEAN_VALUE,
      },
      event: ['click'],
      optionsSelected: { label: 'true', value: true },
      expectedSelectedOption: [{ label: 'true', value: true }],
    },
    'multi select > tab key is pressed while focusing option > should call onChange() prop with selected option': {
      props: {
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS
      },
      event: ['keyDown', { keyCode: 9, key: 'Tab' }],
      menuIsOpen: true,
      optionsSelected: { label: '1', value: 'one' },
      focusedOption: { label: '1', value: 'one' },
      expectedSelectedOption: [{ label: '1', value: 'one' }],
    },
    'multi select > enter key is pressed while focusing option > should call onChange() prop with selected option': {
      props: {
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS
      },
      event: ['keyDown', { keyCode: 13, key: 'Enter' }],
      optionsSelected: { label: '3', value: 'three' },
      focusedOption: { label: '3', value: 'three' },
      expectedSelectedOption: [{ label: '3', value: 'three' }],
    },
    'multi select > space key is pressed while focusing option > should call onChange() prop with selected option': {
      props: {
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS
      },
      event: ['keyDown', { keyCode: 32, key: 'Spacebar' }],
      optionsSelected: { label: '1', value: 'one' },
      focusedOption: { label: '1', value: 'one' },
      expectedSelectedOption: [{ label: '1', value: 'one' }],
    },
  });

cases('hitting escape on select option', ({ props, event, focusedOption, optionsSelected }) => {
  let spy = jest.fn();
  let selectWrapper = mount(<Select {...props} onChange={spy} />);

  let selectOption = selectWrapper.find('div.react-select__option').findWhere(n => n.props().children === optionsSelected.label);
  selectWrapper.setState({ focusedOption });

  selectOption.simulate(...event);
  expect(spy).not.toHaveBeenCalled();

}, {
    'single select > should not call onChange prop': {
      props: {
        options: OPTIONS,
        menuIsOpen: true,
      },
      optionsSelected: { label: '1', value: 'one' },
      focusedOption: { label: '1', value: 'one' },
      event: ['keyDown', { keyCode: 27 }],
    },
    'multi select > should not call onChange prop': {
      props: {
        options: OPTIONS,
        isMulti: true,
        menuIsOpen: true,
      },
      optionsSelected: { label: '1', value: 'one' },
      focusedOption: { label: '1', value: 'one' },
      event: ['keyDown', { keyCode: 27 }],
    }
  });


cases('click to open select', ({ props, expectedToFocus }) => {
  let selectWrapper = mount(<Select {...props} onMenuOpen={() => { }} />);

  // this will get updated on input click, though click on input is not bubbling up to control component
  selectWrapper.setState({ isFocused: true });
  let controlComponent = selectWrapper.find('div.react-select__control');
  controlComponent.simulate('mouseDown', { target: { tagName: 'div' } });
  expect(selectWrapper.state('focusedOption')).toEqual(expectedToFocus);
}, {
    'single select > should focus the first option': {
      props: {
        options: OPTIONS,
      },
      expectedToFocus: { label: '0', value: 'zero' },
    },
    'multi select > should focus the first option': {
      props: {
        isMulti: true,
        options: OPTIONS,
      },
      expectedToFocus: { label: '0', value: 'zero' },
    }
  });

cases('focus in select options', ({ props, selectedOption, nextFocusOption, keyEvent }) => {
  let selectWrapper = mount(<Select {...props} />);
  let selectOption = selectWrapper.find('div.react-select__option').findWhere(n => n.props().children === selectedOption.label);
  selectWrapper.setState({ focusedOption: selectedOption });

  expect(selectWrapper.state('focusedOption')).toEqual(selectedOption);

  selectOption.simulate('keyDown', keyEvent);
  expect(selectWrapper.state('focusedOption')).toEqual(nextFocusOption);
}, {
    'single select > ArrowDown key on first option should focus second option': {
      props: {
        menuIsOpen: true,
        options: OPTIONS
      },
      keyEvent: { keyCode: 40, key: 'ArrowDown' },
      selectedOption: OPTIONS[0],
      nextFocusOption: OPTIONS[1],
    },
    'single select > ArrowDown key on last option should focus first option': {
      props: {
        menuIsOpen: true,
        options: OPTIONS
      },
      keyEvent: { keyCode: 40, key: 'ArrowDown' },
      selectedOption: OPTIONS[OPTIONS.length - 1],
      nextFocusOption: OPTIONS[0],
    },
    'single select > ArrowUp key on first option should focus last option': {
      props: {
        menuIsOpen: true,
        options: OPTIONS
      },
      keyEvent: { keyCode: 38, key: 'ArrowUp' },
      selectedOption: OPTIONS[0],
      nextFocusOption: OPTIONS[OPTIONS.length - 1],
    },
    'single select > ArrowUp key on last option should focus second last option': {
      props: {
        menuIsOpen: true,
        options: OPTIONS
      },
      keyEvent: { keyCode: 38, key: 'ArrowUp' },
      selectedOption: OPTIONS[OPTIONS.length - 1],
      nextFocusOption: OPTIONS[OPTIONS.length - 2],
    },
    'single select > PageDown key takes us to next page with default page size of 5': {
      props: {
        menuIsOpen: true,
        options: OPTIONS
      },
      keyEvent: { keyCode: 34, key: 'PageDown' },
      selectedOption: OPTIONS[0],
      nextFocusOption: OPTIONS[5],
    },
    'single select > PageDown key takes to the last option is options below is less then page size': {
      props: {
        menuIsOpen: true,
        options: OPTIONS
      },
      keyEvent: { keyCode: 34, key: 'PageDown' },
      selectedOption: OPTIONS[OPTIONS.length - 3],
      nextFocusOption: OPTIONS[OPTIONS.length - 1],
    },
    'single select > PageUp key takes us to previous page with default page size of 5': {
      props: {
        menuIsOpen: true,
        options: OPTIONS
      },
      keyEvent: { keyCode: 33, key: 'PageUp' },
      selectedOption: OPTIONS[6],
      nextFocusOption: OPTIONS[1],
    },
    'single select > PageUp key takes us to first option - previous options < pageSize': {
      props: {
        menuIsOpen: true,
        options: OPTIONS
      },
      keyEvent: { keyCode: 33, key: 'PageUp' },
      selectedOption: OPTIONS[1],
      nextFocusOption: OPTIONS[0],
    },
    'single select > Home key takes up to the first option': {
      props: {
        menuIsOpen: true,
        options: OPTIONS
      },
      keyEvent: { keyCode: 36, key: 'Home' },
      selectedOption: OPTIONS[OPTIONS.length - 3],
      nextFocusOption: OPTIONS[0],
    },
    'single select > End key takes down to the last option': {
      props: {
        menuIsOpen: true,
        options: OPTIONS
      },
      keyEvent: { keyCode: 35, key: 'End' },
      selectedOption: OPTIONS[2],
      nextFocusOption: OPTIONS[OPTIONS.length - 1],
    },
    'multi select > ArrowDown key on first option should focus second option': {
      props: {
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS
      },
      keyEvent: { keyCode: 40, key: 'ArrowDown' },
      selectedOption: OPTIONS[0],
      nextFocusOption: OPTIONS[1],
    },
    'multi select > ArrowDown key on last option should focus first option': {
      props: {
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS
      },
      keyEvent: { keyCode: 40, key: 'ArrowDown' },
      selectedOption: OPTIONS[OPTIONS.length - 1],
      nextFocusOption: OPTIONS[0],
    },
    'multi select > ArrowUp key on first option should focus last option': {
      props: {
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS
      },
      keyEvent: { keyCode: 38, key: 'ArrowUp' },
      selectedOption: OPTIONS[0],
      nextFocusOption: OPTIONS[OPTIONS.length - 1],
    },
    'multi select > ArrowUp key on last option should focus second last option': {
      props: {
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS
      },
      keyEvent: { keyCode: 38, key: 'ArrowUp' },
      selectedOption: OPTIONS[OPTIONS.length - 1],
      nextFocusOption: OPTIONS[OPTIONS.length - 2],
    },
    'multi select > PageDown key takes us to next page with default page size of 5': {
      props: {
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS
      },
      keyEvent: { keyCode: 34, key: 'PageDown' },
      selectedOption: OPTIONS[0],
      nextFocusOption: OPTIONS[5],
    },
    'multi select > PageDown key takes to the last option is options below is less then page size': {
      props: {
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS
      },
      keyEvent: { keyCode: 34, key: 'PageDown' },
      selectedOption: OPTIONS[OPTIONS.length - 3],
      nextFocusOption: OPTIONS[OPTIONS.length - 1],
    },
    'multi select > PageUp key takes us to previous page with default page size of 5': {
      props: {
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS
      },
      keyEvent: { keyCode: 33, key: 'PageUp' },
      selectedOption: OPTIONS[6],
      nextFocusOption: OPTIONS[1],
    },
    'multi select > PageUp key takes us to first option - previous options < pageSize': {
      props: {
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS
      },
      keyEvent: { keyCode: 33, key: 'PageUp' },
      selectedOption: OPTIONS[1],
      nextFocusOption: OPTIONS[0],
    },
    'multi select > Home key takes up to the first option': {
      props: {
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS
      },
      keyEvent: { keyCode: 36, key: 'Home' },
      selectedOption: OPTIONS[OPTIONS.length - 3],
      nextFocusOption: OPTIONS[0],
    },
    'multi select > End key takes down to the last option': {
      props: {
        isMulti: true,
        menuIsOpen: true,
        options: OPTIONS
      },
      keyEvent: { keyCode: 35, key: 'End' },
      selectedOption: OPTIONS[2],
      nextFocusOption: OPTIONS[OPTIONS.length - 1],
    },
  });

// TODO: Cover more scenario
cases('hitting escape with inputValue in select', ({ props }) => {
  let spy = jest.fn();
  let selectWrapper = mount(<Select {...props} onInputChange={spy} />);

  selectWrapper.simulate('keyDown', { keyCode: 27, key: 'Escape' });
  expect(spy).toHaveBeenCalledWith('', { action: 'menu-close' });
}, {
    'single select > should call onInputChange prop with empty string as inputValue': {
      props: {
        menuIsOpen: true,
        value: OPTIONS[0],
        options: OPTIONS,
        inputValue: 'test'
      },
    },
    'multi select > should call onInputChange prop with empty string as inputValue': {
      props: {
        isMulti: true,
        menuIsOpen: true,
        value: OPTIONS[0],
        options: OPTIONS,
        inputValue: 'test'
      },
    }
  });

cases('opening and closing select by clicking primary button on mouse', ({ props }) => {
  let onMenuOpenSpy = jest.fn();
  let onMenuCloseSpy = jest.fn();
  let selectWrapper = mount(<Select {...props} onMenuOpen={onMenuOpenSpy} onMenuClose={onMenuCloseSpy} />);
  let downButtonWrapper = selectWrapper.find('div.react-select__dropdown-indicator');

  // opens menu if menu is closed
  expect(selectWrapper.props().menuIsOpen).toBe(false);
  downButtonWrapper.simulate('mouseDown', { button: 0 });
  expect(onMenuOpenSpy).toHaveBeenCalled();

  // closes menu if menu is opened
  selectWrapper.setProps({ menuIsOpen: true });
  downButtonWrapper.simulate('mouseDown', { button: 0 });
  expect(onMenuCloseSpy).toHaveBeenCalled();
}, {
    'single select > should call onMenuOpen prop when select is opened and onMenuClose prop when select is closed': {
      props: {
        options: OPTIONS
      }
    },
    'multi select > should call onMenuOpen prop when select is opened and onMenuClose prop when select is closed': {
      props: {
        isMulti: true,
        options: OPTIONS
      }
    }
  });

cases('clicking on select using secondary button on mouse', ({ props }) => {
  let onMenuOpenSpy = jest.fn();
  let onMenuCloseSpy = jest.fn();
  let selectWrapper = mount(<Select {...props} onMenuOpen={onMenuOpenSpy} onMenuClose={onMenuCloseSpy} />);
  let downButtonWrapper = selectWrapper.find('div.react-select__dropdown-indicator');

  // opens menu if menu is closed
  expect(selectWrapper.props().menuIsOpen).toBe(false);
  downButtonWrapper.simulate('mouseDown', { button: 1 });
  expect(onMenuOpenSpy).not.toHaveBeenCalled();

  // closes menu if menu is opened
  selectWrapper.setProps({ menuIsOpen: true });
  downButtonWrapper.simulate('mouseDown', { button: 1 });
  expect(onMenuCloseSpy).not.toHaveBeenCalled();
}, {
    'single select > seconday click is ignored  >should not call onMenuOpen and onMenuClose prop': {
      props: {
        options: OPTIONS
      }
    },
    'multi select > seconday click is ignored > should not call onMenuOpen and onMenuClose prop': {
      props: {
        isMulti: true,
        options: OPTIONS
      }
    }
  });

cases('required prop on input element', ({ props }) => {
  let selectWrapper = mount(<Select {...props} />);
  let inputWrapper = selectWrapper.find('input');
  expect(inputWrapper.props().required).toBeUndefined();
}, {
    'single select > should not have required attribute': {
      props: {
        options: OPTIONS
      }
    },
    'multi select > should not have required attribute': {
      props: {
        options: OPTIONS
      }
    }
  });
