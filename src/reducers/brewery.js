export default (state = {selected: {}, all: []}, action) => {
    
    switch (action.type) {

        case 'BREWERY':
            return {...state, selected: action.selected}
    
        case 'CLEAR_BREWERY':
            return {...state, selected: {}}

        case 'ALL_BREWERIES':
            return {...state, all: action.all}

        case 'CLEAR_ALL_BREWERIES':
            return {...state, all: []}
        
        default:
            return state
    }
} 