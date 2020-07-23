export default (state = {selected: {}, all: []}, action) => {
    
    switch (action.type) {

        case 'SET_CIRCUIT':
            return {...state, selected: action.selected}

        case 'ADD_CIRCUIT_REVIEW':
            return {...state, selected: {...state.selected, reviews: [...state.selected.reviews, action.review]}}

        case 'REMOVE_CIRCUIT_REVIEW':
            return {...state, selected: {...state.selected, reviews: [...state.selected.reviews].filter(review => review.id !== action.id)}}
    
        case 'CLEAR_CIRCUIT':
            return {...state, selected: {}}

        case 'SET_ALL_CIRCUITS':
            return {...state, all: action.all}

        case 'CLEAR_ALL_CIRCUITS':
            return {...state, all: []}
        
        default:
            return state
    }
} 