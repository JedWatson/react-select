/** @jsx jsx */
import React, {
  Component,
  Fragment,
  FunctionComponent,
  ReactElement,
} from 'react';
import { jsx } from '@emotion/react';

import Select, { components, OptionProps } from 'react-select';
import md from '../../markdown/renderer';

const Code: FunctionComponent = ({ children }) => <code>{children}</code>;

const propChangeData: (
  | [string, string]
  | [string, string, string | ReactElement]
)[] = [
  ['aria-describedby', 'unchanged'],
  ['aria-label', 'unchanged'],
  ['aria-labelledby', 'unchanged'],
  ['arrowRenderer', 'components'],
  ['autoBlur', 'renamed', 'blurInputOnSelect'],
  ['autoFocus', 'unchanged'],
  ['autoLoad', 'removed', 'see the Async component (defaultOptions)'],
  ['autosize', 'components'],
  ['backspaceRemoves', 'renamed', 'backspaceRemovesValue'],
  [
    'backspaceToRemoveMessage',
    'removed',
    'may be implemented in a later version',
  ],
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
  [
    'filterOptions',
    'removed',
    md`
use \`filterOption\` instead
    `,
  ],
  ['id', 'unchanged'],
  [
    'ignoreAccents',
    'removed',
    md`
see \`createFilter()\`
    `,
  ],
  [
    'ignoreCase',
    'removed',
    md`
see \`createFilter()\`
    `,
  ],
  ['inputProps', 'components'],
  ['inputRenderer', 'components'],
  ['instanceId', 'unchanged'],
  ['isLoading', 'unchanged'],
  [
    'joinValues',
    'removed',
    md`
now inferred from \`delimiter\`
    `,
  ],
  ['labelKey', 'removed'],
  ['loadOptions', 'unchanged'],
  [
    'matchPos',
    'removed',
    md`
see \`createFilter()\`
    `,
  ],
  [
    'matchProp',
    'removed',
    md`
see \`createFilter()\`
    `,
  ],
  ['menuBuffer', 'styles'],
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
  ['openOnClick', 'renamed', 'openMenuOnClick'],
  ['openOnFocus', 'renamed', 'openMenuOnFocus'],
  ['optionClassName', 'components'],
  ['optionComponent', 'components'],
  ['optionRenderer', 'components'],
  ['options', 'unchanged'],
  ['pageSize', 'unchanged'],
  ['placeholder', 'changed', 'now only accepts a string'],
  ['removeSelected', 'renamed', 'hideSelectedOptions'],
  ['required', 'removed', 'may be implemented in a later version'],
  [
    'resetValue',
    'removed',
    md`
control the \`value\` prop
    `,
  ],
  ['rtl', 'renamed', 'isRtl'],
  ['scrollMenuIntoView', 'renamed', 'menuShouldScrollIntoView'],
  ['searchable', 'renamed', 'isSearchable'],
  ['searchPromptText', 'removed'],
  ['simpleValue', 'removed'],
  ['style', 'styles'],
  ['tabIndex', 'unchanged'],
  ['tabSelectsValue', 'unchanged'],
  [
    'trimFilter',
    'removed',
    md`
see \`createFilter()\`
    `,
  ],
  ['value', 'unchanged'],
  ['valueComponent', 'components'],
  ['valueKey', 'removed'],
  ['valueRenderer', 'components'],
  ['wrapperStyle', 'styles'],
];

const Table: FunctionComponent = ({ children }) => (
  <table
    css={{
      width: '100%',
      marginTop: '30px',
      borderCollapse: 'collapse',
    }}
  >
    {children}
  </table>
);

const Header: FunctionComponent = ({ children }) => (
  <td
    css={{
      fontWeight: 'bold',
      padding: '4px 8px 4px 0',
      borderBottom: '3px solid #eee',
    }}
  >
    {children}
  </td>
);

