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
