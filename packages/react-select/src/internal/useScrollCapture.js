// @flow

import { useEffect, useRef } from 'react';

const cancelScroll = (event: SyntheticEvent<HTMLElement>) => {
  event.preventDefault();
  event.stopPropagation();
};

type Options = {
  enabled: boolean,
  onBottomArrive?: (event: SyntheticEvent<HTMLElement>) => void,
  onBottomLeave?: (event: SyntheticEvent<HTMLElement>) => void,
  onTopArrive?: (event: SyntheticEvent<HTMLElement>) => void,
  onTopLeave?: (event: SyntheticEvent<HTMLElement>) => void,
};

export default function useScrollCapture({
  enabled,
  onBottomArrive,
  onBottomLeave,
  onTopArrive,
  onTopLeave,
}: Options) {
  const isBottom = useRef(false);
  const isTop = useRef(false);
  const touchStart = useRef(0);
  const scrollTarget = useRef<HTMLElement | null>(null);

  const handleEventDelta = (
    event: SyntheticEvent<HTMLElement>,
    delta: number
  ) => {
    // Reference should never be `null` at this point, but flow complains otherwise
    if (scrollTarget.current === null) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollTarget.current;
    const target = scrollTarget.current;
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
    const deltaY = touchStart.current - event.changedTouches[0].clientY;
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
    const element = scrollTarget.current;
    if (enabled) {
      startListening(element);
    }

    return () => {
      stopListening(element);
    };
  });

  return (element: HTMLElement | null) => {
    scrollTarget.current = element;
  };
}
