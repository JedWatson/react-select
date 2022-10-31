import React from 'react';

import CreatableSelect from 'react-select/creatable';
import { colourOptions } from '../data';

export default () => <CreatableSelect isMulti options={colourOptions} />;
