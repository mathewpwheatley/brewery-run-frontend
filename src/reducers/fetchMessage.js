export default (state = {loading: false, errors: []}, action) => {
    
    switch (action.type) {

        case 'LOADING':
            return {...state, loading: true, errors: []}
        
        case 'ERRORS':
            return {...state, loading: false, errors: action.errors}

        case 'CLEAR_ERRORS':
            return {...state, loading: false, errors: []}

        default:
            return state
    }
} 