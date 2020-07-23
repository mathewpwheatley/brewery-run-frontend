import endPoints from './endPoints.js'
// Note that dispatch must be passed in from 'connect' when these functions are called

const {breweriesURL} = endPoints

export const getBrewery = (breweryId) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        fetch(breweriesURL + '/' + breweryId, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'SET_ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS'})
                dispatch({
                    type: 'SET_BREWERY',
                    selected: json
                })
            }
        })
    }
}

export const clearBrewery = () => {
    return (dispatch) => {
        dispatch({type: 'CLEAR_BREWERY'})
    }
}

export const getAllBreweries = () => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        fetch(breweriesURL, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'SET_ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS'})
                dispatch({
                    type: 'SET_ALL_BREWERIES',
                    all: json
                })
            }
        })
    } 
} 

export const clearAllBreweries = () => {
    return (dispatch) => {
        dispatch({type: 'CLEAR_ALL_BREWERIES'})
    }
}