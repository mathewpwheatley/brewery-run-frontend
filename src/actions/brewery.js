import endPoints from './endPoints.js'
// Note that dispatch must be passed in from 'connect' when these functions are called

const {breweriesURL, standardOptions} = endPoints

export const getAllBreweries = () => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        fetch(breweriesURL, standardOptions).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS'})
                dispatch({
                    type: 'ALL_BREWERIES',
                    breweries: json
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