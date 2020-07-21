export default (state = {user: {}, all: []}, action) => {
    
    switch (action.type) {

        case 'LOG_IN':
            return {...state, id: action.id, name: action.name}

        case 'LOG_OUT':
            let newState = {...state}
            delete newState.id
            delete newState.name
            return newState
        
        case 'ALL_USERS':
            return {...state, all: action.users}

        case 'CLEAR_ALL_USERS':
            return {...state, all: []}
        
        case 'USER':
        return {...state, user: action.user}

        case 'CLEAR_USER':
        return {...state, user: {}}

        default:
            return state
    }
} 