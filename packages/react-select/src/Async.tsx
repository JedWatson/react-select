import React, { MutableRefObject, ReactElement, RefAttributes } from 'react';
import Select from './Select';
import { OptionBase, GroupBase, OptionsOrGroups } from './types';
import useStateManager from './useStateManager';
import useAsync from './useAsync';
import type { AsyncProps } from './useAsync';
export type { AsyncProps };

// export interface AsyncProps<
//   Option extends OptionBase,
//   IsMulti extends boolean,
//   Group extends GroupBase<Option>
// > extends BaseComponentProps<Option, IsMulti, Group> {
//   /**
//    * The default set of options to show before the user starts searching. When
//    * set to `true`, the results for loadOptions('') will be autoloaded.
//    */
//   defaultOptions: OptionsOrGroups<Option, Group> | boolean;
//   /**
//    * If cacheOptions is truthy, then the loaded data will be cached. The cache
//    * will remain until `cacheOptions` changes value.
//    */
//   cacheOptions: any;
//   /**
//    * Function that returns a promise, which is the set of options to be used
//    * once the promise resolves.
//    */
//   loadOptions?:
//     | ((
//         inputValue: string,
//         callback: (options: OptionsOrGroups<Option, Group>) => void
//       ) => void)
//     | ((inputValue: string) => Promise<OptionsOrGroups<Option, Group>>);
//   /**
//    * Will cause the select to be displayed in the loading state, even if the
//    * Async select is not currently waiting for loadOptions to resolve
//    */
//   isLoading: boolean;
// }

