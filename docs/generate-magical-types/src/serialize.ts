import path from 'path';

// @ts-ignore
import fs from 'fs-extra';
import * as flatted from 'flatted';
import {
  chunkNodes,
  serializeNodes,
} from '@magical-types/serialization/serialize';

// import { MagicalNodeMetadata, MagicalNodes } from './types';

import { MagicalNode, MagicalNodeIndex } from '@magical-types/types';

export type MagicalNodeMetadata = Record<
  string,
  Record<string, { type: 'component' | 'other'; index: MagicalNodeIndex }>
>;

export type MagicalNodesForPackage = Record<
  string,
  { type: 'component' | 'other'; node: MagicalNode }
>;

export type MagicalNodes = Record<string, MagicalNodesForPackage>;

const allTypes: MagicalNodes = flatted.parse(
  fs.readFileSync(
    path.join(__dirname, '..', 'dist', 'magical-types.json'),
    'utf8'
  )
);

const staticDir = path.resolve(__dirname, '..', '..', 'magical-types');

// this is where gatsby copies the static directory to
// it doesn't clear it though, so this prevents it from growing forever
// fs.removeSync(path.resolve(__dirname, '..', '..', 'public', 'magical-types'));

fs.removeSync(staticDir);

fs.ensureDirSync(staticDir);

let rootNodes: MagicalNode[] = [];

for (const pkgName in allTypes) {
  for (const exportName in allTypes[pkgName]) {
    rootNodes.push(allTypes[pkgName][exportName].node);
  }
}

console.log('serializing nodes');
const serializationResult = serializeNodes(rootNodes);
console.log('done');

console.log('chunking nodes');
const chunkedNodes = chunkNodes(serializationResult);
console.log('done');

let outputPaths = chunkedNodes.map((x, index) =>
  path.join(
    staticDir,
    `magical-types-${index}-${Math.random().toString(36)}.json`
  )
);

let outputUrlSegments = outputPaths.map(
  (filepath) => `/magical-types/${path.basename(filepath)}`
);
let manifestOutputPath = path.resolve(staticDir, `magical-types-manifest.json`);

const metadataWithIndexes: MagicalNodeMetadata = {};

for (const pkgName in allTypes) {
  metadataWithIndexes[pkgName] = {};
  for (const exportName in allTypes[pkgName]) {
    if (serializationResult.nodesMeta.has(allTypes[pkgName][exportName].node)) {
      metadataWithIndexes[pkgName][exportName] = {
        type: allTypes[pkgName][exportName].type,
        index: serializationResult.nodesMeta.get(
          allTypes[pkgName][exportName].node
        )!.index,
      };
    }
  }
}

(async () => {
  console.log(`writing output`);
  await Promise.all([
    fs.writeFile(
      manifestOutputPath,
      JSON.stringify({
        paths: outputUrlSegments,
        types: metadataWithIndexes,
      })
    ),
    ...outputPaths.map((filepath, index) =>
      fs.writeFile(filepath, JSON.stringify(chunkedNodes[index]))
    ),
  ]);

  console.log('done');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
