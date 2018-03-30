import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import cases from 'jest-in-case';

import Async from '../Async';
import { OPTIONS } from './constants';
import { components } from '../components';
const { Option } = components;

test('defaults - snapshot', () => {
  const tree = mount(<Async />);
  expect(toJson(tree)).toMatchSnapshot();
});

/**
 * loadOptions with promise is not resolved and it renders loading options
 * confirmed by logging in component that loadOptions is resolved and options are available
 * but still loading options is rendered
 */
cases(
  'load option prop with defaultOptions true',
  ({ props, expectOptionLength }) => {
    const asyncSelectWrapper = mount(<Async menuIsOpen {...props} />);
    expect(asyncSelectWrapper.find(Option).length).toBe(expectOptionLength);
  },
  {
    'with callback  > should resolve options': {
      props: {
        defaultOptions: true,
        loadOptions: (inputValue, callBack) => callBack([OPTIONS[0]]),
      },
      expectOptionLength: 1,
    },
    'with promise  > should resolve options': {
      skip: true,
      props: {
        defaultOptions: true,
        loadOptions: () => Promise.resolve([OPTIONS[0]]),
      },
      expectOptionLength: 1,
    },
  }
);

/**
 * loadOptions with promise is not resolved and it renders loading options
 * confirmed by logging in component that loadOptions is resolved and options are available
 * but still loading options is rendered
 */
cases(
  'load options props with no default options',
  ({ props, expectloadOptionsLength }) => {
    let asyncSelectWrapper = mount(<Async {...props} />);
    let inputValueWrapper = asyncSelectWrapper.find(
      'div.react-select__input input'
    );
    asyncSelectWrapper.setProps({ inputValue: 'a' });
    inputValueWrapper.simulate('change', { currentTarget: { value: 'a' } });
    expect(asyncSelectWrapper.find(Option).length).toBe(
      expectloadOptionsLength
    );
  },
  {
    'with callback > should resolve the options': {
      props: {
        loadOptions: (inputValue, callBack) => callBack(OPTIONS),
      },
      expectloadOptionsLength: 17,
    },
    'with promise > should resolve the options': {
      skip: true,
      props: {
        loadOptions: () => Promise.resolve(OPTIONS),
      },
      expectloadOptionsLength: 17,
    },
  }
);

/**
 * Need to update porps to trigger on change in input
 * when updating props renders the component therefore options cache is lost thus loadOptions is called again
 */
test.skip('to not call loadOptions again for same value when cacheOptions is true', () => {
  let loadOptionsSpy = jest.fn();
  let asyncSelectWrapper = mount(
    <Async loadOptions={loadOptionsSpy} cacheOptions />
  );
  let inputValueWrapper = asyncSelectWrapper.find(
    'div.react-select__input input'
  );

  asyncSelectWrapper.setProps({ inputValue: 'a' });
  inputValueWrapper.simulate('change', { currentTarget: { value: 'a' } });
  expect(loadOptionsSpy).toHaveBeenCalledTimes(1);

  asyncSelectWrapper.setProps({ inputValue: 'b' });
  inputValueWrapper.simulate('change', {
    target: { value: 'b' },
    currentTarget: { value: 'b' },
  });
  expect(loadOptionsSpy).toHaveBeenCalledTimes(2);

  asyncSelectWrapper.setProps({ inputValue: 'b' });
  inputValueWrapper.simulate('change', { currentTarget: { value: 'b' } });
  expect(loadOptionsSpy).toHaveBeenCalledTimes(2);
});

test('to call loadOptions with page when pagination is true', () => {
  const loadOptionsSpy = jest.fn((inputValue, page, callback) => callback(OPTIONS));
  mount(<Async loadOptions={loadOptionsSpy} pagination defaultOptions />);

  expect(loadOptionsSpy).toHaveBeenCalledTimes(1);
  expect(loadOptionsSpy.mock.calls[0].length).toBe(3);
  expect(loadOptionsSpy.mock.calls[0][1]).toBe(1);
});

test('to call loadOptions with incremented page when pagination is true and the user scrolls to the bottom of the options', () => {
  const loadOptionsSpy = jest.fn((inputValue, page, callback) => callback(OPTIONS));
  const asyncSelectWrapper = mount(
    <Async loadOptions={loadOptionsSpy} pagination menuIsOpen defaultOptions />
  );
  const instanceOne = asyncSelectWrapper.instance();

  instanceOne.handleMenuScrollToBottom();

  expect(loadOptionsSpy).toHaveBeenCalledTimes(2);
  expect(loadOptionsSpy.mock.calls[0][1]).toBe(1);
  expect(loadOptionsSpy.mock.calls[1][1]).toBe(2);
});

