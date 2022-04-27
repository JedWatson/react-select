import React, { RefCallback } from 'react';
import Select, { MenuPlacerProps, PlacerProps } from 'react-select';
import {
  ColourOption,
  colourOptions,
  FlavourOption,
  GroupedOption,
  groupedOptions,
} from '../data';

const MenuPlacer = (
  props: MenuPlacerProps<ColourOption | FlavourOption, false, GroupedOption>
) => {
  const { children } = props;

  const getCustomPlacement: RefCallback<HTMLDivElement> = (ref) => {
    if (!ref) return;
    // custom implementation of getPlacement
  };

  const getUpdatedProps: () => PlacerProps = () => {
    return {
      placement: 'top',
      maxHeight: 200,
    };
  };

  return (
    <>
      {children({
        ref: getCustomPlacement,
        placerProps: getUpdatedProps(),
      })}
    </>
  );
};

export default () => (
  <Select<ColourOption | FlavourOption, false, GroupedOption>
    defaultValue={colourOptions[1]}
    options={groupedOptions}
    components={{ MenuPlacer }}
  />
);
