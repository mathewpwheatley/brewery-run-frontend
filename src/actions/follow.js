import endPoints from './endPoints.js'

const {followsURL} = endPoints

// Note that dispatch must be passed in from 'connect' when these functions are called

export const createFollow = (followeeId, followerId) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({follow: {followee_id: followeeId, follower_id: followerId}})
        }
        fetch(followsURL, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'SET_ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({
                    type: 'ADD_FOLLOW',
                    followId: json.id
                })
            }
        })
    }
}

export const deleteFollow = (followId) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            method: 'DELETE',
            credentials: 'include'
        }
        fetch(followsURL + "/" + followId, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'SET_ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({
                    type: 'REMOVE_FOLLOW'
                })
            }
        })
    }
}