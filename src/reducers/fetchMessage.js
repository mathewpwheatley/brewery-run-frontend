export default (state = {loading: false, errors: [], messages: []}, action) => {
    
    switch (action.type) {

        case 'LOADING':
            return {...state, loading: true, errors: [], messages: []}
        
        case 'SET_ERRORS':
            return {...state, loading: false, errors: action.errors}

        case 'SET_MESSAGES':
            return {...state, loading: false, messages: action.messages}

        case 'CLEAR_ERRORS_MESSAGES':
            return {...state, loading: false, errors: [], messages: []}

        default:
            return state
    }
} 