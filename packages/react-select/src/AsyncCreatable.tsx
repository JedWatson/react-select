import { makeAsyncSelect } from './Async';
import { makeCreatableSelect } from './Creatable';
import manageState from './stateManager';
import Select from './Select';

const SelectCreatable = makeCreatableSelect(Select);
const SelectCreatableState = manageState(SelectCreatable);

export default makeAsyncSelect(SelectCreatableState);
