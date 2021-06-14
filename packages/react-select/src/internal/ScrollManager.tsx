/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { ReactElement, RefCallback } from 'react';
import useScrollCapture from './useScrollCapture';
import useScrollLock from './useScrollLock';

interface Props {
  readonly children: (ref: RefCallback<HTMLElement>) => ReactElement;
  readonly lockEnabled: boolean;
  readonly captureEnabled: boolean;
  readonly onBottomArrive?: (event: WheelEvent | TouchEvent) => void;
  readonly onBottomLeave?: (event: WheelEvent | TouchEvent) => void;
  readonly onTopArrive?: (event: WheelEvent | TouchEvent) => void;
  readonly onTopLeave?: (event: WheelEvent | TouchEvent) => void;
}

const blurSelectInput = () =>
  document.activeElement && (document.activeElement as HTMLElement).blur();

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

  const targetRef: RefCallback<HTMLElement> = (element) => {
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
