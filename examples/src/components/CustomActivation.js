import React from 'react';
import Select from 'react-select';

const FLAVOURS = [
  { label: 'Chocolate', value: 'chocolate' },
  { label: 'Vanilla', value: 'vanilla' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Caramel', value: 'caramel' },
  { label: 'Cookies and Cream', value: 'cookiescream' },
  { label: 'Peppermint', value: 'peppermint' },
];

export default class CustomActivation extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: null,
    };
  }

  handlesMouseLeave() {
    this.setState({ isOpen: false });
  }

  handleClose() {
    this.setState({ isOpen: true });
  }

  handleSelectChange(options) {
    this.setState({ value: options });
  }

  render() {
    return (
      <div className="section">
        <h3 className="section-heading">{ this.props.label }</h3>
        <div onMouseLeave={this.handlesMouseLeave}>
          <Select
            multi
            value={this.state.value}
            placeholder="Select your favourite(s)"
            option={FLAVOURS}
            onChange={this.handleSelectChange}
            alwaysOpen={this.state.isOpen}
          />
        </div>
      </div>
    );
  }
}
