import endPoints from './endPoints.js'
// Note that dispatch must be passed in from 'connect' when these functions are called

const {usersURL, standardOptions} = endPoints

export const getRunner = (userId) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        fetch(usersURL + '/' + userId, standardOptions).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS'})
                dispatch({
                    type: 'RUNNER',
                    user: json
                })
            }
        })
    }
}

export const clearRunner = () => {
    return (dispatch) => {
        dispatch({type: 'CLEAR_RUNNER'})
    }
}

export const getAllRunners = () => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        fetch(usersURL, standardOptions).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS'})
                dispatch({
                    type: 'ALL_RUNNERS',
                    users: json
                })
            }
        })
    } 
} 

export const clearAllRunners = () => {
    return (dispatch) => {
        dispatch({type: 'CLEAR_ALL_RUNNERS'})
    }
}