export default (state = {runner: {}, all: []}, action) => {
    
    switch (action.type) {

        case 'RUNNER':
            return {...state, user: action.user}
    
        case 'CLEAR_RUNNER':
            return {...state, user: {}}
        
        case 'ALL_RUNNERS':
            return {...state, all: action.users}

        case 'CLEAR_ALL_RUNNERS':
            return {...state, all: []}
        
        default:
            return state
    }
} 