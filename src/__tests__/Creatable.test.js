import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Creatable from '../Creatable';
import { OPTIONS } from './constants';
import { components } from '../components';
const { Menu, NoOptionsMessage } = components;

test('defaults - snapshot', () => {
  const tree = shallow(<Creatable />);
  expect(toJson(tree)).toMatchSnapshot();
});

test('to not show a "create..." prompt if current filter text is an exact match for an existing option', () => {
  const creatableSelectWrapper = mount(<Creatable menuIsOpen options={OPTIONS}/>);
  creatableSelectWrapper.setProps({ inputValue: 'one' });
  expect(creatableSelectWrapper.find(Menu).text()).not.toEqual( expect.stringContaining('create') );
});

test('guard against invalid values returned by filterOptions', () => {
  let filterOptionSpy = jest.fn().mockReturnValue(null);
  const creatableSelectWrapper = mount(<Creatable filterOption={filterOptionSpy} menuIsOpen options={OPTIONS}/>);
  creatableSelectWrapper.setProps({ inputValue: 'one' });
  expect(creatableSelectWrapper.find(NoOptionsMessage).exists()).toBeTruthy();
  expect(creatableSelectWrapper.find(Menu).text()).not.toEqual( expect.stringContaining('create') );
});

test('to add a placeholder "create..." prompt when filter text is entered that does not match any existing options', () => {
  const creatableSelectWrapper = mount(<Creatable menuIsOpen options={OPTIONS} />);
  creatableSelectWrapper.setProps({ inputValue: 'option not is list' });
  expect(creatableSelectWrapper.find(Menu).text()).toBe('Create "option not is list"');
});

test('to not show a "create..." prompt if current filter text is not a valid option (as determined by :isValidNewOption prop)', () => {
  let isValidNewOption = jest.fn((options) => options === 'new Option');
  const creatableSelectWrapper = mount(<Creatable menuIsOpen options={OPTIONS} isValidNewOption={isValidNewOption} />);

  creatableSelectWrapper.setProps({ inputValue: 'new Option' });
  expect(creatableSelectWrapper.find(Menu).text()).toEqual(expect.stringContaining('Create "new Option"'));
  expect(creatableSelectWrapper.find(NoOptionsMessage).exists()).toBeFalsy();

  creatableSelectWrapper.setProps({ inputValue: 'invalid new Option' });
  expect(creatableSelectWrapper.find(Menu).text()).not.toEqual(expect.stringContaining('Create "invalid new Option"'));
  expect(creatableSelectWrapper.find(NoOptionsMessage).exists()).toBeTruthy();
});

test('to not show a "create..." prompt if current filter text is not a valid option (as determined by :isValidNewOption prop)', () => {
  let isValidNewOption = jest.fn((options) => options === 'new Option');
  const creatableSelectWrapper = mount(<Creatable menuIsOpen options={OPTIONS} isValidNewOption={isValidNewOption} />);

  creatableSelectWrapper.setProps({ inputValue: 'new Option' });
  expect(creatableSelectWrapper.find(Menu).text()).toEqual(expect.stringContaining('Create "new Option"'));
  expect(creatableSelectWrapper.find(NoOptionsMessage).exists()).toBeFalsy();

  creatableSelectWrapper.setProps({ inputValue: 'invalid new Option' });
  expect(creatableSelectWrapper.find(Menu).text()).not.toEqual(expect.stringContaining('Create "invalid new Option"'));
  expect(creatableSelectWrapper.find(NoOptionsMessage).exists()).toBeTruthy();
});

test('remove the new option after closing on escape', () => {
  const creatableSelectWrapper = mount(<Creatable menuIsOpen options={OPTIONS}/>);
  creatableSelectWrapper.setState({ inputValue: 'new Option' });
  creatableSelectWrapper.simulate('keyDown', { keyCode: 27 });
  expect(creatableSelectWrapper.state('inputValue')).toBe('');
});

test.skip('should remove the new option after closing on blur', () => {
  const creatableSelectWrapper = mount(<Creatable menuIsOpen options={OPTIONS}/>);
  creatableSelectWrapper.setState({ inputValue: 'new Option' });
  creatableSelectWrapper.simulate('blur');
  expect(creatableSelectWrapper.state('inputValue')).toBe('');
});

test('getNewOptionData prop', () => {
  let getNewOptionDataSpy = jest.fn((label) => ({ label: `custom text ${label}`, value: label }));
  const creatableSelectWrapper = mount(<Creatable menuIsOpen options={OPTIONS} getNewOptionData={getNewOptionDataSpy}/>);
  creatableSelectWrapper.setState({ inputValue: 'new Option' });
  expect(creatableSelectWrapper.find(Menu).text()).toEqual(expect.stringContaining('custom text new Option'));
});

test('formatCreateLabel prop', () => {
  let formatCreateLabelSpy = jest.fn((label) => `custom label "${label}"`);
  const creatableSelectWrapper = mount(<Creatable menuIsOpen options={OPTIONS} formatCreateLabel={formatCreateLabelSpy}/>);
  creatableSelectWrapper.setState({ inputValue: 'new Option' });
  expect(creatableSelectWrapper.find(Menu).text()).toEqual(expect.stringContaining('custom label "new Option"'));
});
