export default (state = {all: []}, action) => {
    
    switch (action.type) {

        case 'ALL_BREWERIES':
            return {...state, all: action.breweries}

        case 'CLEAR_ALL_BREWERIES':
            return {...state, all: []}
        
        default:
            return state
    }
} 