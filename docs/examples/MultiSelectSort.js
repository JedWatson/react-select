import React from 'react';

import Select, { components } from 'react-select';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { colourOptions } from '../data';


function arrayMove(array, from, to) {
  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
}

const SortableMultiValue = SortableElement(components.MultiValue);
const SortableSelect = SortableContainer(Select);


export default function MultiSelectSort() {
  const [selected, setSelected] = React.useState([colourOptions[4], colourOptions[5]]);

  const onChange = (selectedOptions)=> setSelected(selectedOptions);

  const onSortEnd = ({ oldIndex, newIndex })=> {
    setSelected(arrayMove(selected, oldIndex, newIndex));
  };

  return (
    <SortableSelect
      // react-sortable-hoc props:
      axis="xy"
      onSortEnd={onSortEnd}
      distance={4}
      // small fix for https://github.com/clauderic/react-sortable-hoc/pull/352 :
      getHelperDimensions={({ node })=> node.getBoundingClientRect()}

      // react-select props:
      isMulti
      options={colourOptions}
      value={selected}
      onChange={onChange}
      components={{
        MultiValue: SortableMultiValue
      }}
      closeMenuOnSelect={false}
    />
  );
}