const Cell: FunctionComponent = ({ children }) => (
  <td
    css={{
      fontSize: '90%',
      padding: '4px 8px 4px 0',
      borderBottom: '1px solid #eee',
      verticalAlign: 'top',
    }}
  >
    {children}
  </td>
);

interface Props {
  prop: string;
  status: string;
  note: string | ReactElement | undefined;
}

class PropStatus extends Component<Props> {
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

interface InputOptionState {
  readonly isActive: boolean;
}

class InputOption extends Component<OptionProps, InputOptionState> {
  state: InputOptionState = { isActive: false };
  onMouseDown = () => this.setState({ isActive: true });
  onMouseUp = () => this.setState({ isActive: false });
  onMouseLeave = () => this.setState({ isActive: false });

  render() {
    const {
      getStyles,
      isDisabled,
      isFocused,
      isSelected,
      children,
      innerProps,
      ...rest
    } = this.props;
    const { isActive } = this.state;

    // styles
    let bg = 'transparent';
    if (isFocused) bg = '#eee';
    if (isActive) bg = '#B2D4FF';

    const style = {
      alignItems: 'center',
      backgroundColor: bg,
      color: 'inherit',
      display: 'flex ',
    };

    // prop assignment
    const props = {
      ...innerProps,
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
      onMouseLeave: this.onMouseLeave,
      style,
    };

    return (
      <components.Option
        {...rest}
        isDisabled={isDisabled}
        isFocused={isFocused}
        isSelected={isSelected}
        getStyles={getStyles}
        innerProps={props}
      >
        <input type="checkbox" checked={isSelected} />
        {children}
      </components.Option>
    );
  }
}

const allOptions = [
  { value: 'removed', label: 'removed' },
  { value: 'unchanged', label: 'unchanged' },
  { value: 'renamed', label: 'renamed' },
];

const filterOptions = [
  { value: 'propName', label: 'propName' },
  { value: 'status', label: 'status' },
];

const getDisplayedStatus = (status: string) => {
  if (status === 'components' || status === 'styles') return 'removed';
  else return status;
};

interface PropChangesProps {}

interface PropChangesState {
  readonly selectedOptions: readonly string[];
  readonly filterValue: string;
}

class PropChanges extends Component<PropChangesProps, PropChangesState> {
  state: PropChangesState = {
    selectedOptions: allOptions.map((opt) => opt.value),
    filterValue: filterOptions[0].value,
  };

  render() {
    let { selectedOptions, filterValue } = this.state;

    return (
      <Fragment>
        {/* filter */}
        <h4>Filter Props</h4>
        <Select
          defaultValue={allOptions}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          onChange={(options) => {
            if (Array.isArray(options)) {
              this.setState({
                selectedOptions: options.map((opt) => opt.value),
              });
            }
          }}
          options={allOptions}
          components={{
            Option: InputOption,
          }}
        />
        {/* sort */}
        <h4>Sort Props</h4>
        <Select
          defaultValue={filterOptions[0]}
          onChange={(option) => {
            if (!Array.isArray(option)) {
              this.setState({ filterValue: option ? option.value : '' });
            }
          }}
          options={filterOptions}
        />
        <Table>
          <thead>
            <tr>
              <Header>Prop</Header>
              <Header>Status</Header>
              <Header>Notes</Header>
            </tr>
          </thead>
          <tbody>
            {propChangeData
              .sort((a, b) => {
                if (filterValue === 'propName') {
                  return a[0].localeCompare(b[0]);
                } else {
                  return getDisplayedStatus(a[1]).localeCompare(
                    getDisplayedStatus(b[1])
                  );
                }
              })
              .map((data) => {
                const [prop, status, note] = data;
                return selectedOptions.includes(getDisplayedStatus(status)) ? (
                  <PropStatus
                    key={prop}
                    prop={prop}
                    status={status}
                    note={note}
                  />
                ) : null;
              })}
          </tbody>
        </Table>
      </Fragment>
    );
  }
}

export default PropChanges;
