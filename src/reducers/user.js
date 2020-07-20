export default (state = {all: []}, action) => {

    let newState
    
    switch (action.type) {

        case 'LOG_IN':
            return {...state, userID: action.userId, userName: action.userName}

        case 'LOG_OUT':
            newState = {...state}
            delete newState.userId
            delete newState.userName
            return newState
        
        case 'ALL_USERS':
            return {...state, all: action.users}

        case 'CLEAR_ALL_USERS':
            return {...state, all: []}

        default:
            return state
    }
} 