// @flow
// @jsx glam

import React, { Component, Fragment } from 'react';
import glam from 'glam';

import md from '../../markdown/renderer';

const Code = ({ children }) => (
  <code>
    {children}
  </code>
);

const propChangeData = [
  ['aria-describedby', 'unchanged'],
  ['aria-label', 'unchanged'],
  ['aria-labelledby', 'unchanged'],
  ['arrowRenderer', 'components'],
  ['autoBlur', 'renamed', 'blurInputOnSelect'],
  ['autoFocus', 'unchanged'],
  ['autoLoad', 'removed', 'see the Async component'],
  ['autosize', 'components'],
  ['backspaceRemoves', 'renamed', 'backspaceRemovesValue'],
  ['backspaceToRemoveMessage', 'removed', 'may be implemented in a later version'],
  ['className', 'unchanged'],
  ['clearable', 'renamed', 'isClearable'],
  ['clearAllText', 'removed'],
  ['clearRenderer', 'components'],
  ['clearValueText', 'removed'],
  ['closeOnSelect', 'renamed', 'closeMenuOnSelect'],
  ['deleteRemoves', 'removed'],
  ['delimiter', 'unchanged'],
  ['disabled', 'renamed', 'isDisabled'],
  ['escapeClearsValue', 'unchanged'],
  ['filterOptions', 'removed', md`use \`filterOption\` instead`],
  ['id', 'unchanged'],
  ['ignoreAccents', 'removed', md`see \`createFilter()\``],
  ['ignoreCase', 'removed', md`see \`createFilter()\``],
  ['inputProps', 'components'],
  ['inputRenderer', 'components'],
  ['instanceId', 'unchanged'],
  ['isLoading', 'unchanged'],
  ['joinValues', 'removed', md`now inferred from \`delimiter\``],
  ['labelKey', 'removed'],
  ['matchPos', 'removed', md`see \`createFilter()\``],
  ['matchProp', 'removed', md`see \`createFilter()\``],
  ['menuBuffer', 'components'],
  ['menuBuffer', 'removed'],
  ['menuContainerStyle', 'styles'],
  ['menuRenderer', 'components'],
  ['menuStyle', 'styles'],
  ['multi', 'renamed', 'isMulti'],
  ['name', 'unchanged'],
  ['noResultsText', 'renamed', 'noOptionsMessage'],
  ['onBlur', 'unchanged'],
  ['onBlurResetsInput', 'removed'],
  ['onClose', 'renamed', 'onMenuClose'],
  ['onCloseResetsInput', 'removed'],
  ['onFocus', 'unchanged'],
  ['onInputChange', 'unchanged'],
  ['onInputKeyDown', 'renamed', 'onKeyDown'],
  ['onMenuScrollToBottom', 'unchanged'],
  ['onOpen', 'renamed', 'onMenuOpen'],
  ['onSelectResetsInput', 'removed'],
  ['onValueClick', 'removed'],
  ['openOnClick', 'renamed', 'openMenuOnFocus'],
  ['openOnFocus', 'renamed', 'openMenuOnClick'],
  ['optionClassName', 'components'],
  ['optionComponent', 'components'],
  ['optionRenderer', 'components'],
  ['options', 'unchanged'],
  ['pageSize', 'unchanged'],
  ['placeholder', 'changed', 'now only accepts a string'],
  ['removeSelected', 'renamed', 'hideSelectedOptions'],
  ['required', 'removed', 'may be implemented in a later version'],
  ['resetValue', 'removed', md`control the \`value\` prop`],
  ['rtl', 'renamed', 'isRtl'],
  ['scrollMenuIntoView', 'renamed', 'menuShouldScrollIntoView'],
  ['searchable', 'renamed', 'isSearchable'],
  ['searchPromptText', 'removed'],
  ['simpleValue', 'removed'],
  ['style', 'styles'],
  ['tabIndex', 'unchanged'],
  ['tabSelectsValue', 'unchanged'],
  ['trimFilter', 'removed', md`see \`createFilter()\``],
  ['value', 'unchanged'],
  ['valueComponent', 'components'],
  ['valueKey', 'removed'],
  ['valueKey', 'removed'],
  ['valueRenderer', 'components'],
  ['wrapperStyle', 'styles'],
];

const Table = ({ children }) => (
  <table css={{
    width: '100%',
    borderCollapse: 'collapse',
  }}>
    {children}
  </table>
);

const Header = ({ children }) => (
  <td css={{
    fontWeight: 'bold',
    padding: '4px 8px 4px 0',
    borderBottom: '3px solid #eee',
  }}>{children}</td>
);

const Cell = ({ children }) => (
  <td css={{
    fontSize: '90%',
    padding: '4px 8px 4px 0',
    borderBottom: '1px solid #eee',
    verticalAlign: 'top',
  }}>{children}</td>
);

class PropStatus extends Component<*> {
  renderStatus() {
    const { status, note } = this.props;
    switch (status) {
      case 'components':
        return (
          <Fragment>
            <Cell>removed</Cell>
            <Cell>use the new Components API</Cell>
          </Fragment>
        );
      case 'styles':
        return (
          <Fragment>
            <Cell>removed</Cell>
            <Cell>use the new Styles API</Cell>
          </Fragment>
        );
      case 'renamed':
        return (
          <Fragment>
            <Cell>renamed</Cell>
            <Cell>
              use <Code>{note}</Code>
            </Cell>
          </Fragment>
        );
      default:
        return (
          <Fragment>
            <Cell>{status}</Cell>
            <Cell>{note}</Cell>
          </Fragment>
        );
    }
  }
  render() {
    const { prop } = this.props;
    return (
      <tr>
        <Cell>
          <Code>{prop}</Code>
        </Cell>
        {this.renderStatus()}
      </tr>
    );
  }
}

const PropChanges = () => (
  <Table>
    <thead>
      <tr>
        <Header>Prop</Header>
        <Header>Status</Header>
        <Header>Notes</Header>
      </tr>
    </thead>
    <tbody>
      {propChangeData.map(data => {
        const [prop, status, note] = data;
        return <PropStatus key={prop} prop={prop} status={status} note={note} />;
      })}
    </tbody>
  </Table>
);

export default PropChanges;
