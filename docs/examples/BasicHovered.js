import React from 'react';

import Select from '../../src';

const descriptions = [
  {
    key: 'chocolate',
    desc: 'Information about chocolate',
  },
  {
    key: 'strawberry',
    desc: 'Information about strawberry',
  },
  {
    key: 'vanilla',
    desc: 'Information about vanilla',
  }
];

const getDescription = (key: string): string => {
  return descriptions.filter((item) => item.key === key)[0].desc;
};

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

function FixedTooltip({ value }) {
  return (
    <div>
      {value}
    </div>
  );
}


type Option = {
  label: string,
  value: string
}

type Props = {
  getDescription: typeof getDescription
};

type State = {
  value: string | null,
  options: Array<Option>,
  onMouseEnter: (data: Option) => void,
  onMouseLeave: (data: Option) => void
}

const defaultProps = {
  getDescription: getDescription
};

export default class BasicHovered extends React.Component<Props, State> {
  static defaultProps = defaultProps;
  state = {
    value: null,
    options: []
  };

  componentDidMount() {
    this.setOptions();
  }

  setOptions() {
    this.setState({
      options: options.map(option => {
        return Object.assign(option, {
          onMouseEnter: (data) => {
            this.setState({
              value: data.value
            });
          },
          onMouseLeave: () => {
            this.setState({
              value: null
            });
          }
        });
      })
    });
  }

  getDescriptionValue(): string  {
    const { value } = this.state;
    return value
      ? this.props.getDescription(value)
      : 'Please hover element for showing description';
  }

  render() {
    return (
      <div>
        <FixedTooltip value={this.getDescriptionValue()}/>
        <Select
          defaultValue={this.state.options[1]}
          options={this.state.options}
        />
      </div>
    );
  }
}
