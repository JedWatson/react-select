import { ReactNode, useCallback, useMemo } from 'react';
import { PublicBaseSelectProps } from './Select';
import {
  ActionMeta,
  GetOptionLabel,
  GetOptionValue,
  GroupBase,
  OnChangeValue,
  Options,
  OptionsOrGroups,
} from './types';
import { cleanValue, valueTernary } from './utils';
import {
  getOptionValue as baseGetOptionValue,
  getOptionLabel as baseGetOptionLabel,
} from './builtins';

export interface Accessors<Option> {
  getOptionValue: GetOptionValue<Option>;
  getOptionLabel: GetOptionLabel<Option>;
}

export interface CreatableAdditionalProps<
  Option,
  Group extends GroupBase<Option>
> {
  /**
   * Allow options to be created while the `isLoading` prop is true. Useful to
   * prevent the "create new ..." option being displayed while async results are
   * still being loaded.
   */
  allowCreateWhileLoading?: boolean;
  /** Sets the position of the createOption element in your options list. Defaults to 'last' */
  createOptionPosition?: 'first' | 'last';
  /**
   * Gets the label for the "create new ..." option in the menu. Is given the
   * current input value.
   */
  formatCreateLabel?: (inputValue: string) => ReactNode;
  /**
   * Determines whether the "create new ..." option should be displayed based on
   * the current input value, select value and options array.
   */
  isValidNewOption?: (
    inputValue: string,
    value: Options<Option>,
    options: OptionsOrGroups<Option, Group>,
    accessors: Accessors<Option>
  ) => boolean;
  /**
   * Returns the data for the new option when it is created. Used to display the
   * value, and is passed to `onChange`.
   */
  getNewOptionData?: (inputValue: string, optionLabel: ReactNode) => Option;
  /**
   * If provided, this will be called with the input value when a new option is
   * created, and `onChange` will **not** be called. Use this when you need more
   * control over what happens when new options are created.
   */
  onCreateOption?: (inputValue: string) => void;
}

type BaseCreatableProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> = PublicBaseSelectProps<Option, IsMulti, Group> &
  CreatableAdditionalProps<Option, Group>;

const compareOption = <Option>(
  inputValue = '',
  option: Option,
  accessors: Accessors<Option>
) => {
  const candidate = String(inputValue).toLowerCase();
  const optionValue = String(accessors.getOptionValue(option)).toLowerCase();
  const optionLabel = String(accessors.getOptionLabel(option)).toLowerCase();
  return optionValue === candidate || optionLabel === candidate;
};

const builtins = {
  formatCreateLabel: (inputValue: string) => `Create "${inputValue}"`,
  isValidNewOption: <Option, Group extends GroupBase<Option>>(
    inputValue: string,
    selectValue: Options<Option>,
    selectOptions: OptionsOrGroups<Option, Group>,
    accessors: Accessors<Option>
  ) =>
    !(
      !inputValue ||
      selectValue.some((option) =>
        compareOption(inputValue, option, accessors)
      ) ||
      selectOptions.some((option) =>
        compareOption(inputValue, option as Option, accessors)
      )
    ),
  getNewOptionData: (inputValue: string, optionLabel: ReactNode) => ({
    label: optionLabel,
    value: inputValue,
    __isNew__: true,
  }),
};

export default function useCreatable<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>({
  allowCreateWhileLoading = false,
  createOptionPosition = 'last',
  formatCreateLabel = builtins.formatCreateLabel,
  isValidNewOption = builtins.isValidNewOption,
  // @ts-ignore
  getNewOptionData = builtins.getNewOptionData,
  onCreateOption,
  options: propsOptions = [],
  onChange: propsOnChange,
  ...restSelectProps
}: BaseCreatableProps<Option, IsMulti, Group>): PublicBaseSelectProps<
  Option,
  IsMulti,
  Group
> {
  const {
    getOptionValue = baseGetOptionValue,
    getOptionLabel = baseGetOptionLabel,
    inputValue,
    isLoading,
    isMulti,
    value,
    name,
  } = restSelectProps;

  const newOption = useMemo(
    () =>
      isValidNewOption(inputValue, cleanValue(value), propsOptions, {
        getOptionValue,
        getOptionLabel,
      })
        ? getNewOptionData(inputValue, formatCreateLabel(inputValue))
        : undefined,
    [
      formatCreateLabel,
      getNewOptionData,
      getOptionLabel,
      getOptionValue,
      inputValue,
      isValidNewOption,
      propsOptions,
      value,
    ]
  );

  const options = useMemo(
    () =>
      (allowCreateWhileLoading || !isLoading) && newOption
        ? createOptionPosition === 'first'
          ? [newOption, ...propsOptions]
          : [...propsOptions, newOption]
        : propsOptions,
    [
      allowCreateWhileLoading,
      createOptionPosition,
      isLoading,
      newOption,
      propsOptions,
    ]
  );

  const onChange = useCallback(
    (
      newValue: OnChangeValue<Option, IsMulti>,
      actionMeta: ActionMeta<Option>
    ) => {
      if (actionMeta.action !== 'select-option') {
        return propsOnChange(newValue, actionMeta);
      }
      const valueArray = Array.isArray(newValue) ? newValue : [newValue];

      if (valueArray[valueArray.length - 1] === newOption) {
        if (onCreateOption) onCreateOption(inputValue);
        else {
          const newOptionData = getNewOptionData(inputValue, inputValue);
          const newActionMeta: ActionMeta<Option> = {
            action: 'create-option',
            name,
            option: newOptionData,
          };
          propsOnChange(
            valueTernary(
              isMulti,
              [...cleanValue(value), newOptionData],
              newOptionData
            ),
            newActionMeta
          );
        }
        return;
      }
      propsOnChange(newValue, actionMeta);
    },
    [
      getNewOptionData,
      inputValue,
      isMulti,
      name,
      newOption,
      onCreateOption,
      propsOnChange,
      value,
    ]
  );

  return {
    ...restSelectProps,
    options,
    onChange,
  };
}
