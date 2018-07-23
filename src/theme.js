// @flow

import type { Theme } from './types';

export const colors = {
  primary: '#2684FF',
  primary75: '#4C9AFF',
  primary50: '#B2D4FF',
  primary25: '#DEEBFF',

  danger: '#DE350B',
  dangerLight: '#FFBDAD',

  neutral0: 'hsl(218, 0%, 100%)',
  neutral5: 'hsl(218, 5%, 95%)',
  neutral10: 'hsl(218, 10%, 90%)',
  neutral20: 'hsl(218, 15%, 80%)',
  neutral30: 'hsl(218, 20%, 70%)',
  neutral40: 'hsl(218, 25%, 60%)',
  neutral50: 'hsl(218, 30%, 50%)',
  neutral60: 'hsl(218, 35%, 40%)',
  neutral70: 'hsl(218, 40%, 30%)',
  neutral80: 'hsl(218, 45%, 20%)',
  neutral90: 'hsl(218, 50%, 10%)',
};

const borderRadius = 4;
const baseUnit = 4;  /* Used to calculate consistent margin/padding on elements */
const controlHeight = 38;  /* The minimum height of the control */
const menuGutter = baseUnit * 2;  /* The amount of space between the control and menu */

export const spacing = {
  baseUnit,
  controlHeight,
  menuGutter,
};

export const defaultTheme: Theme = {
  borderRadius,
  colors,
  spacing,
};

export type ThemeConfig = Theme | ((theme: Theme) => Theme);
