// @flow
// based on https://github.com/moroshko/shallow-equal/blob/master/src/objects.js

function shallowEqual(objA: Object, objB: Object) {
  if (objA === objB) {
    return true;
  }

  const aKeys = Object.keys(objA);
  const bKeys = Object.keys(objB);
  const len = aKeys.length;

  if (bKeys.length !== len) {
    return false;
  }

  for (var i = 0; i < len; i++) {
    const key = aKeys[i];

    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
}

export default shallowEqual;
