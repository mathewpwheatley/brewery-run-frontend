export default (state = {selected: {}, all: []}, action) => {
    
    switch (action.type) {

        case 'LOG_IN':
            return {...state, id: action.id, name: action.name}

        case 'LOG_OUT':
            let newState = {...state}
            delete newState.id
            delete newState.name
            return newState

        case 'SET_USER':
            return {...state, selected: action.selected}
    
        case 'CLEAR_USER':
            return {...state, selected: {}}

        case 'UPDATE_USER':
            return {...state, name: action.name, selected: action.selected}

        case 'ADD_FOLLOW':
            return {...state, selected: {...state.selected,
                active_user_follow_id: action.followId,
                followers_count: state.selected.followers_count + 1
            }}

        case 'SUBTRACT_FOLLOW':
            return {...state, selected: {...state.selected,
                active_user_follow_id: false,
                followers_count: state.selected.followers_count - 1
            }}

        case 'ADD_CIRCUIT':
            if (action.circuit.public) {
                return {...state, selected: {...state.selected,
                    public_circuits: [...state.selected.public_circuits, action.circuit]
                }}
            } else {
                return {...state, selected: {...state.selected,
                    private_circuits: [...state.selected.private_circuits, action.circuit]
                }}
            }
        
        case 'SET_ALL_USERS':
            return {...state, all: action.all}

        case 'CLEAR_ALL_USERS':
            return {...state, all: []}

        default:
            return state
    }
} 