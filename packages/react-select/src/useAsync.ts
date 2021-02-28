import { GroupBase, OptionBase, OptionsOrGroups } from './types';
import { StateManagedProps } from './useStateManager';

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
> = StateManagedProps<Option, IsMulti, Group> &
  AsyncAdditionalProps<Option, Group>;

export default function useAsync<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
  AdditionalProps
>(
  props: AsyncProps<Option, IsMulti, Group> & AdditionalProps
): StateManagedProps<Option, IsMulti, Group> & AdditionalProps {
  return {
    ...props,
  };
}
