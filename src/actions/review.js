import endPoints from './endPoints.js'
import {standardFetchOptions, fetchErrorsCheck} from './fetchHelper.js'

const {breweryReviewsURL, circuitReviewsURL} = endPoints

// Note that dispatch must be passed in from 'connect' when these functions are called

export const createReview = (review, variant) => {
    return async (dispatch) => {
        // Set loading via dispatch
        dispatch({type: 'LOADING'})
        // Setup fetch options & url
        let body
        let fetchURL
        let dispatchType
        switch (variant) {
            case "brewery-reviews": 
                body = JSON.stringify({brewery_review: review})
                fetchURL = breweryReviewsURL
                dispatchType = 'ADD_BREWERY_REVIEW'
                break
            case "circuit-reviews":
                body = JSON.stringify({circuit_review: review})
                fetchURL = circuitReviewsURL
                dispatchType = 'ADD_CIRCUIT_REVIEW'
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
        await fetch(fetchURL, options).then(resp => resp.json()).then(json => {
            if (!fetchErrorsCheck(dispatch, json)) {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({
                    type: dispatchType,
                    review: json
                })
            }
        })
    }
}

export const deleteReview = (reviewId, variant) => {
    return (dispatch) => {
        // Set loading via dispatch
        dispatch({type: 'LOADING'})
        // Setup fetch options & url
        let fetchURL
        let dispatchType
        switch (variant) {
            case "brewery-reviews": 
                fetchURL = breweryReviewsURL
                dispatchType = 'REMOVE_BREWERY_REVIEW'
                break
            case "circuit-reviews":
                fetchURL = circuitReviewsURL
                dispatchType = 'REMOVE_CIRCUIT_REVIEW'
                break
            default:
                break
        }
        const options = {
            ...standardFetchOptions,
            method: 'DELETE'
        }
        // Fetch request
        fetch(fetchURL + "/" + reviewId, options).then(resp => resp.json()).then(json => {
            if (!fetchErrorsCheck(dispatch, json)) {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({
                    type: dispatchType,
                    id: reviewId
                })
            }
        })
    }
}