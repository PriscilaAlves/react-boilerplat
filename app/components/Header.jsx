var React = require("react");
var SelectUsers = require("SelectUsers");

var Header = React.createClass({

    render: function() {
        function showTimer(time, acquisition) {
            if(acquisition) {
                if (time > 0) {
                    return (
                        <li className="menu-text orange">Acquisition ends in <span>{time} seconds </span></li>
                    );
                } else {
                    return null;
                }
            } else {
                if (time > 0) {
                    return (
                        <li className="menu-text">Starts in <span>{time} seconds </span></li>
                    );
                } else {
                    return null;
                }
            }

        }
        return (
            <div className="top-bar">
                <div className="top-bar-left">
                    <ul className="menu">
                        <li className="menu-text"><img src="img/cardioid_logo.png" className="logo"/></li>
                    </ul>
                </div>
                <div className="top-bar-right">
                    <ul className=" menu">
                        {showTimer(this.props.clock, this.props.acquisition)}
                        <SelectUsers users={this.props.users} />
                        <li><button type="button" className="button custom" onClick={this.props.handleClick} id="recordButton">Record</button></li>
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = Header;
