import React, { useState } from 'react';
import Modal from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import Select, { MenuPlacement } from 'react-select';
import { H1, Note } from '../styled-components';

import { colourOptions } from '../data';

export default () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [menuPlacement, setMenuPlacement] = useState<MenuPlacement>('bottom');

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      {isOpen ? (
        <Modal onClose={() => setIsOpen(false)}>
          <H1>Portaled Menu Element</H1>
          <Select
            defaultValue={colourOptions[0]}
            isClearable
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            menuPortalTarget={document.body}
            isSearchable
            name="color"
            menuPosition={isFixed ? 'fixed' : 'absolute'}
            menuPlacement={menuPlacement}
            options={colourOptions}
            menuShouldScrollIntoView={false}
          />
          <Note Tag="label">
            <select
              onChange={(e) =>
                setMenuPlacement(e.currentTarget.value as MenuPlacement)
              }
              value={menuPlacement}
              id="cypress-portalled__radio-bottom"
            >
              <option value="auto">auto</option>
              <option value="bottom">bottom</option>
              <option value="top">top</option>
            </select>
          </Note>
          <Note Tag="label" style={{ marginLeft: '1em' }}>
            <input
              type="radio"
              onChange={() => setIsFixed((prev) => !prev)}
              value="fixed"
              checked={isFixed}
              id="cypress-portalled__fixed"
            />
            Fixed
          </Note>
          <Note Tag="label" style={{ marginLeft: '1em' }}>
            <input
              type="radio"
              onChange={() => setIsFixed((prev) => !prev)}
              value="portal"
              checked={!isFixed}
              id="cypress-portalled__portal"
            />
            Portal
          </Note>
        </Modal>
      ) : null}
    </>
  );
};
