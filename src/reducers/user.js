export default (state = {loading: false, errors: []}, action) => {
    
    switch (action.type) {

        case 'LOADING':
            return {...state, loading: true, errors: []}
        
        case 'ERRORS':
            return {...state, loading: false, errors: action.errors}

        case 'LOG_IN':
            return {...state, loading: false, errors: [], userID: action.userId, userName: action.userName}

        case 'LOG_OUT':
            const newState = {...state}
            delete newState.userId
            delete newState.userName
            return newState
        
        default:
            return state
    }
} 