var React = require('react');
var Gravatar = require('react-gravatar');

var SingleValue = React.createClass({
  propTypes: {
    placeholder: React.PropTypes.string,
    value: React.PropTypes.object
  },

  render: function() {
    var obj = this.props.value;
    var size = 15;

    return (
      <div className="Select-placeholder">
        {obj ? (
            <div>
              <Gravatar email={obj.email} size={size}/>
              {obj.value}
            </div>
          ) : (
            this.props.placeholder
          )
        }
      </div>
    );
  }
});

module.exports = SingleValue;
