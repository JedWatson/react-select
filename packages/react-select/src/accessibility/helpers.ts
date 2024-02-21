/// <reference types="user-agent-data-types" />

function testPlatform(re: RegExp) {
  return typeof window !== 'undefined' && window.navigator != null
    ? re.test(
        window.navigator['userAgentData']?.platform || window.navigator.platform
      )
    : false;
}

export function isIPhone() {
  return testPlatform(/^iPhone/i);
}

export function isMac() {
  return testPlatform(/^Mac/i);
}

export function isIPad() {
  return (
    testPlatform(/^iPad/i) ||
    // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
    (isMac() && navigator.maxTouchPoints > 1)
  );
}

export function isIOS() {
  return isIPhone() || isIPad();
}

export function isAppleDevice() {
  return isMac() || isIOS();
}
