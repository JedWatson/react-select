import React, { Component, Fragment } from 'react';
import Modal from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import Select from '../../src';

import { colourOptions } from '../data';

export default class MenuPortal extends Component<*, { isOpen: boolean }> {
  state = { isOpen: false };
  open = () => { this.setState({ isOpen: true }); };
  close = () => { this.setState({ isOpen: false }); };
  render() {
    const { close, open } = this;
    const { isOpen } = this.state;
    return (
      <Fragment>
        <Button onClick={open}>Open Modal</Button>
        {
          isOpen ?
          <Modal onClose={close}>
            <Select
              defaultValue={colourOptions[0]}
              isClearable
              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
              menuPortalTarget={document.body}
              isSearchable
              name="color"
              options={colourOptions}
            />
          </Modal>
          : null
        }
      </Fragment>
    );
  }
}
