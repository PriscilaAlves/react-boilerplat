var React = require("react");

var WebsocketAPI = React.createClass({
    getInitialState: function () {
        return {
            ws: new WebSocket(this.props.url)
        };
    },

    setupWebsocket: function() {
        let websocket = this.state.ws;

        websocket.onopen = () => {
          console.log("WS connection opened.");
        };

        websocket.onmessage = (evt) => {
            var msg = JSON.parse(evt.data);
            this.props.onMessage(msg);
        };

        websocket.onclose = () => {
          console.log("WS connection closed.")
        };

    },

    receiveData: function(data) {
        if (Object.keys(data).length != 0) {
            this.state.ws.send(JSON.stringify(data));
        }
    },
    componentDidMount: function () {
        this.setupWebsocket()
    },
    componentWillUnmount() {
      this.state.ws.close();
    },
    componentDidUpdate: function () {

    },

    render: function () {
        var {data} = this.props;
        this.receiveData(data);
        return (
            <div></div>
        );
    }

});

module.exports =  WebsocketAPI;
