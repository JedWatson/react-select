// @flow
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useRef, useState, useEffect, type Element } from 'react';
import ScrollLock from './ScrollLock/index';

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

const cancelScroll = (event: SyntheticEvent<HTMLElement>) => {
  event.preventDefault();
  event.stopPropagation();
};

export default function ScrollManager({
  children,
  lockEnabled,
  captureEnabled = true,
  onBottomArrive,
  onBottomLeave,
  onTopArrive,
  onTopLeave,
}: Props) {
  const isBottom = useRef(false);
  const isTop = useRef(false);
  const touchStart = useRef(undefined);
  const targetElement = useRef(null);

  const [enableLock, setEnableLock] = useState(false);

  const handleEventDelta = (
    event: SyntheticEvent<HTMLElement>,
    delta: number
  ) => {
    // Reference should never be `null` at this point, but flow complains otherwise
    if (targetElement.current === null) return;

    const { scrollTop, scrollHeight, clientHeight } = targetElement.current;
    const target = targetElement.current;
    const isDeltaPositive = delta > 0;
    const availableScroll = scrollHeight - clientHeight - scrollTop;
    let shouldCancelScroll = false;

    // reset bottom/top flags
    if (availableScroll > delta && isBottom.current) {
      if (onBottomLeave) onBottomLeave(event);
      isBottom.current = false;
    }
    if (isDeltaPositive && isTop.current) {
      if (onTopLeave) onTopLeave(event);
      isTop.current = false;
    }

    // bottom limit
    if (isDeltaPositive && delta > availableScroll) {
      if (onBottomArrive && !isBottom.current) {
        onBottomArrive(event);
      }
      target.scrollTop = scrollHeight;
      shouldCancelScroll = true;
      isBottom.current = true;

      // top limit
    } else if (!isDeltaPositive && -delta > scrollTop) {
      if (onTopArrive && !isTop.current) {
        onTopArrive(event);
      }
      target.scrollTop = 0;
      shouldCancelScroll = true;
      isTop.current = true;
    }

    // cancel scroll
    if (shouldCancelScroll) {
      cancelScroll(event);
    }
  };

  const onWheel = (event: SyntheticWheelEvent<HTMLElement>) => {
    handleEventDelta(event, event.deltaY);
  };
  const onTouchStart = (event: SyntheticTouchEvent<HTMLElement>) => {
    // set touch start so we can calculate touchmove delta
    touchStart.current = event.changedTouches[0].clientY;
  };
  const onTouchMove = (event: SyntheticTouchEvent<HTMLElement>) => {
    const deltaY = touchStart - event.changedTouches[0].clientY;
    handleEventDelta(event, deltaY);
  };

  const startListening = el => {
    // bail early if no element is available to attach to
    if (!el) return;

    // all the if statements are to appease Flow 😢
    if (typeof el.addEventListener === 'function') {
      el.addEventListener('wheel', onWheel, false);
    }
    if (typeof el.addEventListener === 'function') {
      el.addEventListener('touchstart', onTouchStart, false);
    }
    if (typeof el.addEventListener === 'function') {
      el.addEventListener('touchmove', onTouchMove, false);
    }
  };

  const stopListening = el => {
    // bail early if no element is available to detach from
    if (!el) return;

    // all the if statements are to appease Flow 😢
    if (typeof el.removeEventListener === 'function') {
      el.removeEventListener('wheel', onWheel, false);
    }
    if (typeof el.removeEventListener === 'function') {
      el.removeEventListener('touchstart', onTouchStart, false);
    }
    if (typeof el.removeEventListener === 'function') {
      el.removeEventListener('touchmove', onTouchMove, false);
    }
  };

  useEffect(() => {
    if (captureEnabled) {
      startListening(targetElement);
    }
    return () => {
      stopListening(targetElement);
    };
  });

  const targetRef = element => {
    targetElement.current = element;
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
