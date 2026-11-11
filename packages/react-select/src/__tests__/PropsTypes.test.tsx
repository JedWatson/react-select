import type { AsyncCreatableProps } from '../AsyncCreatable';
import type { CreatableProps } from '../Creatable';
import type { AsyncProps } from '../useAsync';
import type { StateManagerProps } from '../useStateManager';
import type { GroupBase } from '../types';

// These are compile-time checks. If a props type loses its default generic
// parameters, `yarn type-check` fails on this file.

test('props types can be used without generic arguments', () => {
  // Each one is written with NO type arguments on purpose.
  const stateManaged: StateManagerProps = {};
  const creatable: CreatableProps = {};
  const async: AsyncProps = {};
  const asyncCreatable: AsyncCreatableProps = {};

  // The defaults should match the explicit form.
  const explicit: CreatableProps<unknown, boolean, GroupBase<unknown>> =
    creatable;

  expect([
    stateManaged,
    creatable,
    async,
    asyncCreatable,
    explicit,
  ]).toHaveLength(5);
});
