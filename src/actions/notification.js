import endPoints from './endPoints.js'
import {standardFetchOptions, fetchErrorsCheck} from './fetchHelper.js'

const {notificationsURL} = endPoints

// Note that dispatch must be passed in from 'connect' when these functions are called

export const markReadNotification = (notificationId) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            ...standardFetchOptions,
            method: 'PATCH',
            body: JSON.stringify({notification: {read: true}})
        }
        fetch(notificationsURL + "/" + notificationId, options).then(resp => resp.json()).then(json => {
            if (!fetchErrorsCheck(dispatch, json)) {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({
                    type: 'MARK_READ_NOTIFICATION',
                    id: json.id,
                    notification: json
                })
            }
        })
    }
}

export const deleteNotification = (notificationId) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            ...standardFetchOptions,
            method: 'DELETE'
        }
        fetch(notificationsURL + "/" + notificationId, options).then(resp => resp.json()).then(json => {
            if (!fetchErrorsCheck(dispatch, json)) {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({
                    type: 'REMOVE_NOTIFICATION',
                    id: notificationId
                })
            }
        })
    }
}