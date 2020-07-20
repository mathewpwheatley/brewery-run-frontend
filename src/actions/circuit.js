import endPoints from './endPoints.js'
// Note that dispatch must be passed in from 'connect' when these functions are called

const {circuitsURL, standardOptions} = endPoints

export const getAllCircuits = () => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        fetch(circuitsURL, standardOptions).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS'})
                dispatch({
                    type: 'ALL_CIRCUITS',
                    circuits: json
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