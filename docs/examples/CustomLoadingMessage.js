import React, { useState } from 'react';
import Tooltip from '@atlaskit/tooltip';
import AsyncSelect from 'react-select/async';
import { colourOptions } from '../data';

const LoadingMessage = props => {
  return (
    <Tooltip content={'Custom Loading Message'}>
      <div
        {...props.innerProps}
        style={props.getStyles('loadingMessage', props)}
      >
        {props.children}
      </div>
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

const CustomLoadingMessage = () => {
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
      loadOptions={promiseOptions}
      styles={{
        loadingMessage: base => ({
          ...base,
          backgroundColor: colourOptions[2].color,
          color: 'white',
        }),
      }}
      value={inputValue}
      onChange={handleInputChange}
      components={{ LoadingMessage }}
    />
  );

};

export default CustomLoadingMessage;
