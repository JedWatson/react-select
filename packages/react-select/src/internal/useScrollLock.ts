import { useCallback, useEffect, useRef } from 'react';

const STYLE_KEYS = [
  'boxSizing',
  'height',
  'overflow',
  'paddingRight',
  'position',
] as const;

const LOCK_STYLES = {
  boxSizing: 'border-box', // account for possible declaration `width: 100%;` on body
  overflow: 'hidden',
  position: 'relative',
  height: '100%',
};

function preventTouchMove(e: TouchEvent) {
  e.preventDefault();
}

function allowTouchMove(e: TouchEvent) {
  e.stopPropagation();
}

function preventInertiaScroll(this: HTMLElement) {
  const top = this.scrollTop;
  const totalScroll = this.scrollHeight;
  const currentScroll = top + this.offsetHeight;

  if (top === 0) {
    this.scrollTop = 1;
  } else if (currentScroll === totalScroll) {
    this.scrollTop = top - 1;
  }
}

// `ontouchstart` check works on most browsers
// `maxTouchPoints` works on IE10/11 and Surface
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

let activeScrollLocks = 0;

interface Options {
  readonly isEnabled: boolean;
  readonly accountForScrollbars?: boolean;
}

const listenerOptions = {
  capture: false,
  passive: false,
};

export default function useScrollLock({
  isEnabled,
  accountForScrollbars = true,
}: Options) {
  const originalStyles = useRef<{ [key: string]: string }>({});
  const scrollTarget = useRef<HTMLElement | null>(null);

  const addScrollLock = useCallback(
    (touchScrollTarget: HTMLElement | null) => {
      if (!canUseDOM) return;

      const target = document.body;
      const targetStyle = target && target.style;

      if (accountForScrollbars) {
        // store any styles already applied to the body
        STYLE_KEYS.forEach((key) => {
          const val = targetStyle && targetStyle[key];
          originalStyles.current[key] = val;
        });
      }

      // apply the lock styles and padding if this is the first scroll lock
      if (accountForScrollbars && activeScrollLocks < 1) {
        const currentPadding =
          parseInt(originalStyles.current.paddingRight, 10) || 0;
        const clientWidth = document.body ? document.body.clientWidth : 0;
        const adjustedPadding =
          window.innerWidth - clientWidth + currentPadding || 0;

        Object.keys(LOCK_STYLES).forEach((key) => {
          const val = LOCK_STYLES[key as keyof typeof LOCK_STYLES];
          if (targetStyle) {
            targetStyle[key as keyof typeof LOCK_STYLES] = val;
          }
        });

        if (targetStyle) {
          targetStyle.paddingRight = `${adjustedPadding}px`;
        }
      }

      // account for touch devices
      if (target && isTouchDevice()) {
        // Mobile Safari ignores { overflow: hidden } declaration on the body.
        target.addEventListener('touchmove', preventTouchMove, listenerOptions);

        // Allow scroll on provided target
        if (touchScrollTarget) {
          touchScrollTarget.addEventListener(
            'touchstart',
            preventInertiaScroll,
            listenerOptions
          );
          touchScrollTarget.addEventListener(
            'touchmove',
            allowTouchMove,
            listenerOptions
          );
        }
      }

      // increment active scroll locks
      activeScrollLocks += 1;
    },
    [accountForScrollbars]
  );

  const removeScrollLock = useCallback(
    (touchScrollTarget: HTMLElement | null) => {
      if (!canUseDOM) return;

      const target = document.body;
      const targetStyle = target && target.style;

      // safely decrement active scroll locks
      activeScrollLocks = Math.max(activeScrollLocks - 1, 0);

      // reapply original body styles, if any
      if (accountForScrollbars && activeScrollLocks < 1) {
        STYLE_KEYS.forEach((key) => {
          const val = originalStyles.current[key];
          if (targetStyle) {
            targetStyle[key] = val;
          }
        });
      }

      // remove touch listeners
      if (target && isTouchDevice()) {
        target.removeEventListener(
          'touchmove',
          preventTouchMove,
          listenerOptions
        );

        if (touchScrollTarget) {
          touchScrollTarget.removeEventListener(
            'touchstart',
            preventInertiaScroll,
            listenerOptions
          );
          touchScrollTarget.removeEventListener(
            'touchmove',
            allowTouchMove,
            listenerOptions
          );
        }
      }
    },
    [accountForScrollbars]
  );

  useEffect(() => {
    if (!isEnabled) return;

    const element = scrollTarget.current;
    addScrollLock(element);

    return () => {
      removeScrollLock(element);
    };
  }, [isEnabled, addScrollLock, removeScrollLock]);

  return (element: HTMLElement | null) => {
    scrollTarget.current = element;
  };
}
