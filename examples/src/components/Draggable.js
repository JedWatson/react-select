import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui.js';

var DraggbableDemo = createClass({
	displayName: 'DraggbableDemo',
	propTypes: {
		hint: PropTypes.string,
		label: PropTypes.string
	},
	getInitialState () {
		return {
			multi: true,
			multiValue: [],
			options: [
				{ value: 'R', label: 'Red' },
				{ value: 'G', label: 'Green' },
				{ value: 'B', label: 'Blue' }
			],
			value: undefined
		};
	},
	handleOnChange (value) {
		const { multi } = this.state;
		if (multi) {
			this.setState({ multiValue: value });
		} else {
			this.setState({ value });
		}
    },
    sortableHandler(val){
        var container = '#'+val + '-draggable-wrapper';
        $(container).sortable({
            stop: (event, ui)=>{
                //when finish to draggable them, execute these.
                var father = $(container);
                var childs = father.find('.Select-value').children('.Select-value-label').clone();
                childs.find(':nth-child(n)').remove();
                var vals = [];
                for(let i =0;i<childs.length;i++){
                    vals.push(childs[i].title);
                }
                //TO-DO (It could be used to syschronize hidden inputs' value)
            }
        });
    },
	render () {
		const { multi, multiValue, options, value } = this.state;
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label} <a href="https://github.com/JedWatson/react-select/tree/master/examples/src/components/Creatable.js">(Source)</a></h3>
				<Select.Creatable
					multi={multi}
					options={options}
                    onChange={this.handleOnChange}
                    sortableHandler={this.sortableHandler}
                    value={multi ? multiValue : value}
                    isSortable={true}
				/>
				<div className="hint">{this.props.hint}</div>
			</div>
		);
	}
});

module.exports = DraggbableDemo;
