import { useEffect, useState } from 'react';
import { MagicalNode, MagicalNodeIndex } from '@magical-types/types';
import { deserialize } from '@magical-types/serialization/deserialize';

import type { MagicalNodeMetadata } from '../generate-magical-types/src/types';
// @ts-ignore
import manifest from '../magical-types/magical-types-manifest.json';

let getNode: ((index: MagicalNodeIndex) => MagicalNode) | undefined;

export const metadata: MagicalNodeMetadata = (manifest as any).types;

export function useMagicalNodes() {
  let [, forceUpdate] = useState(0);

  useEffect(() => {
    if (!getNode) {
      fetch(manifest.paths[0])
        .then((x) => x.json())
        .then((firstNodeGroup) => {
          getNode = deserialize([
            firstNodeGroup,
            ...(manifest.paths as string[])
              .slice(1)
              .map((path) => () => fetch(path).then((x) => x.json())),
          ]);
          forceUpdate(1);
        });
    }
  }, []);
  return getNode;
}
