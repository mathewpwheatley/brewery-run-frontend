import endPoints from './endPoints.js'
// Note that dispatch must be passed in from 'connect' when these functions are called

const {breweryReviewsURL, circuitReviewsURL} = endPoints

export const getReview = (variant, reviewId) => {

    const getURL = () => {
        switch (variant) {
            case 'brewery':
                return breweryReviewsURL
            case 'circuit':
                return circuitReviewsURL
            default:
                break
        }
    }

    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Credentials': 'include'
            }
        }
        fetch(getURL + '/' + reviewId, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS'})
                dispatch({
                    type: 'SET_REVIEW',
                    selected: json
                })
            }
        })
    }
}

export const clearBrewery = () => {
    return (dispatch) => {
        dispatch({type: 'CLEAR_REVIEW'})
    }
}