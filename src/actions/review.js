import endPoints from './endPoints.js'

const {breweryReviewsURL, circuitReviewsURL} = endPoints

// Note that dispatch must be passed in from 'connect' when these functions are called

// export const getBreweryReview = (reviewId) => {
//     return (dispatch) => {
//         dispatch({type: 'LOADING'})
//         const options = {
//             method: 'GET',
//             credentials: 'include',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             }
//         }
//         fetch(breweryReviewsURL + '/' + reviewId, options).then(resp => resp.json()).then(json => {
//             if (json.errors) {
//                 dispatch({
//                     type: 'SET_ERRORS',
//                     errors: json.errors
//                 })
//             } else {
//                 dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
//                 dispatch({
//                     type: 'SET_REVIEW',
//                     selected: json
//                 })
//             }
//         })
//     }
// }

// export const getCircuitReview = (reviewId) => {
//     return (dispatch) => {
//         dispatch({type: 'LOADING'})
//         const options = {
//             method: 'GET',
//             credentials: 'include',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             }
//         }
//         fetch(circuitReviewsURL + '/' + reviewId, options).then(resp => resp.json()).then(json => {
//             if (json.errors) {
//                 dispatch({
//                     type: 'SET_ERRORS',
//                     errors: json.errors
//                 })
//             } else {
//                 dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
//                 dispatch({
//                     type: 'SET_REVIEW',
//                     selected: json
//                 })
//             }
//         })
//     }
// }

export const clearReview = () => {
    return (dispatch) => {
        dispatch({type: 'CLEAR_REVIEW'})
    }
}

export const createBreweryReview = (review) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({brewery_review: review})
        }
        fetch(breweryReviewsURL, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'SET_ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({
                    type: 'ADD_BREWERY_REVIEW',
                    review: json
                })
            }
        })
    }
}

export const createCircuitReview = (review) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({circuit_review: review})
        }
        fetch(circuitReviewsURL, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'SET_ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({
                    type: 'ADD_CIRCUIT_REVIEW',
                    review: json
                })
            }
        })
    }
}

export const deleteBreweryReview = (reviewId) => {
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
        fetch(breweryReviewsURL + "/" + reviewId, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'SET_ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({
                    type: 'REMOVE_BREWERY_REVIEW',
                    id: reviewId
                })
            }
        })
    }
}

export const deleteCircuitReview = (reviewId) => {
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
        fetch(circuitReviewsURL + "/" + reviewId, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'SET_ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({
                    type: 'REMOVE_CIRCUIT_REVIEW',
                    id: reviewId
                })
            }
        })
    }
}