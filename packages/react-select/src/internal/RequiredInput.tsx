/** @jsx jsx */
import { FocusEventHandler, FunctionComponent } from 'react';
import { jsx } from '@emotion/react';

const RequiredInput: FunctionComponent<{
  readonly name: string;
  readonly onFocus: FocusEventHandler<HTMLInputElement>;
}> = ({ name, onFocus }) => (
  <input
    required
    name={name}
    tabIndex={-1}
    onFocus={onFocus}
    css={{
      label: 'requiredInput',
      opacity: 0,
      pointerEvents: 'none',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
    }}
    // Prevent `Switching from uncontrolled to controlled` error
    value=""
    onChange={() => {}}
  />
);

export default RequiredInput;
