import '../styles/tailwind.css';

import Modal from '@atlaskit/modal-dialog';
import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Select, { MenuPlacement, StylesConfig } from 'react-select';

import { Button, ChevronDown, Field, Stack } from '../components';
import { Inline } from '../components/inline';
import { ColourOption, colourOptions } from '../data';

export default {
  title: 'Select/MenuPortal',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

export function MenuPortal() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isFixed, setIsFixed] = React.useState(false);
  const [menuPlacement, setMenuPlacement] =
    React.useState<MenuPlacement>('bottom');

  const component = React.useMemo(() => {
    if (!isModalOpen) return null;
    return (
      <Modal onClose={() => setIsModalOpen(false)}>
        <Stack className="py-24">
          <Field
            label="Portaled Menu Element"
            htmlFor="portaled-menu-element-id"
          >
            <Select
              inputId="portaled-menu-element-id"
              defaultValue={colourOptions[0]}
              options={colourOptions}
              isClearable
              isSearchable
              menuPlacement={menuPlacement}
              menuPortalTarget={document.body}
              menuPosition={isFixed ? 'fixed' : 'absolute'}
              menuShouldScrollIntoView={false}
              styles={styles}
            />
          </Field>
          <Inline gap="large">
            {/* Menu placement */}
            <Field label="Menu Placement" htmlFor="menu-placement-id">
              <span className="relative inline-flex items-center">
                <ChevronDown className="absolute right-3 transform -translate-y-1/2 top-1/2 pointer-events-none" />
                <select
                  id="menu-placement-id"
                  className="block appearance-none border w-full rounded-md border-gray-300 h-10 pl-3 pr-10 text-base focus:border-blue-500 sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onChange={(e) =>
                    setMenuPlacement(e.currentTarget.value as MenuPlacement)
                  }
                  value={menuPlacement}
                >
                  <option value="auto">auto</option>
                  <option value="bottom">bottom</option>
                  <option value="top">top</option>
                </select>
              </span>
            </Field>
            {/* Menu Position */}
            <fieldset>
              <legend className="font-medium flex flex-col mb-2">
                Menu position
              </legend>
              <Inline gap="medium">
                {(['fixed', 'absolute'] as const).map((menuPosition) => (
                  <div key={menuPosition} className="flex items-center">
                    <input
                      id={menuPosition}
                      checked={menuPosition === 'fixed' ? isFixed : !isFixed}
                      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                      onChange={() => setIsFixed((prev) => !prev)}
                      type="radio"
                    />
                    <label
                      htmlFor={menuPosition}
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      {menuPosition}
                    </label>
                  </div>
                ))}
              </Inline>
            </fieldset>
          </Inline>
        </Stack>
      </Modal>
    );
  }, [isFixed, isModalOpen, menuPlacement]);

  return (
    <React.Fragment>
      <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
      {component}
    </React.Fragment>
  );
}

// =============================================================================
// Utils
// =============================================================================

const styles: StylesConfig<ColourOption> = {
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
};
