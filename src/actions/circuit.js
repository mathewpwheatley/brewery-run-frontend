import endPoints from './endPoints.js'
import {standardFetchOptions, fetchErrorsCheck} from './fetchHelper.js'

const {circuitsURL, circuitsUpdateDistanceElevationURL} = endPoints

// Note that dispatch must be passed in from 'connect' when these functions are called

export const createCircuit = (circuit) => {
    return async (dispatch) => {
        const options = {
            ...standardFetchOptions,
            method: 'POST',
            body: JSON.stringify({circuit: circuit})
        }
        await fetch(circuitsURL, options).then(resp => resp.json()).then(json => {
            if (!fetchErrorsCheck(dispatch, json)) {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({
                    type: 'ADD_CIRCUIT',
                    circuit: json
                })
            }
        })
    }
}

export const getCircuit = (circuitId) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            ...standardFetchOptions,
            method: 'GET'
        }
        fetch(circuitsURL + '/' + circuitId, options).then(resp => resp.json()).then(json => {
            if (!fetchErrorsCheck(dispatch, json)) {
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
            ...standardFetchOptions,
            method: 'GET'
        }
        fetch(circuitsURL, options).then(resp => resp.json()).then(json => {
            if (!fetchErrorsCheck(dispatch, json)) {
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
            ...standardFetchOptions,
            method: 'DELETE'
        }
        fetch(circuitsURL + "/" + circuitId, options).then(resp => resp.json()).then(json => {
            if (!fetchErrorsCheck(dispatch, json)) {
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
            ...standardFetchOptions,
            method: 'PATCH',
            body: JSON.stringify({public: status})
        }
        fetch(circuitsURL + "/" + circuitId, options).then(resp => resp.json()).then(json => {
            if (!fetchErrorsCheck(dispatch, json)) {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({type: 'TOGGLE_PUBLIC_CIRCUIT'})
            }
        })
    }
}

export const updateDistanceElevationCircuit = (circuitId, distance, elevation) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            ...standardFetchOptions,
            method: 'PATCH',
            body: JSON.stringify({distance: distance, elevation: elevation})
        }
        fetch(circuitsUpdateDistanceElevationURL + "/" + circuitId, options).then(resp => resp.json()).then(json => {
            if (!fetchErrorsCheck(dispatch, json)) {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({
                    type: 'UPDATE_DISTANCE_ELEVATION_CIRCUIT',
                    selected: json
                })
            }
        })
    }
}

export const addCircuitLegs = (circuit_legs) => {
    return (dispatch) => {
        dispatch({
            type: 'ADD_CIRCUIT_LEGS',
            legs: circuit_legs
        })
    }
}