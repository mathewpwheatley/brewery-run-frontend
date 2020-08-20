import endPoints from './endPoints.js'
import {standardFetchOptions, fetchErrorsCheck} from './fetchHelper.js'

const {followsURL} = endPoints

// Note that dispatch must be passed in from 'connect' when these functions are called

export const createFollow = (followeeId, followerId) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            ...standardFetchOptions,
            method: 'POST',
            body: JSON.stringify({follow: {followee_id: followeeId, follower_id: followerId}})
        }
        fetch(followsURL, options).then(resp => resp.json()).then(json => {
            if (!fetchErrorsCheck(dispatch, json)) {
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
            ...standardFetchOptions,
            method: 'DELETE'
        }
        fetch(followsURL + "/" + followId, options).then(resp => resp.json()).then(json => {
            if (!fetchErrorsCheck(dispatch, json)) {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({type: 'SUBTRACT_FOLLOW'})
            }
        })
    }
}