import endPoints from './endPoints.js'

const {breweryLikesURL, circuitLikesURL} = endPoints

// Note that dispatch must be passed in from 'connect' when these functions are called

export const createBreweryLike = (userId, breweryId) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({brewery_like: {user_id: userId, brewery_id: breweryId}})
        }
        fetch(breweryLikesURL, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'SET_ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({
                    type: 'ADD_BREWERY_LIKE',
                    likeId: json.id
                })
            }
        })
    }
}

export const createCircuitLike = (userId, circuitId) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({circuit_like: {user_id: userId, circuit_id: circuitId}})
        }
        fetch(circuitLikesURL, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'SET_ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({
                    type: 'ADD_CIRCUIT_LIKE',
                    likeId: json.id
                })
            }
        })
    }
}

export const deleteBreweryLike = (breweryLikeId) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            method: 'DELETE',
            credentials: 'include'
        }
        fetch(breweryLikesURL + "/" + breweryLikeId, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'SET_ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({
                    type: 'SUBTRACT_BREWERY_LIKE'
                })
            }
        })
    }
}

export const deleteCircuitLike = (circuitLikeId) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            method: 'DELETE',
            credentials: 'include'
        }
        fetch(circuitLikesURL + "/" + circuitLikeId, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'SET_ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({
                    type: 'SUBTRACT_CIRCUIT_LIKE'
                })
            }
        })
    }
}