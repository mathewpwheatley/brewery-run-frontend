export default (state = {}, action) => {
    
    switch (action.type) {

        case 'LOG_IN':
            return {...state, userID: action.userId, userName: action.userName}

        case 'LOG_OUT':
            const newState = {...state}
            delete newState.userId
            delete newState.userName
            return newState
        
        default:
            return state
    }
} 