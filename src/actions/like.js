import endPoints from './endPoints.js'
import {standardFetchOptions, fetchErrorsCheck} from './fetchHelper.js'

const {breweryLikesURL, circuitLikesURL} = endPoints

// Note that dispatch must be passed in from 'connect' when these functions are called

export const createLike = (userId, subjectId, variant) => {
    return (dispatch) => {
        // Set loading via dispatch
        dispatch({type: 'LOADING'})
        // Setup fetch options & url
        let body
        let fetchURL
        let dispatchType
        switch (variant) {
            case "brewery": 
                body = JSON.stringify({brewery_like: {user_id: userId, brewery_id: subjectId}})
                fetchURL = breweryLikesURL
                dispatchType = 'ADD_BREWERY_LIKE'
                break
            case "circuit":
                body = JSON.stringify({circuit_like: {user_id: userId, circuit_id: subjectId}})
                fetchURL = circuitLikesURL
                dispatchType = 'ADD_CIRCUIT_LIKE'
                break
            default:
                break
        }
        const options = {
            ...standardFetchOptions,
            method: 'POST',
            body: body   
        }
        // Fetch request
        fetch(fetchURL, options).then(resp => resp.json()).then(json => {
            // Error checking/handling
            if (!fetchErrorsCheck(dispatch, json)) {
                // Update redux state to update webpage
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({
                    type: dispatchType,
                    likeId: json.id
                })
            }
        })
    }
}

export const deleteLike = (likeId, variant) => {
    return (dispatch) => {
        // Set loading via dispatch
        dispatch({type: 'LOADING'})
        // Setup fetch options & url
        let fetchURL
        let dispatchType
        switch (variant) {
            case "brewery": 
                fetchURL = breweryLikesURL
                dispatchType = 'SUBTRACT_BREWERY_LIKE'
                break
            case "circuit":
                fetchURL = circuitLikesURL
                dispatchType = 'SUBTRACT_CIRCUIT_LIKE'
                break
            default:
                break
        }
        const options = {
            ...standardFetchOptions,
            method: 'DELETE',
        }
        // Fetch request
        fetch(fetchURL + "/" + likeId, options).then(resp => resp.json()).then(json => {
            // Error checking/handling
            if (!fetchErrorsCheck(dispatch, json)) {
                // Update redux state to update webpage
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({type: dispatchType})
            }
        })
    }
}