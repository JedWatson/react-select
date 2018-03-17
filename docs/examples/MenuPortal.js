import React, { Component, Fragment } from 'react';
import Modal from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import Select from '../../src';

import { colourOptions } from '../data';

export default class MenuPortal extends Component<*, { isOpen: boolean }> {
  state = { isOpen: false };
  open = () => this.setState({ isOpen: true });
  close = () => this.setState({ isOpen: false });
  render() {
    const { isOpen } = this.state;

    return (
      <Fragment>
        <Button onClick={this.open}>Open Modal</Button>
        {isOpen ? (
          <Modal
            actions={[{ text: 'Close', onClick: this.close }]}
            heading="Modal Example"
            onClose={this.close}
          >
            <p style={{ marginTop: 0 }}>
              This modal is positioned absolutely, the body section of the
              dialog has overflow auto applied, which would typically crop the
              menu.
            </p>
            <Select
              defaultValue={colourOptions[0]}
              menuPortalTarget={document.body}
              options={colourOptions}
              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
            />
          </Modal>
        ) : null}
      </Fragment>
    );
  }
}
