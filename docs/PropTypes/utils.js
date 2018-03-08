import React from 'react';
import PrettyProp from '../PrettyProp';

export const propsList = (propDefs) => propDefs.map(p => <PrettyProp key={p.name} {...p}/>);
