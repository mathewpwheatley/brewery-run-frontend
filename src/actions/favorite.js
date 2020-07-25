import endPoints from './endPoints.js'

const {breweryFavoritesURL, circuitFavoritesURL} = endPoints

// Note that dispatch must be passed in from 'connect' when these functions are called

export const createBreweryFavorite = (userId, breweryId) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({brewery_favorite: {user_id: userId, brewery_id: breweryId}})
        }
        fetch(breweryFavoritesURL, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'SET_ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({
                    type: 'ADD_BREWERY_FAVORITE',
                    favoriteId: json.id
                })
            }
        })
    }
}

export const createCircuitFavorite = (userId, circuitId) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({circuit_favorite: {user_id: userId, circuit_id: circuitId}})
        }
        fetch(circuitFavoritesURL, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'SET_ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({
                    type: 'ADD_CIRCUIT_FAVORITE',
                    favoriteId: json.id
                })
            }
        })
    }
}

export const deleteBreweryFavorite = (breweryFavoriteId) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            method: 'DELETE',
            credentials: 'include'
        }
        fetch(breweryFavoritesURL + "/" + breweryFavoriteId, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'SET_ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({
                    type: 'SUBTRACT_BREWERY_FAVORITE'
                })
            }
        })
    }
}

export const deleteCircuitFavorite = (circuitFavoriteId) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            method: 'DELETE',
            credentials: 'include'
        }
        fetch(circuitFavoritesURL + "/" + circuitFavoriteId, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'SET_ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({
                    type: 'SUBTRACT_CIRCUIT_FAVORITE'
                })
            }
        })
    }
}