export default (state = {id: '', name: '', all: []}, action) => {
    
    switch (action.type) {

        case 'LOG_IN':
            return {...state, id: action.id, name: action.name}

        case 'LOG_OUT':
            return {...state, id: '', name: ''}
        
        case 'ALL_USERS':
            return {...state, all: action.users}

        case 'CLEAR_ALL_USERS':
            return {...state, all: []}

        default:
            return state
    }
} 