import React from 'react';

import AsyncSelect from 'react-select/async';
import { ColourOption, colourOptions } from '../data';

const filterColors = (inputValue: string) => {
  return colourOptions.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const promiseOptions = (inputValue: string) =>
  new Promise<ColourOption[]>((resolve) => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

export default () => (
  <AsyncSelect cacheOptions defaultOptions loadOptions={promiseOptions} />
);
