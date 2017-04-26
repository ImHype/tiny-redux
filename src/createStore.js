const ActionTypes = {
  INIT: "@@tiny-redux/INIT"
};

function createStore(reducer, initialState, enhancer) {
    let currentState = initialState;
    let isDispatching = false;
    let listeners = [];
    if (!enhancer && typeof initialState === "function") {
        enhancer = initialState;
    }

    if (enhancer) {
        return enhancer(createStore)(reducer, initialState);
    }

    function dispatch(action) {
        if (isDispatching) {
            throw new Error('Reducers may not dispatch actions.')
        }

        isDispatching = true;
        
        currentState = reducer(currentState, action);
        
        isDispatching = false;
        
        listeners.forEach(listener => {
            listener();
        })
    }

    function subscribe(listener) {
        listeners.push(listener);
        let isSubscribed = true;

        return () => {
            if (!isSubscribed) {
                return;
            }

            isSubscribed = true;

            const index = listeners.indexOf(listener)
            listeners.splice(index, 1);
        }
    }

    function getState() {
        return currentState;
    }
    
    dispatch({ type: ActionTypes.INIT })

    return {
        dispatch,
        subscribe,
        getState
    };
}

module.exports = createStore;