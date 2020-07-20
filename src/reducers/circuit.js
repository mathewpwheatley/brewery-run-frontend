export default (state = {all: []}, action) => {
    
    switch (action.type) {

        case 'ALL_CIRCUITS':
            return {...state, all: action.circuits}

        case 'CLEAR_ALL_CIRCUITS':
            return {...state, all: []}
        
        default:
            return state
    }
} 