/** @jsx jsx */
import {
  FocusEventHandler,
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { jsx } from '@emotion/react';

interface Props {
  readonly name: string;
  readonly requiredMessage: () => string;
  readonly onFocus: FocusEventHandler<HTMLInputElement>;
}

const RequiredInput: FunctionComponent<Props> = ({
  name,
  requiredMessage,
  onFocus,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(
    () => () => {
      // Reset validity on unmount
      inputRef.current?.setCustomValidity('');
    },
    []
  );

  const onInvalid = useCallback(() => {
    inputRef.current?.setCustomValidity(requiredMessage());
  }, [requiredMessage]);

  useEffect(() => {
    onInvalid();
  }, [onInvalid]);

  return (
    <input
      required
      name={name}
      tabIndex={-1}
      ref={inputRef}
      onFocus={onFocus}
      onInvalid={onInvalid}
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
};

export default RequiredInput;
