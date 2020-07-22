export default (state = {selected: {}}, action) => {
    
    switch (action.type) {

        case 'SET_REVIEW':
            return {...state, selected: action.selected}
    
        case 'CLEAR_REVIEW':
            return {...state, selected: {}}

        
        default:
            return state
    }
} 