test('to call loadOptions with page 1 when pagination is true and the user changes input to a new, non-cached, value', () => {
  const loadOptionsSpy = jest.fn((inputValue, page, callback) => callback(OPTIONS));
  const asyncSelectWrapper = mount(
    <Async loadOptions={loadOptionsSpy} pagination menuIsOpen defaultOptions />
  );
  const inputValueWrapper = asyncSelectWrapper.find(
    'div.react-select__input input'
  );
  const instanceOne = asyncSelectWrapper.instance();

  instanceOne.handleMenuScrollToBottom();
  asyncSelectWrapper.setProps({ inputValue: 'a' });
  inputValueWrapper.simulate('change', { currentTarget: { value: 'a' } });

  expect(loadOptionsSpy).toHaveBeenCalledTimes(3);
  expect(loadOptionsSpy.mock.calls[0][1]).toBe(1);
  expect(loadOptionsSpy.mock.calls[1][1]).toBe(2);
  expect(loadOptionsSpy.mock.calls[2][1]).toBe(1);
});

test('to to load all of the cached pages from cache when pagination is true', () => {
  const loadOptionsSpy = jest.fn((inputValue, page, callback) => callback(OPTIONS));
  const asyncSelectWrapper = mount(
    <Async loadOptions={loadOptionsSpy} pagination menuIsOpen defaultOptions cacheOptions />
  );
  const inputValueWrapper = asyncSelectWrapper.find(
    'div.react-select__input input'
  );
  const instanceOne = asyncSelectWrapper.instance();

  instanceOne.handleMenuScrollToBottom();
  asyncSelectWrapper.setProps({ inputValue: 'a' });
  inputValueWrapper.simulate('change', { currentTarget: { value: 'a' } });

  asyncSelectWrapper.setProps({ inputValue: '' });
  inputValueWrapper.simulate('change', { currentTarget: { value: '' } });

  expect(loadOptionsSpy).toHaveBeenCalledTimes(3);
  expect(loadOptionsSpy.mock.calls[0][1]).toBe(1);
  expect(loadOptionsSpy.mock.calls[1][1]).toBe(2);
  expect(loadOptionsSpy.mock.calls[2][1]).toBe(1);
  expect(asyncSelectWrapper.find(Option).length).toBe(OPTIONS.length * 2);
});

test('to create new cache for each instance', () => {
  const asyncSelectWrapper = mount(<Async cacheOptions />);
  const instanceOne = asyncSelectWrapper.instance();

  const asyncSelectTwoWrapper = mount(<Async cacheOptions />);
  const instanceTwo = asyncSelectTwoWrapper.instance();

  expect(instanceOne.optionsCache).not.toBe(instanceTwo.optionsCache);
});

test('in case of callbacks display the most recently-requested loaded options (if results are returned out of order)', () => {
  let callbacks = [];
  const loadOptions = (inputValue, callback) => {
    callbacks.push(callback);
  };
  let asyncSelectWrapper = mount(<Async loadOptions={loadOptions} />);
  let inputValueWrapper = asyncSelectWrapper.find(
    'div.react-select__input input'
  );
  asyncSelectWrapper.setProps({ inputValue: 'foo' });
  inputValueWrapper.simulate('change', { currentTarget: { value: 'foo' } });
  asyncSelectWrapper.setProps({ inputValue: 'bar' });
  inputValueWrapper.simulate('change', { currentTarget: { value: 'bar' } });
  expect(asyncSelectWrapper.find(Option).exists()).toBeFalsy();
  callbacks[1]([{ value: 'bar', label: 'bar' }]);
  callbacks[0]([{ value: 'foo', label: 'foo' }]);
  asyncSelectWrapper.update();
  expect(asyncSelectWrapper.find(Option).text()).toBe('bar');
});

/**
 * This throws a jsdom exception
 */
test.skip('in case of callbacks should handle an error by setting options to an empty array', () => {
  const loadOptions = (inputValue, callback) => {
    callback(new Error('error'));
  };
  let asyncSelectWrapper = mount(
    <Async loadOptions={loadOptions} options={OPTIONS} />
  );
  let inputValueWrapper = asyncSelectWrapper.find(
    'div.react-select__input input'
  );
  asyncSelectWrapper.setProps({ inputValue: 'foo' });
  inputValueWrapper.simulate('change', { currentTarget: { value: 'foo' } });
  asyncSelectWrapper.update();
  expect(asyncSelectWrapper.find(Option).length).toBe(1);
});
