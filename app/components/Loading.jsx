var React = require("react");

var Loading = React.createClass({
    render: function() {
        var {loading} = this.props;
        if (loading) {
            return (
                <div className="loading">
                    <h1>Loading ...</h1>
                </div>
            );
        } else {
            return null;
        }
    }
})

module.exports = Loading;
