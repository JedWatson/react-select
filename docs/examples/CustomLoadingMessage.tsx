import React from 'react';
import Tooltip from '@atlaskit/tooltip';
import AsyncSelect from 'react-select/async';
import { NoticeProps } from 'react-select';
import { ColourOption, colourOptions } from '../data';

const LoadingMessage = (props: NoticeProps<ColourOption, false>) => {
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

const promiseOptions = (inputValue: string) =>
  new Promise<ColourOption[]>(resolve => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

const CustomLoadingMessage = () => {
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
      components={{ LoadingMessage }}
    />
  );
};

export default CustomLoadingMessage;
