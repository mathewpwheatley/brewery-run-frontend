export default (state = {selected: {}, all: []}, action) => {
    
    switch (action.type) {

        case 'CIRCUIT':
            return {...state, selected: action.selected}
    
        case 'CLEAR_CIRCUIT':
            return {...state, selected: {}}

        case 'ALL_CIRCUITS':
            return {...state, all: action.all}

        case 'CLEAR_ALL_CIRCUITS':
            return {...state, all: []}
        
        default:
            return state
    }
} 