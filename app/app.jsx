var React = require('react');
var ReactDOM = require('react-dom');
//var {Provider} = require('react-redux');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var DemoApp = require("DemoApp");
/*
var actions = require('actions');
var store = require('configureStore').configure();

store.subscribe(() => {
    console.log('New state', store.getState());
});

store.dispatch(actions.selectUser("Priscila"))
*/
// Load foundation
$(document).ready( function () {
    $(document).foundation();
});

// App css
require('style!css!sass!applicationStyles');


ReactDOM.render(
    //<Provider store={store}>
        <DemoApp />,
    //</Provider>,

    //<h1>CardioID Demo App</h1>,
    document.getElementById('app')
);
