function logger ({getState}){
     return (next) => (action) => {
        console.log('preAction', action);
        console.log('preState', getState());
        
        next(action);

        console.log('preAction', action);
        console.log('preState', getState());
        return
    };
}

module.exports = logger;