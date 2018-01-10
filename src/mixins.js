// @flow
export function marginHorizontal(p: number) {
  return { marginLeft: p, marginRight: p };
}
export function marginVertical(p: number) {
  return { marginBottom: p, marginTop: p };
}

export function paddingHorizontal(p: number) {
  return { paddingLeft: p, paddingRight: p };
}
export function paddingVertical(p: number) {
  return { paddingBottom: p, paddingTop: p };
}
