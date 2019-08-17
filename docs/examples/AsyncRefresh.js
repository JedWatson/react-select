import React, { Component ,Fragment } from 'react';

import AsyncSelect from 'react-select/async';
import { colourOptions } from '../data';

const filterColors = (inputValue: string) => {
  return colourOptions.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const promiseOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

export default class WithPromises extends Component {
  constructor(props){
    super(props);

    this.handleButtonClick = this.handleButtonClick.bind(this);

    this.state={
        token:0
    };
  }

  handleButtonClick(){
    const { token } = this.state;

    this.setState({ token:token+1 });
  }

  render() {
    const { token } = this.state;

    return (
        <Fragment>
            <button onClick={this.handleButtonClick}>Refresh</button>
            <AsyncSelect refreshToken={token} cacheOptions defaultOptions loadOptions={promiseOptions} />
        </Fragment>
    );
  }
}
