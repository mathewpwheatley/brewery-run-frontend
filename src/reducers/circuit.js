export default (state = {selected: {}, all: []}, action) => {
    
    switch (action.type) {

        case 'SET_CIRCUIT':
            return {...state, selected: action.selected}
        
        case 'ADD_CIRCUIT_FAVORITE':
            return {...state, selected: {...state.selected,
                active_user_favorite_id: action.favoriteId,
                favorites_count: state.selected.favorites_count + 1
            }}

        case 'SUBTRACT_CIRCUIT_FAVORITE':
            return {...state, selected: {...state.selected,
                active_user_favorite_id: false,
                favorites_count: state.selected.favorites_count - 1
            }}
        
        case 'ADD_CIRCUIT_LIKE':
            return {...state, selected: {...state.selected,
                active_user_like_id: action.likeId,
                likes_count: state.selected.likes_count + 1
            }}

        case 'SUBTRACT_CIRCUIT_LIKE':
            return {...state, selected: {...state.selected,
                active_user_like_id: false,
                likes_count: state.selected.likes_count - 1
            }}

        case 'ADD_CIRCUIT_REVIEW':
            return {...state, selected: {...state.selected,
                reviews: [...state.selected.reviews, action.review],
                reviews_count: state.selected.reviews_count + 1,
                rating: state.selected.reviews_count === 0 ? action.review.rating : (((state.selected.rating * state.selected.reviews_count) + action.review.rating)/(state.selected.reviews_count + 1)).toFixed(2)
            }}

        case 'REMOVE_CIRCUIT_REVIEW':
            let deletedReview = state.selected.reviews.find(review => review.id === action.id)
            return {...state, selected: {...state.selected,
                reviews: [...state.selected.reviews].filter(review => review.id !== action.id),
                reviews_count: state.selected.reviews_count - 1,
                rating: state.selected.reviews_count === 1 ? "N/A" : (((state.selected.rating * state.selected.reviews_count) - deletedReview.rating)/(state.selected.reviews_count - 1)).toFixed(2)
            }}

        case 'TOGGLE_PUBLIC_CIRCUIT':
            return {...state, selected: {...state.selected,
                public: !state.selected.public
            }}

        case 'UPDATE_DISTANCE_ELEVATION_CIRCUIT':
            return {...state, selected: {...state.selected,
                distance: action.selected.distance,
                elevation: action.selected.elevation
            }}
    
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