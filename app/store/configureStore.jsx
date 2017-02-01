var redux = require('redux');
var {userReducer} = require("reducers");

export var configure = (initialState = {}) => {
    var reducer = redux.combineReducers({
        userName: userReducer,
    });

    var store = redux.createStore(reducer, initialState, redux.compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

    return store;
};
