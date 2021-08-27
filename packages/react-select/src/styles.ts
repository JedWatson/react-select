import {
  containerCSS,
  ContainerProps,
  indicatorsContainerCSS,
  IndicatorsContainerProps,
  valueContainerCSS,
  ValueContainerProps,
} from './components/containers';
import { ControlProps, css as controlCSS } from './components/Control';
import {
  groupCSS,
  groupHeadingCSS,
  GroupHeadingProps,
  GroupProps,
} from './components/Group';
import {
  clearIndicatorCSS,
  dropdownIndicatorCSS,
  loadingIndicatorCSS,
  indicatorSeparatorCSS,
  ClearIndicatorProps,
  DropdownIndicatorProps,
  IndicatorSeparatorProps,
  LoadingIndicatorProps,
} from './components/indicators';
import { inputCSS, InputProps } from './components/Input';
import { placeholderCSS, PlaceholderProps } from './components/Placeholder';
import { optionCSS, OptionProps } from './components/Option';
import {
  menuCSS,
  menuListCSS,
  menuPortalCSS,
  noOptionsMessageCSS,
  loadingMessageCSS,
  NoticeProps,
  MenuProps,
  MenuListProps,
  PortalStyleArgs,
} from './components/Menu';
import {
  css as singleValueCSS,
  SingleValueProps,
} from './components/SingleValue';
import {
  multiValueCSS,
  multiValueLabelCSS,
  MultiValueProps,
  multiValueRemoveCSS,
} from './components/MultiValue';
import { CSSObjectWithLabel, GroupBase } from './types';

export interface StylesProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> {
  clearIndicator: ClearIndicatorProps<Option, IsMulti, Group>;
  container: ContainerProps<Option, IsMulti, Group>;
  control: ControlProps<Option, IsMulti, Group>;
  dropdownIndicator: DropdownIndicatorProps<Option, IsMulti, Group>;
  group: GroupProps<Option, IsMulti, Group>;
  groupHeading: GroupHeadingProps<Option, IsMulti, Group>;
  indicatorsContainer: IndicatorsContainerProps<Option, IsMulti, Group>;
  indicatorSeparator: IndicatorSeparatorProps<Option, IsMulti, Group>;
  input: InputProps<Option, IsMulti, Group>;
  loadingIndicator: LoadingIndicatorProps<Option, IsMulti, Group>;
  loadingMessage: NoticeProps<Option, IsMulti, Group>;
  menu: MenuProps<Option, IsMulti, Group>;
  menuList: MenuListProps<Option, IsMulti, Group>;
  menuPortal: PortalStyleArgs;
  multiValue: MultiValueProps<Option, IsMulti, Group>;
  multiValueLabel: MultiValueProps<Option, IsMulti, Group>;
  multiValueRemove: MultiValueProps<Option, IsMulti, Group>;
  noOptionsMessage: NoticeProps<Option, IsMulti, Group>;
  option: OptionProps<Option, IsMulti, Group>;
  placeholder: PlaceholderProps<Option, IsMulti, Group>;
  singleValue: SingleValueProps<Option, IsMulti, Group>;
  valueContainer: ValueContainerProps<Option, IsMulti, Group>;
}

type StylesFunction<Props> = (props: Props) => CSSObjectWithLabel;
export type StylesFunctions<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> = {
  [K in keyof StylesProps<Option, IsMulti, Group>]: StylesFunction<
    StylesProps<Option, IsMulti, Group>[K]
  >;
};

export type StylesConfigFunction<Props> = (
  base: CSSObjectWithLabel,
  props: Props
) => CSSObjectWithLabel & { override?: true };
export type StylesConfigParam<Props> =
  | StylesConfigFunction<Props>
  | (CSSObjectWithLabel & { override?: true });
export type StylesConfig<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> = {
  [K in keyof StylesProps<Option, IsMulti, Group>]?: StylesConfigParam<
    StylesProps<Option, IsMulti, Group>[K]
  >;
};

export const defaultStyles: StylesFunctions<
  unknown,
  boolean,
  GroupBase<unknown>
> = {
  clearIndicator: clearIndicatorCSS,
  container: containerCSS,
  control: controlCSS,
  dropdownIndicator: dropdownIndicatorCSS,
  group: groupCSS,
  groupHeading: groupHeadingCSS,
  indicatorsContainer: indicatorsContainerCSS,
  indicatorSeparator: indicatorSeparatorCSS,
  input: inputCSS,
  loadingIndicator: loadingIndicatorCSS,
  loadingMessage: loadingMessageCSS,
  menu: menuCSS,
  menuList: menuListCSS,
  menuPortal: menuPortalCSS,
  multiValue: multiValueCSS,
  multiValueLabel: multiValueLabelCSS,
  multiValueRemove: multiValueRemoveCSS,
  noOptionsMessage: noOptionsMessageCSS,
  option: optionCSS,
  placeholder: placeholderCSS,
  singleValue: singleValueCSS,
  valueContainer: valueContainerCSS,
};

// Merge Utility
// Allows consumers to extend a base Select with additional styles

export function mergeStyles<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  source: StylesConfig<Option, IsMulti, Group>,
  target: StylesConfig<Option, IsMulti, Group> = {}
) {
  // initialize with source styles
  const styles: StylesConfig<Option, IsMulti, Group> = { ...source };

  // massage in target styles
  Object.keys(target).forEach((keyAsString) => {
    const key = keyAsString as keyof StylesConfig<Option, IsMulti, Group>;
    if (source[key]) {
      // @ts-ignore [TS2590] Expression produces a union type that is too complex to represent
      styles[key] = (rsCss: any, props: any) => {
        const styles1Param = source[key]!;
        const styles1 =
          typeof styles1Param === 'function'
            ? styles1Param(rsCss, props)
            : styles1Param;
        const styles2Param = target[key]!;
        return typeof styles2Param === 'function'
          ? styles2Param(styles1, props)
          : styles2Param;
      };
    } else {
      styles[key] = target[key] as any;
    }
  });

  return styles;
}
