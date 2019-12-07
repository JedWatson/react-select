import React, { useState } from 'react';
import Spinner from '@atlaskit/spinner';
import Tooltip from '@atlaskit/tooltip';
import AsyncSelect from 'react-select/async';
import { colourOptions } from '../data';

const LoadingIndicator = props => {
  return (
    <Tooltip content={'Custom Loader'}>
      <Spinner {...props} delay={0} />
    </Tooltip>
  );
};

const filterColors = (inputValue: string) =>
  colourOptions.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );

const promiseOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

const CustomLoadingIndicator = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (newValue: string) => {
    const newInputValue = newValue.replace(/\W/g, '');
    setInputValue(newInputValue);
    return newInputValue;
  };

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      value={inputValue}
      onChange={handleInputChange}
      loadOptions={promiseOptions}
      components={{ LoadingIndicator }}
    />
  );
};

export default CustomLoadingIndicator;

