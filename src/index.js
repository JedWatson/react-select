import Select from './Select';
import Async from './Async';
import AsyncCreatable from './AsyncCreatable';
import Creatable from './Creatable';
import SelectPropTypes from './propTypes/SelectPropTypes';

Select.Async = Async;
Select.AsyncCreatable = AsyncCreatable;
Select.Creatable = Creatable;

export default Select;
export {
	Async,
	AsyncCreatable,
	Creatable,
	SelectPropTypes
};
