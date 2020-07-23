export default (state = {selected: {}, all: []}, action) => {
    
    switch (action.type) {

        case 'SET_BREWERY':
            return {...state, selected: action.selected}

        case 'ADD_BREWERY_REVIEW':
            return {...state, selected: {...state.selected, reviews: [...state.selected.reviews, action.review]}}

        case 'REMOVE_BREWERY_REVIEW':
            return {...state, selected: {...state.selected, reviews: [...state.selected.reviews].filter(review => review.id !== action.id)}}
    
        case 'CLEAR_BREWERY':
            return {...state, selected: {}}

        case 'SET_ALL_BREWERIES':
            return {...state, all: action.all}

        case 'CLEAR_ALL_BREWERIES':
            return {...state, all: []}
        
        default:
            return state
    }
} 