function reducer(initialState = {}, action) {
    return Object.assign(initialState, action);
}

module.exports = reducer;