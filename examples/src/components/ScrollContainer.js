import React from 'react';
import Select from 'react-select';
import createClass from 'create-react-class';

const STATES = require('../data/states');

const ScrollContainer = createClass({
  render () {
    return (
      <div className="section">
        <h3 className="section-heading">{this.props.label} <a href="https://github.com/JedWatson/react-select/tree/master/examples/src/components/ScrollContainer.js">(Source)</a></h3>
        <div style={{ overflow: 'auto', height: '50px', padding: '200px 5px 5px 5px' }}>
          <Select options={STATES.US} />
        </div>
        <div className="hint">This example shows the menu will scroll an inner container, rather than the whole window</div>
      </div>
    );
  }
});

module.exports = ScrollContainer;
