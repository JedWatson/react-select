// @flow
import React, { Component } from 'react';
import { withValue } from 'react-value';

import { colors } from '../../src/theme';

import { groupedOptions } from '../data';

import { Li, Ul, Span } from '../../src/primitives';
import { Link, H1 } from '../components';

import Select from '../../src';
const SelectWithValue = withValue(Select);

class Group extends Component<*, *> {
  render() {
    const { children, getStyles, Heading, innerProps, label } = this.props;
    return (
      <Li
        aria-label={label}
        css={getStyles('group', this.props)}
        {...innerProps}
      >
        <Heading {...this.props} />
        <Ul>{children}</Ul>
      </Li>
    );
  }
}

const getGroupHeadingStyles = ({
  isSelected,
  isDisabled,
}) => defaultStyles => ({
  ...defaultStyles,
  backgroundColor: isSelected ? colors.primary : 'transparent',
  color: isDisabled
    ? colors.neutral20
    : isSelected ? colors.neutral0 : 'inherit',
  ':hover': isDisabled
    ? null
    : {
        background: '#999',
        color: '#fff',
      },
});

class GroupHeading extends Component<*, *> {
  children() {
    const { group: { key }, menuOptions: { render } } = this.props;
    const selectedGroup = render.find(i => i.key == key);
    return selectedGroup ? selectedGroup.children : [];
  }
  allOptionsSelected = () => {
    const { isOptionSelected } = this.props;
    const selectValue = this.props.getValue();
    return this.children().map(i => isOptionSelected(i, selectValue)).every(isTrue => isTrue);
  };
  valuesIncludingChildren = () => {
    const { isOptionSelected } = this.props;
    const selectValue = this.props.getValue();
    return [
      ...this.children().filter(i => !isOptionSelected(i, selectValue)).map(i => i.data),
      ...selectValue,
    ];
  };
  valuesExcludingChildren = () => {
    const { isOptionSelected } = this.props;
    const selectValue = this.props.getValue();
    return selectValue.filter(i => !isOptionSelected(i, this.children())).map(i => i.data);
  };
  toggleGroup = () => {
    const { setValue } = this.props;

    if (this.allOptionsSelected()) {
      setValue(this.valuesExcludingChildren());
    } else {
      setValue(this.valuesIncludingChildren());
    }
  };
  render() {
    const { getStyles, label, isDisabled } = this.props;

    const isSelected = this.allOptionsSelected();

    const defaultStyles = getStyles('groupHeading', this.props);
    const styles = getGroupHeadingStyles({ isSelected, isDisabled })(
      defaultStyles
    );

    return (
      <Span css={styles} onClick={isDisabled ? null : this.toggleGroup}>
        <input readOnly type="checkbox" checked={isSelected} />
        {label}
      </Span>
    );
  }
}

const getOptionStyles = defaultStyles => ({
  ...defaultStyles,
  paddingLeft: '2em',
});

const Option = props => {
  const { children, getStyles, isSelected, innerProps } = props;

  const defaultStyles = getStyles('option', props);
  const styles = getOptionStyles(defaultStyles);
  return (
    <Span {...innerProps} css={styles}>
      <input type="checkbox" checked={isSelected} readOnly />
      {children}
    </Span>
  );
};

export default class App extends Component<*, *> {
  render() {
    return (
      <div>
        <H1>Categorized Select</H1>
        <p>
          Select individual options or toggle the entire categories by clicking
          the parent.{' '}
          <Link
            href="https://github.com/JedWatson/react-select/blob/v2/examples/pages/Categorized.js"
            target="_blank"
          >
            Source
          </Link>
        </p>

        <h2>Categorized Select</h2>
        <div>
          <SelectWithValue
            {...this.props}
            closeMenuOnSelect={false}
            components={{ Group, GroupHeading, Option }}
            hideSelectedOptions={false}
            isMulti
            options={groupedOptions}
          />
        </div>
      </div>
    );
  }
}
