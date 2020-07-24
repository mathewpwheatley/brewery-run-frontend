import endPoints from './endPoints.js'

const {circuitsURL} = endPoints

// Note that dispatch must be passed in from 'connect' when these functions are called

export const getCircuit = (circuitId) => {
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
        fetch(circuitsURL + '/' + circuitId, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'SET_ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({
                    type: 'SET_CIRCUIT',
                    selected: json
                })
            }
        })
    }
}

export const clearCircuit = () => {
    return (dispatch) => {
        dispatch({type: 'CLEAR_CIRCUIT'})
    }
}

export const getAllCircuits = () => {
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
        fetch(circuitsURL, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'SET_ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({
                    type: 'SET_ALL_CIRCUITS',
                    all: json
                })
            }
        })
    } 
} 

export const clearAllCircuits = () => {
    return (dispatch) => {
        dispatch({type: 'CLEAR_ALL_CIRCUITS'})
    }
}