import React  from 'react';
import { CSS } from '@dnd-kit/utilities';
import Select, {
  components,
  MultiValueGenericProps, MultiValueProps, MultiValueRemoveProps,
  OnChangeValue,
} from 'react-select';
import { ColourOption, colourOptions } from '../data';
import Tooltip from '@atlaskit/tooltip';
import { DndContext, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { arrayMove, horizontalListSortingStrategy, SortableContext, useSortable } from '@dnd-kit/sortable';

export const MultiValue = (props: MultiValueProps<ColourOption>) => {
    // this prevents the menu from being opened/closed when the user clicks
    // on a value to begin dragging it. ideally, detecting a click (instead of
    // a drag) would still focus the control and toggle the menu, but that
    // requires some magic with refs that are out of scope for this example
    // const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
      // e.preventDefault();
      // e.stopPropagation();
    // };
    const innerProps = { ...props.innerProps, };
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.data.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
            <div
              style={style}
              ref={setNodeRef}
              {...attributes}
              {...listeners}
            >
              <components.MultiValue  {...props} innerProps={innerProps} />
            </div>);
  };


export const MultiValueContainer = (props: MultiValueGenericProps<ColourOption>) => {
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

export const MultiValueLabel = (props: MultiValueGenericProps<ColourOption>) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable',
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <Tooltip content={'Customise your multi-value label component111!'}>
      <div style={style} ref={setNodeRef} {...listeners} {...attributes}>
      <components.MultiValueLabel {...props} />
      </div>
    </Tooltip>
  );
};

export const MultiValueRemove = (props: MultiValueRemoveProps<ColourOption>) => {
  // console.log('MultiValueRemove', props.data.id);
  return (
    <div onClick={()=> console.log('clicked on ->', props.data.id)} style={{zIndex: 99999}}>
      <components.MultiValueRemove {...props}  />
    </div>
  );
};


export default function MultiSelectSort() {
  const [selected, setSelected] = React.useState<ColourOption[]>([...[
    colourOptions[4],
    colourOptions[5],
  ]]);

  const onChange = (selectedOptions: OnChangeValue<ColourOption, true>) =>
    setSelected([...selectedOptions]);

  const onSortEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!active || !over) return;

    setSelected((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });

  };

  // const { setNodeRef } = useDraggable({})

  return (
    <DndContext modifiers={[restrictToParentElement]} onDragEnd={onSortEnd}>
      <SortableContext items={selected} strategy={horizontalListSortingStrategy}>
        <Select
          useDragHandle
          distance={4}
          isMulti
          options={colourOptions}
          value={selected}
          onChange={onChange}
          components={{
            // @ts-ignore We're failing to provide a required index prop to SortableElement
            MultiValue,
            MultiValueContainer,
            MultiValueRemove
          }}
          closeMenuOnSelect={false}
        />
      </SortableContext>
    </DndContext>
  );
}
