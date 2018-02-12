// @flow

import type { MenuPlacement, OptionsType, ValueType } from './types';
import { spacing } from './theme';

// ==============================
// NO OP
// ==============================

export const noop = () => {};

// ==============================
// Class Name Prefixer
// ==============================

type State = { [key: string]: boolean };
type List = Array<string>;

export const CLASS_PREFIX = 'react-select';

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

// ==============================
// Clean Value
// ==============================

export const cleanValue = (value: ValueType): OptionsType => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === 'object' && value !== null) return [value];
  return [];
};

// ==============================
// Handle Input Change
// ==============================

export function handleInputChange(
  inputValue: string,
  onInputChange?: string => string | void
) {
  if (onInputChange) {
    const newValue = onInputChange(inputValue);
    if (typeof newValue === 'string') return newValue;
  }
  return inputValue;
}

// ==============================
// Scroll Into View
// ==============================

export const scrollIntoView = (
  menuEl: HTMLElement,
  focusedEl: HTMLElement
): void => {
  // TODO: Is there a way to overscroll to group headings?
  const menuRect = menuEl.getBoundingClientRect();
  const focusedRect = focusedEl.getBoundingClientRect();
  const overScroll = focusedEl.offsetHeight / 3;
  if (focusedRect.bottom + overScroll > menuRect.bottom) {
    menuEl.scrollTop = Math.min(
      focusedEl.offsetTop +
        focusedEl.clientHeight -
        menuEl.offsetHeight +
        overScroll,
      menuEl.scrollHeight
    );
  } else if (focusedRect.top - overScroll < menuRect.top) {
    menuEl.scrollTop = Math.max(focusedEl.offsetTop - overScroll, 0);
  }
};

export const toKey = (str: string): string => {
  return str.replace(/\W/g, '-');
};

// ==============================
// Get Menu Placement
// ==============================

type Placement = MenuPlacement | false;

export function getMenuPlacement(element: HTMLElement): Placement {
  // not enough info to calc properly
  if (!element || !element.offsetParent) return false;

  const { top: containerTop } = element.offsetParent.getBoundingClientRect();
  const { height, top } = element.getBoundingClientRect();

  const docEl = document.documentElement;
  const windowHeight = window.innerHeight || (docEl && docEl.clientHeight) || 0;
  const menuHeight = height + spacing.menuGutter;

  const spaceBelow = windowHeight - top;
  const spaceAbove = containerTop - spacing.menuGutter;

  // the menu will fit above, or at least has more space than below
  if (menuHeight >= spaceBelow && spaceAbove > spaceBelow) {
    return 'top';
  }

  // the menu will fit below, or at least has more space than above
  if (menuHeight >= spaceAbove && spaceBelow > spaceAbove) {
    return 'bottom';
  }

  // no edge conflict found
  return false;
}
