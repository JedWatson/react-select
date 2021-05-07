import path from 'path';

// @ts-ignore
import fs from 'fs-extra';
import * as flatted from 'flatted';
import { Project } from 'ts-morph';
import { MagicalNode } from '@magical-types/types';
import { convertType, getPropTypesType } from '@magical-types/convert-type';

type MagicalNodesForPackage = Record<
  string,
  { type: 'component' | 'other'; node: MagicalNode }
>;

export type MagicalNodes = Record<string, MagicalNodesForPackage>;

const OTHERFILES: string[] = ['Async', 'Creatable'];
const getOtherProps = (obj: MagicalNodes) => {
  OTHERFILES.forEach((name: string) => {
    let pkgExports: MagicalNodesForPackage = {};
    obj[`${name}`] = pkgExports;
    let sourceFile = project.getSourceFile(
      path.join(__dirname, '../../Proptypes', `${name}.ts`)
    );
    if (!sourceFile) {
      sourceFile = project.getSourceFile(
        path.join(__dirname, '../../Proptypes', `${name}.tsx`)
      );
    }
    if (!sourceFile) {
      throw new Error(`source file not found for ${name}`);
    }
    resolveTypes({ sourceFile, item: name, pkgExports });
  });
};

const resolveTypes = ({
  sourceFile,
  item,
  pkgExports,
}: {
  sourceFile: any;
  item: string;
  pkgExports: MagicalNodesForPackage;
}) => {
  let exportedDeclarations = sourceFile.getExportedDeclarations();
  for (const [exportName, declaration] of exportedDeclarations) {
    if (item === 'icon' && exportName !== 'IconProps') continue;
    if (declaration.length) {
      let type = declaration[0].getType().compilerType;
      let typeKind: 'component' | 'other' = 'other';
      console.log(`about to convert ${exportName} from ${item}`);
      if (exportName[0].toUpperCase() === exportName[0]) {
        try {
          type = getPropTypesType(type);
          typeKind = 'component';
        } catch (err) {}
      }
      pkgExports[exportName] = {
        node: convertType(type, []),
        type: typeKind,
      };
      console.log('converted');
    }
  }
};

let project = new Project({
  addFilesFromTsConfig: true,
  tsConfigFilePath: path.resolve(__dirname, '../../../tsconfig.json'),
});
console.log('done');
let pkgDir = path.resolve(__dirname, '../../../packages');
let pkgs = fs
  .readdirSync(pkgDir, {
    withFileTypes: true,
  })
  .filter(
    // @ts-ignore
    (x) =>
      x.isDirectory() &&
      fs.existsSync(path.join(pkgDir, path.join(x.name), 'package.json'))
  )
  // @ts-ignore
  .map((x) => x.name);

let obj: MagicalNodes = {};

for (const item of pkgs) {
  let pkgExports: MagicalNodesForPackage = {};
  obj[`${item}`] = pkgExports;
  let sourceFile = project.getSourceFile(
    path.join(pkgDir, item, 'src', 'index.tsx')
  );
  if (!sourceFile) {
    sourceFile = project.getSourceFile(
      path.join(pkgDir, item, 'src', 'index.ts')
    );
  }
  if (!sourceFile) {
    throw new Error(`source file not found for ${item}`);
  }
  resolveTypes({ sourceFile, item, pkgExports });
}

getOtherProps(obj);

fs.outputFileSync(
  path.join(__dirname, '..', 'dist', 'magical-types.json'),
  flatted.stringify(obj)
);
