import React, { MouseEventHandler, useCallback } from 'react';
import Select, {
  components,
  MultiValueGenericProps,
  MultiValueProps,
  MultiValueRemoveProps,
  OnChangeValue,
} from 'react-select';
import { ColourOption, colourOptions } from '../data';
import Tooltip from '@atlaskit/tooltip';
import { DndContext, DragEndEvent, useDroppable } from '@dnd-kit/core';
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
      id: props.data.id,
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

const MultiValueContainer = (props: MultiValueGenericProps<ColourOption>) => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });

  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <Tooltip content={'Customise your multi-value container!'}>
      <div style={style} ref={setNodeRef}>
        <components.MultiValueContainer {...props} />
      </div>
    </Tooltip>
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
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  }, [setSelected]);

  return (
    <DndContext modifiers={[restrictToParentElement]} onDragEnd={onDragEnd}>
      <SortableContext
        items={selected}
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
            MultiValueContainer,
            MultiValueRemove,
          }}
          closeMenuOnSelect={false}
        />
      </SortableContext>
    </DndContext>
  );
};

export default MultiSelectSort;
