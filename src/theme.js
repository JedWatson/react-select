// @flow

export const borderRadius = 4;

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

const baseUnit = 4;

export const spacing = {
  /* Used to calculate consistent margin/padding on elements */
  baseUnit,
  /* The minimum height of the control */
  controlHeight: 38,
  /* The amount of space between the control and menu */
  menuGutter: baseUnit * 2,
};
