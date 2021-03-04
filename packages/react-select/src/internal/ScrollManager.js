// @flow
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { type Element } from 'react';
import useScrollCapture from './useScrollCapture';
import useScrollLock from './useScrollLock';

type RefCallback<T> = (T | null) => void;

type Props = {
  children: (RefCallback<HTMLElement>) => Element<*>,
  lockEnabled: boolean,
  captureEnabled: boolean,
  onBottomArrive?: (event: SyntheticEvent<HTMLElement>) => void,
  onBottomLeave?: (event: SyntheticEvent<HTMLElement>) => void,
  onTopArrive?: (event: SyntheticEvent<HTMLElement>) => void,
  onTopLeave?: (event: SyntheticEvent<HTMLElement>) => void,
};

const blurSelectInput = () =>
  document.activeElement && document.activeElement.blur();

export default function ScrollManager({
  children,
  lockEnabled,
  captureEnabled = true,
  onBottomArrive,
  onBottomLeave,
  onTopArrive,
  onTopLeave,
}: Props) {
  const setScrollCaptureTarget = useScrollCapture({
    isEnabled: captureEnabled,
    onBottomArrive,
    onBottomLeave,
    onTopArrive,
    onTopLeave,
  });
  const setScrollLockTarget = useScrollLock({ isEnabled: lockEnabled });

  const targetRef = element => {
    setScrollCaptureTarget(element);
    setScrollLockTarget(element);
  };

  return (
    <React.Fragment>
      {lockEnabled && (
        <div
          onClick={blurSelectInput}
          css={{ position: 'fixed', left: 0, bottom: 0, right: 0, top: 0 }}
        />
      )}
      {children(targetRef)}
    </React.Fragment>
  );
}
