// @flow

export const CLASS_PREFIX = 'react-select';

type State = { [key: string]: boolean };
type List = Array<string>;

/**
 String representation of component state for styling with class names.

 Expects an array of strings OR a string/object pair:
 - className(['comp', 'comp-arg', 'comp-arg-2'])
   @returns 'react-select__comp react-select__comp-arg react-select__comp-arg-2'
 - className('comp', { some: true, state: false })
   @returns 'react-select__comp react-select__comp--some'
*/
export function className(name: string | List, state?: State): string {
  const arr: List = Array.isArray(name) ? name : [name];

  // loop through state object, remove falsey values and combine with name
  if (state && typeof name === 'string') {
    for (let key in state) {
      if (state.hasOwnProperty(key) && state[key]) {
        arr.push(`${name}--${key}`);
      }
    }
  }

  // prefix everything and return a string
  return arr.map(cn => `${CLASS_PREFIX}__${cn}`).join(' ');
}
