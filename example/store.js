const loggerMiddleware = require('./loggerMiddleware');
const { createStore, applyMiddleware } = require("../src");

const reducer = require('./reducer');
const store = createStore(reducer, {}, applyMiddleware(loggerMiddleware));

store.subscribe(() => {
    // console.log(store.getState())
});

store.dispatch({
    type: 'OkAction',
    msg: 'ok'
})

module.exports = store;
