/**
 * Alternative to Array.isArray that correctly narrows the type for readonly arrays.
 */
export default function isArray<T>(arg: unknown): arg is readonly T[] {
  return Array.isArray(arg);
}
