import React from 'react';

var data =    [
    {
        load_number: 1,
        stops: [{location_name: 'loc1'}, {location_name: 'loc2'}]
    },
    {
        load_number: 2,
        stops: [{location_name: 'loc1'}, {location_name: 'loc2'}]
    },
    {
        load_number: 3,
        stops: [{location_name: 'loc1'}, {location_name: 'loc2'}]
    },
    {
        load_number: 4,
        stops: [{location_name: 'loc1'}, {location_name: 'loc2'}]
    }
    ]
;

var Vehicle = React.createClass({

    onDragOver(e) {
      e.preventDefault();
      // Logic here
      console.log('onDragOver');
    },
    onDragStart(e){
        e.dataTransfer.setData('id', 'setTheId');
        console.log('onDragStart');
    },
    onDrop(e) {
        console.log('onDrop');
        var id = e.dataTransfer.getData('id');
        console.log('Dropped with id:', id);
    },

    render() {
        var that = this;
        var loads = data.map(function(load , i){
            load.truckid = i
            return (
				<span key={i} style={{"display": "block", "backgroundColor": "green", "color": "yellow", "outline": "1px solid orange"}} draggable="true" onDragOver={that.onDragOver} onDragStart={that.onDragStart}>
					{load.load_number}{load.stops[0].location_name}{load.stops[1].location_name}
				</span>
            )
        })
        return (
                <div>
                    <span className="panel-body" >
                        <div className="table" onDrop={this.onDrop}>
                                {loads}
                        </div>
                    </span>
                </div>
        )
    }
});

module.exports = Vehicle;
