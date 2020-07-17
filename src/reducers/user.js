export default (state = {}, action) => {
    
    switch (action.type) {

        case 'LOG_IN':
            console.log("in reducer")
            state.userId = action.userId
            state.userName = action.userName
            return state

        case 'LOG_OUT':
            state = {}
            return state
        
        default:
            return state
    }
} 