'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var colors = exports.colors = {
  primary: '#2684FF',
  primary75: '#4C9AFF',
  primary50: '#B2D4FF',
  primary25: '#DEEBFF',

  danger: '#DE350B',
  dangerLight: '#FFBDAD',

  neutral0: 'hsl(0, 0%, 100%)',
  neutral5: 'hsl(0, 0%, 95%)',
  neutral10: 'hsl(0, 0%, 90%)',
  neutral20: 'hsl(0, 0%, 80%)',
  neutral30: 'hsl(0, 0%, 70%)',
  neutral40: 'hsl(0, 0%, 60%)',
  neutral50: 'hsl(0, 0%, 50%)',
  neutral60: 'hsl(0, 0%, 40%)',
  neutral70: 'hsl(0, 0%, 30%)',
  neutral80: 'hsl(0, 0%, 20%)',
  neutral90: 'hsl(0, 0%, 10%)'
};

var borderRadius = 4;
var baseUnit = 4; /* Used to calculate consistent margin/padding on elements */
var controlHeight = 38; /* The minimum height of the control */
var menuGutter = baseUnit * 2; /* The amount of space between the control and menu */

var spacing = exports.spacing = {
  baseUnit: baseUnit,
  controlHeight: controlHeight,
  menuGutter: menuGutter
};

var defaultTheme = exports.defaultTheme = {
  borderRadius: borderRadius,
  colors: colors,
  spacing: spacing
};