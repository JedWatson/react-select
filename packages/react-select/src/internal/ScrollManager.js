// @flow
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { type Element, useRef, useState } from 'react';
import ScrollLock from './ScrollLock/index';
import useScrollCapture from './useScrollCapture';

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
    enabled: captureEnabled,
    onBottomArrive,
    onBottomLeave,
    onTopArrive,
    onTopLeave,
  });
  const [enableLock, setEnableLock] = useState(false);
  const targetElement = useRef<HTMLElement | null>(null);

  const targetRef = element => {
    setScrollCaptureTarget(element);
    setEnableLock(!!element);
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
      {lockEnabled && enableLock && targetElement.current && (
        <ScrollLock touchScrollTarget={targetElement.current} />
      )}
    </React.Fragment>
  );
}
