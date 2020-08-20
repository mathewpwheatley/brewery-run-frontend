import endPoints from './endPoints.js'
import {standardFetchOptions, fetchErrorsCheck} from './fetchHelper.js'

const {breweryFavoritesURL, circuitFavoritesURL} = endPoints

// Note that dispatch must be passed in from 'connect' when these functions are called

export const createFavorite = (userId, subjectId, variant) => {
    return (dispatch) => {
        // Set loading via dispatch
        dispatch({type: 'LOADING'})
        // Setup fetch options & url
        let body
        let fetchURL
        let dispatchType
        switch (variant) {
            case "brewery": 
                body = JSON.stringify({brewery_favorite: {user_id: userId, brewery_id: subjectId}})
                fetchURL = breweryFavoritesURL
                dispatchType = 'ADD_BREWERY_FAVORITE'
                break
            case "circuit":
                body = JSON.stringify({circuit_favorite: {user_id: userId, circuit_id: subjectId}})
                fetchURL = circuitFavoritesURL
                dispatchType = 'ADD_CIRCUIT_FAVORITE'
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
                    favoriteId: json.id
                })
            }
        })
    }
}

export const deleteFavorite = (favoriteId, variant) => {
    return (dispatch) => {
        // Set loading via dispatch
        dispatch({type: 'LOADING'})
        // Setup fetch options & url
        let fetchURL
        let dispatchType
        switch (variant) {
            case "brewery": 
                fetchURL = breweryFavoritesURL
                dispatchType = 'SUBTRACT_BREWERY_FAVORITE'
                break
            case "circuit":
                fetchURL = circuitFavoritesURL
                dispatchType = 'SUBTRACT_CIRCUIT_FAVORITE'
                break
            default:
                break
        }
        const options = {
            ...standardFetchOptions,
            method: 'DELETE',
        }
        // Fetch request
        fetch(fetchURL + "/" + favoriteId, options).then(resp => resp.json()).then(json => {
            // Error checking/handling
            if (!fetchErrorsCheck(dispatch, json)) {
                // Update redux state to update webpage
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({type: dispatchType})
            }
        })
    }
}