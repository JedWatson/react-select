import { useCallback, useEffect, useRef, useState } from 'react';
import { handleInputChange } from './utils';
import { StateManagerProps } from './useStateManager';
import { GroupBase, InputActionMeta, OptionsOrGroups } from './types';

type AsyncManagedPropKeys =
  | 'options'
  | 'isLoading'
  | 'onInputChange'
  | 'filterOption';

export interface AsyncAdditionalProps<Option, Group extends GroupBase<Option>> {
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
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> = StateManagerProps<Option, IsMulti, Group> &
  AsyncAdditionalProps<Option, Group>;

export default function useAsync<
  Option,
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
  filterOption = null,
  ...restSelectProps
}: AsyncProps<Option, IsMulti, Group> & AdditionalProps): StateManagerProps<
  Option,
  IsMulti,
  Group
> &
  Omit<
    AdditionalProps,
    keyof AsyncAdditionalProps<Option, Group> | AsyncManagedPropKeys
  > {
  const { inputValue: propsInputValue } = restSelectProps;

  const lastRequest = useRef<unknown>(undefined);
  const mounted = useRef(false);

  const [defaultOptions, setDefaultOptions] = useState<
    OptionsOrGroups<Option, Group> | boolean | undefined
  >(Array.isArray(propsDefaultOptions) ? propsDefaultOptions : undefined);
  const [stateInputValue, setStateInputValue] = useState<string>(
    typeof propsInputValue !== 'undefined' ? (propsInputValue as string) : ''
  );
  const [isLoading, setIsLoading] = useState(propsDefaultOptions === true);
  const [loadedInputValue, setLoadedInputValue] =
    useState<string | undefined>(undefined);
  const [loadedOptions, setLoadedOptions] = useState<
    OptionsOrGroups<Option, Group>
  >([]);
  const [passEmptyOptions, setPassEmptyOptions] = useState(false);
  const [optionsCache, setOptionsCache] = useState<
    Record<string, OptionsOrGroups<Option, Group>>
  >({});
  const [prevDefaultOptions, setPrevDefaultOptions] =
    useState<OptionsOrGroups<Option, Group> | boolean | undefined>(undefined);
  const [prevCacheOptions, setPrevCacheOptions] = useState(undefined);

  if (cacheOptions !== prevCacheOptions) {
    setOptionsCache({});
    setPrevCacheOptions(cacheOptions);
  }

  if (propsDefaultOptions !== prevDefaultOptions) {
    setDefaultOptions(
      Array.isArray(propsDefaultOptions) ? propsDefaultOptions : undefined
    );
    setPrevDefaultOptions(propsDefaultOptions);
  }

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const loadOptions = useCallback(
    (
      inputValue: string,
      callback: (options?: OptionsOrGroups<Option, Group>) => void
    ) => {
      if (!propsLoadOptions) return callback();
      const loader = propsLoadOptions(inputValue, callback);
      if (loader && typeof loader.then === 'function') {
        loader.then(callback, () => callback());
      }
    },
    [propsLoadOptions]
  );

  useEffect(() => {
    if (propsDefaultOptions === true) {
      loadOptions(stateInputValue, (options) => {
        if (!mounted.current) return;
        setDefaultOptions(options || []);
        setIsLoading(!!lastRequest.current);
      });
    }
    // NOTE: this effect is designed to only run when the component mounts,
    // so we don't want to include any hook dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onInputChange = useCallback(
    (newValue: string, actionMeta: InputActionMeta) => {
      const inputValue = handleInputChange(
        newValue,
        actionMeta,
        propsOnInputChange
      );
      if (!inputValue) {
        lastRequest.current = undefined;
        setStateInputValue('');
        setLoadedInputValue('');
        setLoadedOptions([]);
        setIsLoading(false);
        setPassEmptyOptions(false);
        return;
      }
      if (cacheOptions && optionsCache[inputValue]) {
        setStateInputValue(inputValue);
        setLoadedInputValue(inputValue);
        setLoadedOptions(optionsCache[inputValue]);
        setIsLoading(false);
        setPassEmptyOptions(false);
      } else {
        const request = (lastRequest.current = {});
        setStateInputValue(inputValue);
        setIsLoading(true);
        setPassEmptyOptions(!loadedInputValue);
        loadOptions(inputValue, (options) => {
          if (!mounted) return;
          if (request !== lastRequest.current) return;
          lastRequest.current = undefined;
          setIsLoading(false);
          setLoadedInputValue(inputValue);
          setLoadedOptions(options || []);
          setPassEmptyOptions(false);
          setOptionsCache(
            options ? { ...optionsCache, [inputValue]: options } : optionsCache
          );
        });
      }
    },
    [
      cacheOptions,
      loadOptions,
      loadedInputValue,
      optionsCache,
      propsOnInputChange,
    ]
  );

  const options = passEmptyOptions
    ? []
    : stateInputValue && loadedInputValue
    ? loadedOptions
    : ((defaultOptions || []) as OptionsOrGroups<Option, Group>);

  return {
    ...restSelectProps,
    options,
    isLoading: isLoading || propsIsLoading,
    onInputChange,
    filterOption,
  };
}
