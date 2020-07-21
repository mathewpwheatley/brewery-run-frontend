export default (state = {count: 0, all: []}, action) => {
    
    switch (action.type) {

        case 'LOG_IN':
            return {...state, count: action.notifications_count}

        case 'LOG_OUT':
            return {...state, count: 0}

        default:
            return state
    }
} 