import type { ComponentType } from 'react';
import { default as Indent } from './Indent';
import { default as Outline } from './Outline';
import { default as Required } from './Required';
import { default as Type, StringType, TypeMeta } from './Type';


const components = {
  Indent,
  Outline,
  Required,
  Type,
  StringType,
  TypeMeta,
};

export default components;

export type Components = {
  Indent: ComponentType,
  Outline: ComponentType,
  Required: ComponentType,
  Type: ComponentType,
  StringType: ComponentType,
  TypeMeta: ComponentType,
}
