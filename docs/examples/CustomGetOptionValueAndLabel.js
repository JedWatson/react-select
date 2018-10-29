import React, { Component, Fragment } from 'react';
import Select from '../../src';
import { movieOptions } from '../data';

export default class CustomGetOptionValueAndLabel extends Component<*> {
  render () {
    return (
      <Fragment>
      <p>Using a custom value and label</p>
      <Select
        defaultValue={movieOptions[0]}
        isClearable
        isSearchable
        name="color"
        options={movieOptions}
        getOptionValue={(option) => option.id}
        getOptionLabel={(option) => (`${option.genre}: ${option.title}`)}
      />
      </Fragment>
    );
  }
}
