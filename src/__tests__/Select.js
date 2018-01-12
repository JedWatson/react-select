import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import Select from '../Select';
import { components } from '../components';

const { Option, SingleValue } = components;

Enzyme.configure({ adapter: new Adapter() });

test('defaults', () => {
  const tree = shallow(<Select />);
  expect(toJson(tree)).toMatchSnapshot();
});

test('formatters.optionLabel', () => {
  function optionLabel({ label, value }) {
    return `${label} ${value}`;
  }
  const tree = shallow(
    <Select
      formatters={{ optionLabel }}
      options={[
        { label: '1', value: 'one' },
        { label: '2', value: 'two' },
        { label: '3', value: 'three' },
      ]}
    />
  );
  tree.setState({ menuIsOpen: true });
  const opts = tree.find(Option);
  expect(opts).toHaveLength(3);
  expect(opts.at(0).props().label).toBe('1 one');
  expect(opts.at(1).props().label).toBe('2 two');
  expect(opts.at(2).props().label).toBe('3 three');
});

test('formatters.valueLabel', () => {
  function valueLabel({ label, value }) {
    return `${label} ${value}`;
  }
  const opts = [
    { label: '1', value: 'one' },
    { label: '2', value: 'two' },
    { label: '3', value: 'three' },
  ];
  const tree = shallow(
    <Select formatters={{ valueLabel }} options={opts} value={opts[1]} />
  );
  const sval = tree.find(SingleValue).at(0);
  expect(sval.props().children).toBe('2 two');
});
