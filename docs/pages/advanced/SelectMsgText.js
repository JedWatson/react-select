import React, { Component, Fragment } from 'react';
import ExampleWrapper from '../../ExampleWrapper';
import { Note } from '../../styled-components';
import md from '../../markdown/renderer';
import { LoadingMsg, PlaceholderMsg, NoOptionsMsg, ScreenReaderStatus } from '../../examples';

type State = {
  exampleConfig: 'placeholder' | 'loadingMessage' | 'noOptionsMessage' | 'screenReaderStatus'
}
export default class SelectMsgTextDocs extends Component<*, State> {

  state = {
    exampleConfig: 'placeholder',
  }

  getConfig () {
    switch(this.state.exampleConfig) {
      case 'placeholder':
        return {
          example: PlaceholderMsg,
          description: md`
            The placeholder prop accepts a string value,
            passing this in will augment the placeholder text that shows in the control
            ~~~js
              <Select placeholder="Custom placeholder text" />
            ~~~
          `,
          name: 'PlaceholderMsg',
          raw: require('!!raw-loader!../../examples/PlaceholderMsg.js')
        };
      case 'loadingMessage':
        return {
          example: LoadingMsg,
          description: md`
            The loadingMessage prop accepts a function of the following shape:
            (inputValue) => string
            The passed in function will be run internally to evaluate a string value that we render as the loadingMessage.
            ~~~js
              const loadingMessage = () => 'Custom loading message'
              <Select
                loadingMessage={loadingMessage}
              />
            ~~~
          `,
          name: 'LoadingMsg',
          raw: require('!!raw-loader!../../examples/LoadingMsg.js')
        };
      case 'noOptionsMessage':
        return {
          example: NoOptionsMsg,
          description: md`
            We allow for the customisation of the noOptionsMessage through a prop function of the following shape:
            ~~~js
                noOptionsMessage = (inputValue) => {
                  return 'custom noOptionsMessage' + inputValue;
                }
                <Select
                  noOptionsMessage={noOptionsMessage}
                />
            ~~~
          `,
          name: 'NoOptionsMsg',
          snippet: '',
          raw: require('!!raw-loader!../../examples/NoOptionsMsg.js')
        };
      case 'screenReaderStatus':
        return {
          example: ScreenReaderStatus,
          description: md`
            Please turn your screen reader on for this example.
            We expose a screenReaderStatus prop of the following shape:
            (count) => string

            This allows you to customise how the screen reader reads out
            the amount of options available at any given time.
            ~~~js
              const screenReaderStatus =
               (count) => ('there are currently ' + count ' options available');
               
              <Select
                screenReaderStatus={screenReaderStatus}
              />
            ~~~
          `,
          name: 'ScreenReaderStatus',
          raw: require('!!raw-loader!../../examples/ScreenReaderStatus.js')
        };
      default:
        return {
          props: {},
          description: '',
          snippet: '',
        };
    };
  }

  toggleConfig = ({ currentTarget }) => {
    this.setState({
      exampleConfig: currentTarget.value,
    });
  }

  renderSwitch () {
    const { exampleConfig } = this.state;
    return (

      <Fragment>
        { /* THIS COULD BE A SELECT */ }
        <Note Tag="label" display={'block'}>
          <input
            type="radio"
            onChange={this.toggleConfig}
            name="exampleConfig"
            value={'placeholder'}
            checked={exampleConfig === 'placeholder'}
          />
          Customise Placeholder
        </Note>
        <Note Tag="label" display={'block'}>
          <input
            type="radio"
            onChange={this.toggleConfig}
            name="exampleConfig"
            value={'loadingMessage'}
          />
          Customise Loading Message
        </Note>
        <Note Tag="label" display={'block'}>
          <input
            type="radio"
            name="exampleConfig"
            onChange={this.toggleConfig}
            value={'noOptionsMessage'}
          />
          Customise No Options Message
        </Note>

        <Note Tag="label" display={'block'}>
          <input
            type="radio"
            name="exampleConfig"
            onChange={this.toggleConfig}
            value={'screenReaderStatus'}
          />
          Customise Screen Reader Status
        </Note>
      </Fragment>
    );
  }

  render () {
    const { description, example: SelectMsgText, raw, name } = this.getConfig();
    return (
      <Fragment>
        { this.renderSwitch() }
        {description}
        <ExampleWrapper
          label="Example"
          urlPath={`docs/examples/${name}`}
          raw={raw}
        >
          <SelectMsgText/>
        </ExampleWrapper>
      </Fragment>
    );
  }
}
