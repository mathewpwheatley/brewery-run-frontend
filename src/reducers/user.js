export default (state = {selected: {}, all: []}, action) => {
    
    switch (action.type) {

        case 'LOG_IN':
            return {...state, id: action.id, name: action.name}

        case 'LOG_OUT':
            let newState = {...state}
            delete newState.id
            delete newState.name
            return newState

        case 'USER':
            return {...state, selected: action.selected}
    
        case 'CLEAR_USER':
            return {...state, selected: {}}
        
        case 'ALL_USERS':
            return {...state, all: action.all}

        case 'CLEAR_ALL_USERS':
            return {...state, all: []}

        default:
            return state
    }
} 