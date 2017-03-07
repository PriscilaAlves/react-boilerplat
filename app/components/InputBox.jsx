var React = require("react");

var InputBox = React.createClass({
    handleSubmit: function (e) {
        e.preventDefault();
        this.props.handleClick();

    },
    render: function () {
        var {requestGT} = this.props;
        if (requestGT) {
            return (
                <div className="infoBox">
                    <div className="infoBoxHeader">
                        <h4>Insert ground truth</h4>
                    </div>
                    <div className="infoBoxContent">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="small-4 columns">
                                    <label for="middle-label" className="text-right middle">SPO2:</label>
                                </div>
                                <div className="small-8 columns">
                                    <input type="text" id="middle-label" placeholder="" id="inputGT" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="small-4 columns">
                                    <label for="middle-label" className="text-right middle">BP High:</label>
                                </div>
                                <div className="small-8 columns">
                                    <input type="text" id="middle-label" placeholder="" id="inputBPHigh" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="small-4 columns">
                                    <label for="middle-label" className="text-right middle">BP Low:</label>
                                </div>
                                <div className="small-8 columns">
                                    <input type="text" id="middle-label" placeholder="" id="inputBPLow" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="small-12 columns">
                                    <button type="button" className="button custom expanded" onClick={this.props.handleClick} id="SubmitGT">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            );
        } else {
            return null;
        }

    }
})

module.exports = InputBox;
