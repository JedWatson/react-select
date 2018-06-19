// @flow
import { type SelectComponents, defaultComponents } from '../components/index';
import { default as AnimatedInput } from './Input';
import { default as AnimatedMultiValue } from './MultiValue';
import { default as AnimatedPlaceholder } from './Placeholder';
import { default as AnimatedSingleValue } from './SingleValue';
import { default as AnimatedValueContainer } from './ValueContainer';

export const makeAnimated = (externalComponents?: SelectComponents) => {
  const components = defaultComponents({ components: externalComponents });
  const { Input, MultiValue, Placeholder, SingleValue, ValueContainer, ...rest } = components;
  return {
    Input: AnimatedInput(Input),
    MultiValue: AnimatedMultiValue(MultiValue),
    Placeholder: AnimatedPlaceholder(Placeholder),
    SingleValue: AnimatedSingleValue(SingleValue),
    ValueContainer: AnimatedValueContainer(ValueContainer),
    ...rest,
  };
};
const AnimatedComponents = makeAnimated();
export default AnimatedComponents;
