var React = require("react");
import $ from 'jquery';
import flot from 'flot';


var FlotGraph = React.createClass({

    renderChart: function() {
        var {id, data, options} = this.props;
        this.pl.setData([data]);
        this.pl.setupGrid();
        this.pl.draw();
    },
    componentDidMount: function() {
        // called when the component is mounted
        var totalPoints = 1280;
        var zerosPlot = []
        for (var i = 0; i < totalPoints; ++i) {
               zerosPlot.push([i, 0]);
          }

        var {id, width, height, options} = this.props;
        $("#"+id).width(width).height(height);
        this.pl = $.plot($("#"+id), [zerosPlot], options);
    },
    componentDidUpdate: function() {
  	// called after the props are updated
        this.renderChart();
    },
    render: function() {
        var {id, label} = this.props;
        return (
            <div className="flot-graph">
                <h3 className="label-graph" >{label}</h3>
                <div id={id} ></div>
            </div>
        );
    }
});


module.exports = FlotGraph;
