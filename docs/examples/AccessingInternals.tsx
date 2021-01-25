import React, { Component, Fragment } from 'react';

import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import CreatableSelect from 'react-select/creatable';

import { Note } from '../styled-components';
import { ColourOption, colourOptions } from '../data';

const filterColors = (inputValue: string) => {
  return colourOptions.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const promiseOptions = (inputValue: string) =>
  new Promise<ColourOption[]>(resolve => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

export default class AccessingInternals extends Component {
  selectRef?: Select<ColourOption, false> | null;
  asyncRef?: AsyncSelect<ColourOption> | null;
  creatableRef?: CreatableSelect<ColourOption> | null;
  focus = () => {
    console.log(this.selectRef);
    this.selectRef!.focus();
  };
  focusCreatable = () => {
    console.log(this.creatableRef);
    this.creatableRef!.focus();
  };
  focusAsync = () => {
    console.log(this.asyncRef);
    this.asyncRef!.focus();
  };
  blurAsync = () => {
    this.asyncRef!.blur();
  };
  blurCreatable = () => {
    this.creatableRef!.blur();
  };
  blur = () => this.selectRef!.blur();
  onSelectRef = (ref: Select<ColourOption, false>) => {
    console.log(ref);
    this.selectRef = ref;
  };
  render() {
    return (
      <Fragment>
        <h4>Creatable Select</h4>
        <CreatableSelect
          ref={ref => {
            this.creatableRef = ref;
          }}
          isClearable
          options={colourOptions}
        />
        <Note Tag="label">
          <button
            onClick={this.focusCreatable}
            id="cypress-single__clearable-checkbox"
          >
            Focus
          </button>
        </Note>
        <Note Tag="label">
          <button
            onClick={this.blurCreatable}
            id="cypress-single__clearable-checkbox"
          >
            Blur
          </button>
        </Note>
        <h4>Async Select</h4>
        <AsyncSelect
          ref={ref => {
            this.asyncRef = ref;
          }}
          cacheOptions
          defaultOptions
          loadOptions={promiseOptions}
        />
        <Note Tag="label">
          <button
            onClick={this.focusAsync}
            id="cypress-single__clearable-checkbox"
          >
            Focus
          </button>
        </Note>
        <Note Tag="label">
          <button
            onClick={this.blurAsync}
            id="cypress-single__clearable-checkbox"
          >
            Blur
          </button>
        </Note>
        <h4>Select</h4>
        <Select
          ref={ref => {
            this.selectRef = ref;
          }}
          defaultValue={colourOptions[2]}
          name="colors"
          options={colourOptions}
        />
        <Note Tag="label">
          <button onClick={this.focus} id="cypress-single__clearable-checkbox">
            Focus
          </button>
        </Note>
        <Note Tag="label">
          <button onClick={this.blur} id="cypress-single__clearable-checkbox">
            Blur
          </button>
        </Note>
      </Fragment>
    );
  }
}
