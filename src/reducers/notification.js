export default (state = {all: []}, action) => {
    
    switch (action.type) {

        case 'LOG_IN':
            return {...state, all: action.notifications}

        case 'LOG_OUT':
            return {...state, all: []}

        case 'MARK_READ_NOTIFICATION':
            return {...state, all: [...state.all].map(one => {
                if (one.id === action.id) {
                    return action.notification
                } else {
                    return one
                }
            })}

        case 'REMOVE_NOTIFICATION':
            return {...state, all: [...state.all].filter(one => one.id !== action.id)}

        default:
            return state
    }
} 