export const defaultProps = {
  cacheOptions: false,
  defaultOptions: false,
  filterOption: null,
  isLoading: false,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface State<Option extends OptionBase, Group extends GroupBase<Option>> {
  defaultOptions?: OptionsOrGroups<Option, Group>;
  inputValue: string;
  isLoading: boolean;
  loadedInputValue?: string;
  loadedOptions: OptionsOrGroups<Option, Group>;
  passEmptyOptions: boolean;
  optionsCache: { [inputValue: string]: OptionsOrGroups<Option, Group> };
  prevDefaultOptions: OptionsOrGroups<Option, Group> | boolean | void;
  prevCacheOptions: any | void;
}

// export const makeAsyncSelect = (SelectComponent: typeof BaseComponent) =>
//   class Async<
//     Option extends OptionBase,
//     IsMulti extends boolean,
//     Group extends GroupBase<Option>
//   > extends Component<
//     AsyncProps<Option, IsMulti, Group>,
//     State<Option, Group>
//   > {
//     static defaultProps = defaultProps;
//     select?: BaseComponent<Option, IsMulti, Group> | null;
//     lastRequest?: {};
//     mounted: boolean = false;
//     state: State<Option, Group> = {
//       defaultOptions: Array.isArray(this.props.defaultOptions)
//         ? this.props.defaultOptions
//         : undefined,
//       inputValue:
//         typeof this.props.inputValue !== 'undefined'
//           ? this.props.inputValue
//           : '',
//       isLoading: this.props.defaultOptions === true,
//       loadedOptions: [],
//       passEmptyOptions: false,
//       optionsCache: {},
//       prevDefaultOptions: undefined,
//       prevCacheOptions: undefined,
//     };
//     static getDerivedStateFromProps(
//       props: AsyncProps<OptionBase, boolean, GroupBase<OptionBase>>,
//       state: State<OptionBase, GroupBase<OptionBase>>
//     ) {
//       const newCacheOptionsState =
//         props.cacheOptions !== state.prevCacheOptions
//           ? {
//               prevCacheOptions: props.cacheOptions,
//               optionsCache: {},
//             }
//           : {};
//       const newDefaultOptionsState =
//         props.defaultOptions !== state.prevDefaultOptions
//           ? {
//               prevDefaultOptions: props.defaultOptions,
//               defaultOptions: Array.isArray(props.defaultOptions)
//                 ? props.defaultOptions
//                 : undefined,
//             }
//           : {};
//       return {
//         ...newCacheOptionsState,
//         ...newDefaultOptionsState,
//       };
//     }
//     componentDidMount() {
//       this.mounted = true;
//       const { defaultOptions } = this.props;
//       const { inputValue } = this.state;
//       if (defaultOptions === true) {
//         this.loadOptions(inputValue, options => {
//           if (!this.mounted) return;
//           const isLoading = !!this.lastRequest;
//           this.setState({ defaultOptions: options || [], isLoading });
//         });
//       }
//     }
//     componentWillUnmount() {
//       this.mounted = false;
//     }
//     focus() {
//       this.select!.focus();
//     }
//     blur() {
//       this.select!.blur();
//     }
//     loadOptions(
//       inputValue: string,
//       callback: (options?: OptionsOrGroups<Option, Group>) => void
//     ) {
//       const { loadOptions } = this.props;
//       if (!loadOptions) return callback();
//       const loader = loadOptions(inputValue, callback);
//       if (loader && typeof loader.then === 'function') {
//         loader.then(callback, () => callback());
//       }
//     }
//     handleInputChange = (newValue: string, actionMeta: InputActionMeta) => {
//       const { cacheOptions, onInputChange } = this.props;
//       // TODO
//       const inputValue = handleInputChange(newValue, actionMeta, onInputChange);
//       if (!inputValue) {
//         delete this.lastRequest;
//         this.setState({
//           inputValue: '',
//           loadedInputValue: '',
//           loadedOptions: [],
//           isLoading: false,
//           passEmptyOptions: false,
//         });
//         return;
//       }
//       if (cacheOptions && this.state.optionsCache[inputValue]) {
//         this.setState({
//           inputValue,
//           loadedInputValue: inputValue,
//           loadedOptions: this.state.optionsCache[inputValue],
//           isLoading: false,
//           passEmptyOptions: false,
//         });
//       } else {
//         const request = (this.lastRequest = {});
//         this.setState(
//           {
//             inputValue,
//             isLoading: true,
//             passEmptyOptions: !this.state.loadedInputValue,
//           },
//           () => {
//             this.loadOptions(inputValue, options => {
//               if (!this.mounted) return;
//               if (request !== this.lastRequest) return;
//               delete this.lastRequest;
//               this.setState(state => ({
//                 isLoading: false,
//                 loadedInputValue: inputValue,
//                 loadedOptions: options || [],
//                 passEmptyOptions: false,
//                 optionsCache: options
//                   ? { ...state.optionsCache, [inputValue]: options }
//                   : state.optionsCache,
//               }));
//             });
//           }
//         );
//       }
//       return inputValue;
//     };
//     render() {
//       const { loadOptions, isLoading: isLoadingProp, ...props } = this.props;
//       const {
//         defaultOptions,
//         inputValue,
//         isLoading,
//         loadedInputValue,
//         loadedOptions,
//         passEmptyOptions,
//       } = this.state;
//       const options = passEmptyOptions
//         ? []
//         : inputValue && loadedInputValue
//         ? loadedOptions
//         : defaultOptions || [];
//       return (
//         <SelectComponent
//           {...props}
//           ref={ref => {
//             this.select = ref;
//           }}
//           options={options}
//           isLoading={isLoading || isLoadingProp}
//           onInputChange={this.handleInputChange}
//         />
//       );
//     }
//   };

// const SelectState = manageState(Select);
//
// export default makeAsyncSelect(SelectState);

type AsyncSelect = <
  Option extends OptionBase = OptionBase,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: AsyncProps<Option, IsMulti, Group> &
    RefAttributes<Select<Option, IsMulti, Group>>
) => ReactElement;

const AsyncSelect = React.forwardRef(
  <
    Option extends OptionBase,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
  >(
    props: AsyncProps<Option, IsMulti, Group>,
    ref:
      | ((instance: Select<Option, IsMulti, Group> | null) => void)
      | MutableRefObject<Select<Option, IsMulti, Group> | null>
      | null
  ) => {
    const stateManagedProps = useAsync(props);
    const selectProps = useStateManager(stateManagedProps);

    return <Select ref={ref} {...selectProps} />;
  }
) as AsyncSelect;

export default AsyncSelect;
