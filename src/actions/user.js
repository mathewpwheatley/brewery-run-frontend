import endPoints from './endPoints.js'
import {standardFetchOptions, fetchErrorsCheck} from './fetchHelper.js'

const {usersURL, logInURL, autoLogInURL, logOutURL} = endPoints

// Note that dispatch must be passed in from 'connect' when these functions are called

export const getUser = (userId) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            ...standardFetchOptions,
            method: 'GET'
        }
        fetch(usersURL + '/' + userId, options).then(resp => resp.json()).then(json => {
            if (!fetchErrorsCheck(dispatch, json)) {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({
                    type: 'SET_USER',
                    selected: json
                })
            }
        })
    }
}

export const clearUser = () => {
    return (dispatch) => {
        dispatch({type: 'CLEAR_USER'})
    }
}

export const getAllUsers = () => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            ...standardFetchOptions,
            method: 'GET'
        }
        fetch(usersURL, options).then(resp => resp.json()).then(json => {
            if (!fetchErrorsCheck(dispatch, json)) {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({
                    type: 'SET_ALL_USERS',
                    all: json
                })
            }
        })
    } 
} 

export const clearAllUsers = () => {
    return (dispatch) => {
        dispatch({type: 'CLEAR_ALL_USERS'})
    }
}

const postFetch = (user, endPoint) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            ...standardFetchOptions,
            method: 'POST',
            body: JSON.stringify({user: user})
        }
        fetch(endPoint, options).then(resp => resp.json()).then(json => {
            if (!fetchErrorsCheck(dispatch, json)) {
                if (json.id) {
                    // Succesful loggin on backend
                    dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                    dispatch({
                        type: 'LOG_IN',
                        id: json.id,
                        name: json.full_name,
                        notifications: json.notifications
                    })
                } else {
                    // Not logged in on backend but no errors (ie. auto log-in did not find valid jwt)
                    dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                }
            }
        })
    }
}

export const createUser = user => {
    return postFetch(user, usersURL)
}

export const logInUser = user => {
    return postFetch(user, logInURL)
}

export const autoLogInUser = () => {
    return postFetch(null, autoLogInURL)
}

export const logOutUser = () => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            ...standardFetchOptions,
            method: 'DELETE'
        }
        fetch(logOutURL, options).then(resp => resp.json()).then(json => {
            if (!fetchErrorsCheck(dispatch, json)) {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({type: 'LOG_OUT'})
            }
        })
    }
}

export const getEditUser = (userId) => {
    return async (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            ...standardFetchOptions,
            method: 'GET'
        }
        await fetch(usersURL + '/' + userId + '/edit', options).then(resp => resp.json()).then(json => {
            if (!fetchErrorsCheck(dispatch, json)) {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({
                    type: 'SET_USER',
                    selected: json
                })
            }
        })
    }
}

export const updateUser = (userId, user) => {
    return async (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            ...standardFetchOptions,
            method: 'PATCH',
            body: JSON.stringify({user: user})
        }
        await fetch(usersURL + '/' + userId, options).then(resp => resp.json()).then(json => {
            if (!fetchErrorsCheck(dispatch, json)) {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({
                    type: 'UPDATE_USER',
                    name: json.full_name,
                    selected: json
                })
            }
        })
    }
}

export const deleteUser = (userId) => {
    return async (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            ...standardFetchOptions,
            method: 'DELETE'
        }
        await fetch(usersURL + '/' + userId, options).then(resp => resp.json()).then(json => {
            if (!fetchErrorsCheck(dispatch, json)) {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({type: 'CLEAR_USER'})
                dispatch({type: 'LOG_OUT'})
            }
        })
    }
}