import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import AsyncCreatable from '../AsyncCreatable';
import Select from '../Select';
import { components } from '../components';
import { OPTIONS } from './constants';
const { Option } = components;

test('defaults - snapshot', () => {
  const tree = mount(<AsyncCreatable />);
  expect(toJson(tree)).toMatchSnapshot();
});

test('creates an inner Select', () => {
  const asyncCreatableWrapper = mount(<AsyncCreatable />);
  expect(asyncCreatableWrapper.find(Select).exists()).toBeTruthy();
});

test('render decorated select with props passed', () => {
  const asyncCreatableWrapper = mount(<AsyncCreatable className="foo"/>);
  expect(asyncCreatableWrapper.find(Select).props().className).toBe('foo');
});

test('to show the create option in menu', () => {
  let asyncCreatableWrapper = mount(<AsyncCreatable/>);
  let inputValueWrapper = asyncCreatableWrapper.find('div.react-select__input input');
  asyncCreatableWrapper.setProps({ inputValue: 'a' });
  inputValueWrapper.simulate('change', { currentTarget: { value: 'a' } });
  expect(asyncCreatableWrapper.find(Option).last().text()).toBe('Create "a"');
});

test('to show the create option in menu', () => {
  jest.useFakeTimers();
  let loadOptionsSpy = jest.fn((inputValue, callback) => setTimeout(() => callback(OPTIONS), 200));
  let asyncCreatableWrapper = mount(<AsyncCreatable loadOptions={loadOptionsSpy}/>);
  let inputValueWrapper = asyncCreatableWrapper.find('div.react-select__input input');
  asyncCreatableWrapper.setProps({ inputValue: 'a' });
  inputValueWrapper.simulate('change', { currentTarget: { value: 'a' } });
  jest.runOnlyPendingTimers();
  // jest.useFakeTimers();
  setTimeout(() => {
    console.log(asyncCreatableWrapper.debug());
    expect(asyncCreatableWrapper.find(Option).last().text()).toBe('Create "a"');
  }, 500);
  jest.runOnlyPendingTimers();
});
