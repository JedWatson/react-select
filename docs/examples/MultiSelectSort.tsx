import React, { MouseEventHandler, useCallback } from 'react';
import Select, {
  components,
  MultiValueProps,
  MultiValueRemoveProps,
  OnChangeValue,
} from 'react-select';
import { ColourOption, colourOptions } from '../data';
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const MultiValue = (props: MultiValueProps<ColourOption>) => {
  const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const innerProps = { ...props.innerProps, onMouseDown };
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.data.value,
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div style={style} ref={setNodeRef} {...attributes} {...listeners}>
      <components.MultiValue {...props} innerProps={innerProps} />
    </div>
  );
};

const MultiValueRemove = (props: MultiValueRemoveProps<ColourOption>) => {
  return (
    <components.MultiValueRemove
      {...props}
      innerProps={{
        onPointerDown: (e) => e.stopPropagation(),
        ...props.innerProps,
      }}
    />
  );
};

const MultiSelectSort = () => {
  const [selected, setSelected] = React.useState<ColourOption[]>([
    colourOptions[4],
    colourOptions[5],
  ]);

  const onChange = (selectedOptions: OnChangeValue<ColourOption, true>) =>
    setSelected([...selectedOptions]);

  const onDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (!active || !over) return;

    setSelected((items) => {
      const oldIndex = items.findIndex((item) => item.value === active.id);
      const newIndex = items.findIndex((item) => item.value === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  }, [setSelected]);

  return (
    <DndContext modifiers={[restrictToParentElement]} onDragEnd={onDragEnd} collisionDetection={closestCenter}>
      <SortableContext
        items={selected.map((o) => o.value)}
        strategy={horizontalListSortingStrategy}
      >
        <Select
          distance={4}
          isMulti
          options={colourOptions}
          value={selected}
          onChange={onChange}
          components={{
            // @ts-ignore We're failing to provide a required index prop to SortableElement
            MultiValue,
            MultiValueRemove,
          }}
          closeMenuOnSelect={false}
        />
      </SortableContext>
    </DndContext>
  );
};

export default MultiSelectSort;
