import { useCallback, useState } from 'react';
import { handleInputChange } from './utils';
import { StateManagerProps } from './useStateManager';
import {
  GroupBase,
  InputActionMeta,
  OptionBase,
  OptionsOrGroups,
} from './types';

export interface AsyncAdditionalProps<
  Option extends OptionBase,
  Group extends GroupBase<Option>
> {
  /**
   * The default set of options to show before the user starts searching. When
   * set to `true`, the results for loadOptions('') will be autoloaded.
   */
  defaultOptions?: OptionsOrGroups<Option, Group> | boolean;
  /**
   * If cacheOptions is truthy, then the loaded data will be cached. The cache
   * will remain until `cacheOptions` changes value.
   */
  cacheOptions?: any;
  /**
   * Function that returns a promise, which is the set of options to be used
   * once the promise resolves.
   */
  loadOptions?:
    | ((
        inputValue: string,
        callback: (options: OptionsOrGroups<Option, Group>) => void
      ) => void)
    | ((inputValue: string) => Promise<OptionsOrGroups<Option, Group>>);
  /**
   * Will cause the select to be displayed in the loading state, even if the
   * Async select is not currently waiting for loadOptions to resolve
   */
  isLoading?: boolean;
}

export type AsyncProps<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> = StateManagerProps<Option, IsMulti, Group> &
  AsyncAdditionalProps<Option, Group>;

export default function useAsync<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
  AdditionalProps
>({
  defaultOptions: propsDefaultOptions = false,
  cacheOptions = false,
  loadOptions: propsLoadOptions,
  options: propsOptions,
  isLoading: propsIsLoading = false,
  onInputChange: propsOnInputChange,
  ...restSelectProps
}: AsyncProps<Option, IsMulti, Group> & AdditionalProps): StateManagerProps<
  Option,
  IsMulti,
  Group
> &
  Omit<AdditionalProps, keyof AsyncAdditionalProps<Option, Group>> {
  const { propsInputValue } = restSelectProps;

  const [defaultOptions, setDefaultOptions] = useState(
    Array.isArray(propsDefaultOptions) ? propsDefaultOptions : undefined
  );
  const [stateInputValue, setStateInputValue] = useState(
    typeof propsInputValue !== 'undefined' ? propsInputValue : ''
  );
  const [isLoading, setIsLoading] = useState(propsDefaultOptions === true);
  const [loadedInputValue, setLoadedInputValue] = useState(undefined);
  const [loadedOptions, setLoadedOptions] = useState([]);
  const [passEmptyOptions, setPassEmptyOptions] = useState(false);
  const [optionsCache, setOptionsCache] = useState({});
  const [prevDefaultOptions, setPrevDefaultOptions] = useState(undefined);
  const [prevCacheOptions, setPrevCacheOptions] = useState(undefined);

  const loadOptions = (
    inputValue: string,
    callback: (options?: OptionsOrGroups<Option, Group>) => void
  ) => {
    if (!propsLoadOptions) return callback();
    const loader = propsLoadOptions(inputValue, callback);
    if (loader && typeof loader.then === 'function') {
      loader.then(callback, () => callback());
    }
  };

  const onInputChange = useCallback(
    (newValue: string, actionMeta: InputActionMeta) => {
      const inputValue = handleInputChange(
        newValue,
        actionMeta,
        propsOnInputChange
      );
      if (!inputValue) {
      }
    },
    []
  );

  const options = passEmptyOptions
    ? []
    : stateInputValue && loadedInputValue
    ? loadedOptions
    : defaultOptions || [];

  return {
    ...restSelectProps,
    options,
    isLoading: isLoading || propsIsLoading,
    onInputChange,
  };
}
