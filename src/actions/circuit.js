import endPoints from './endPoints.js'

const {circuitsURL} = endPoints

// Note that dispatch must be passed in from 'connect' when these functions are called

export const createCircuit = (circuit) => {
    return (dispatch) => {
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({circuit: circuit})
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
                    type: 'SET_CIRCUIT',
                    selected: json
                })
            }
        })
    }
}

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

export const deleteCircuit = (circuitId) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        fetch(circuitsURL + "/" + circuitId, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'SET_ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({type: 'CLEAR_CIRCUIT'})
            }
        })
    }
}

export const togglePublicCircuit = (circuitId, status) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({public: status})
        }
        fetch(circuitsURL + "/" + circuitId, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'SET_ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({type: 'TOGGLE_PUBLIC_CIRCUIT'})
            }
        })
    }
}