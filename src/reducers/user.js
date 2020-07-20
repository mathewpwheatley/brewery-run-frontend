export default (state = {loading: false, errors: []}, action) => {

    let newState
    
    switch (action.type) {

        case 'LOADING':
            return {...state, loading: true, errors: []}
        
        case 'ERRORS':
            return {...state, loading: false, errors: action.errors}

        case 'LOG_IN':
            return {...state, loading: false, errors: [], userID: action.userId, userName: action.userName}

        case 'LOG_OUT':
            newState = {...state, loading: false, errors: []}
            delete newState.userId
            delete newState.userName
            return newState
        
        case 'ALL':
            return {...state, loading: false, errors: [], users: action.users}

        case 'CLEAR_ALL':
            newState = {...state, loading: false, errors: []}
            delete newState.users
            return newState

        default:
            return state
    }
} 