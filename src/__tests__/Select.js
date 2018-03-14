import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import cases from 'jest-in-case';

import Select from '../Select';
import { components } from '../components';

const { MultiValue, SingleValue } = components;

Enzyme.configure({ adapter: new Adapter() });

const opts = [
  { label: '1', value: 'one' },
  { label: '2', value: 'two' },
  { label: '3', value: 'three' },
];

test('defaults', () => {
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
    'with single select': {
      props: {
        formatOptionLabel: ({ label, value }, { context }) => (`${label} ${value} ${context}`),
        options: opts,
        value: opts[0],
      },
      valueComponent: SingleValue,
      expectedOptions: '1 one value'
    },
    'with multi select': {
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
    'with single select': { props: { name: 'form-field-single-select' }, expectedName: 'form-field-single-select' },
    'with multi select': {
      props: {
        name: 'form-field-multi-select',
        isMulti: true,
        options: opts,
        value: opts[2]
      },
      expectedName: 'form-field-multi-select'
    },
  });
