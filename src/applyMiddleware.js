function applyMiddleware(middlewares) {
    middlewares = ensureArray(middlewares);
    
    return (createStore) => (reducer, preState) => {
        const store = createStore(reducer, preState);

        let dispatch = middlewares.reduce((dispatch, middleware) => {
            return middleware(store)(dispatch);
        }, store.dispatch);

        return Object.assign(store, {
            dispatch
        });
    }
}

function ensureArray(array) {
    if (!Array.isArray(array)) {
        array = [array];
    }

    return array;
}

module.exports = applyMiddleware;