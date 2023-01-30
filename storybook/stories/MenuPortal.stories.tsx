import Button from '@atlaskit/button/standard-button';
import Modal from '@atlaskit/modal-dialog';
import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Select, {
  defaultTheme,
  MenuPlacement,
  StylesConfig,
} from 'react-select';

import { ChevronDown, Field, Inline, Stack } from '../components';
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
        <Stack
          style={{
            fontFamily: 'system-ui',
            paddingTop: '6rem',
            paddingBottom: '6rem',
          }}
        >
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
              <Inline style={{ position: 'relative', alignItems: 'center' }}>
                <ChevronDown
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    height: '1.5rem',
                    width: '1.5rem',
                  }}
                />
                <select
                  id="menu-placement-id"
                  style={{
                    fontSize: '1rem',
                    display: 'block',
                    appearance: 'none',
                    border: `1px solid ${defaultTheme.colors.neutral20}`,
                    width: '100%',
                    borderRadius: '4px',
                    height: '2.5rem',
                    paddingLeft: '0.75rem',
                    paddingRight: '2.5rem',
                  }}
                  onChange={(e) =>
                    setMenuPlacement(e.currentTarget.value as MenuPlacement)
                  }
                  value={menuPlacement}
                >
                  <option value="auto">auto</option>
                  <option value="bottom">bottom</option>
                  <option value="top">top</option>
                </select>
              </Inline>
            </Field>
            {/* Menu Position */}
            <fieldset style={{ padding: 0, margin: 0, border: 'none' }}>
              <legend
                style={{
                  fontWeight: 500,
                  marginBottom: '0.5rem',
                }}
              >
                Menu position
              </legend>
              <Inline gap="medium">
                {(['fixed', 'absolute'] as const).map((menuPosition) => (
                  <Inline
                    key={menuPosition}
                    gap="small"
                    style={{ alignItems: 'center' }}
                  >
                    <input
                      id={menuPosition}
                      checked={menuPosition === 'fixed' ? isFixed : !isFixed}
                      onChange={() => setIsFixed((prev) => !prev)}
                      style={{
                        borderRadius: '100%',
                        height: '1.25rem',
                        width: '1.25rem',
                        margin: 0,
                      }}
                      type="radio"
                    />
                    <label htmlFor={menuPosition} style={{ display: 'block' }}>
                      {menuPosition}
                    </label>
                  </Inline>
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
