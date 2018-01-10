export const colourOptions = [
	{ value: 'red', label: 'Red', color: '#FF5630' },
	{ value: 'purple', label: 'Purple', color: '#6554C0' },
	{ value: 'blue', label: 'Blue', color: '#0052CC' },
	{ value: 'green', label: 'Green', color: '#36B37E' },
	{ value: 'yellow', label: 'Yellow', color: '#FFAB00' },
	{ value: 'grey', label: 'Grey', color: '#666666' },
];

export const flavourOptions = [
	{ value: 'vanilla', label: 'Vanilla' },
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'salted-caramel', label: 'Salted Caramel' },
];

// let bigOptions = [];
// for (let i = 0; i < 10000; i++) {
// 	bigOptions = bigOptions.concat(colourOptions);
// }

export const groupedOptions = [
	{
		label: 'Colours',
		options: colourOptions,
	},
	{
		label: 'Flavours',
		options: flavourOptions,
	},
];
