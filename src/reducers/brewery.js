export default (state = {loading: false, errors: []}, action) => {
    
    switch (action.type) {

        case 'LOADING':
            return {...state, loading: true, errors: []}
        
        case 'ERRORS':
            return {...state, loading: false, errors: action.errors}

        case 'ALL':
            return {...state, loading: false, errors: [], breweries: action.breweries}

        case 'CLEAR_ALL':
            const newState = {...state, loading: false, errors: []}
            delete newState.breweries
            return newState
        
        default:
            return state
    }
} 