import React from 'react';

import Select from '../../src';
import { colourOptions } from '../data';

export default () => (
  <Select
    defaultValue={[colourOptions[2], colourOptions[3]]}
    isMulti
    name="colors"
    onValueClick={onValueClick}
    options={colourOptions}
    className="basic-multi-select"
  />
);


const onValueClick = (value, actionMeta) => {
  console.info(value);
  console.info(actionMeta);
};
