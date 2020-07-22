import endPoints from './endPoints.js'
// Note that dispatch must be passed in from 'connect' when these functions are called

const {circuitsURL} = endPoints

export const getCircuit = (circuitId) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Credentials': 'include'
            }
        }
        fetch(circuitsURL + '/' + circuitId, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS'})
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
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        fetch(circuitsURL, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS'})
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