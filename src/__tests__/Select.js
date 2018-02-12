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

test('formatOptionLabel', () => {
  function formatOptionLabel({ label, value }, { context }) {
    return `${label} ${value} ${context}`;
  }
  const opts = [
    { label: '1', value: 'one' },
    { label: '2', value: 'two' },
    { label: '3', value: 'three' },
  ];
  const tree = shallow(
    <Select
      formatOptionLabel={formatOptionLabel}
      options={opts}
      value={opts[1]}
    />
  );
  const value = tree.find(SingleValue).at(0);
  expect(value.props().children).toBe('2 two value');
  tree.setProps({ menuIsOpen: true });
  const menu = tree.find(Option);
  expect(menu).toHaveLength(3);
  expect(menu.at(0).props().children).toBe('1 one menu');
  expect(menu.at(1).props().children).toBe('2 two menu');
  expect(menu.at(2).props().children).toBe('3 three menu');
});
