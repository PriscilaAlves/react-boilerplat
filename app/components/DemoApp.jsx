var React = require("react");
var FlotGraph = require("FlotGraph");
var WebsocketAPI = require('WebsocketAPI');
var Header = require('Header');
var Loading = require('Loading');

var DemoApp = React.createClass({
    getInitialState: function () {
        return {
            dataECG: [[0,0], [1,0]],
            dataIR: [[0,0], [1,0]],
            dataRED: [[0,0], [1,0]],
            msgToSend: {},
            acquiring: null,
            isLoading: true,
            users: [],
            time: 0
        };
    },
    handleData: function (obj) {
        switch (obj.Command) {
            case "Users":
                this.setState({users: obj.Values});
                break;
            case "Data":
                var data = obj.Values;
                this.setState({
                    dataECG: JSON.parse(data.ECG),
                    dataIR: JSON.parse(data.IR),
                    dataRED: JSON.parse(data.RED),
                    msgToSend: {}
                })
                break;
            case "device":
                obj.Status ? this.setState({acquiring: false, isLoading: false}) : console.log("Device not connected");
                break;
            case "HandsOn":
                console.log(obj.Value ? "Hands Off" : "Hands On");
                break;
            case "Error":
                console.log(obj.Message);
                break;
            default:
                return null;
        }
    },
    countdown: function (time, callback) {
        var context = this;
        this.timer = setInterval(function() {
            if (time > 0) {
                context.setState({
                    time: Math.round(time/1000)
                });
                time = time - 1000;
            } else {
                context.setState({
                    time: Math.round(time/1000)
                });

                clearInterval(context.timer);
                callback();
            }
        }, 1000);
    },
    startAcquition: function (user) {
        this.setState({
            msgToSend: {'Command': 'acquire', 'user': user},
            acquiring: true
        });
        $("#recordButton").text("Stop");
    },
    stopAcquisition: function () {
        this.setState({
            msgToSend: {'Command': 'wait'},
            acquiring: false,
            time: 0
        });
        $("#recordButton").text("Record");
        $("#selectedUser").val("");
    },
    onButtonClick: function () {
        if (this.state.acquiring && this.state.acquiring !=null) {
            clearInterval(this.timer);
            this.stopAcquisition();
        } else if (this.state.acquiring == null) {
            console.log("null");
        } else {
            var selectedUser = $('#selectedUser').val().replace(/\s/g, '');
            console.log("selected user: " + selectedUser);
            if (selectedUser != "") {
                $("#selectedUser").removeClass("warning-input");
                var context = this;
                this.countdown(3000, function () {
                    context.startAcquition(selectedUser);
                    context.countdown(30000, function () {
                        context.stopAcquisition();
                    });
                });
            } else {
                $("#selectedUser").addClass("warning-input");
            }

        }
    },
    render: function () {
        var options = {
    		series: { lines: {lineWidth: 1.5}, shadowSize: 0 , color:"#bf5922"},
    		legend:false,
    		xaxis: {show:false},
    		yaxis: {show:false},
    		grid: {backgroundColor: "transparent" ,borderColor:"transparent",borderWidth:1}
    	};
        var {dataECG, dataIR, dataRED, isLoading} = this.state;
        var h = $(document).height();
        var plotHeight = Math.round(((h-63)/3)-70);

        return (
            <div>
                <Header handleClick={this.onButtonClick} users={this.state.users} clock={this.state.time} acquisition={this.state.acquiring}/>
                <div className="row fullWidth">
                    <div className="column small-centered small-12 medium-12 large-12">
                        <div className="container">
                            <FlotGraph id="ecg-graph" label="ecg" options={options} data={dataECG} width="100%" height={plotHeight + "px"} />
                            <FlotGraph id="ir-graph" label="infrared" options={options} data={dataIR} width="100%" height={plotHeight + "px"} />
                            <FlotGraph id="red-graph" label="red" options={options} data={dataRED} width="100%" height={plotHeight + "px"} />
                        </div>
                    </div>
                </div>
                <Loading loading={isLoading}/>
                <WebsocketAPI url="ws://localhost:8000" onMessage={this.handleData} data={this.state.msgToSend}/>
            </div>
        );
    }
});

module.exports = DemoApp;