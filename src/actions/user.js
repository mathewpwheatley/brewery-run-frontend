import endPoints from './endPoints.js'
// Note that dispatch must be passed in from 'connect' when these functions are called

const {usersURL, logInURL, logOutURL} = endPoints

// This function should be handled by the runner actions 

export const getUser = (userId) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        fetch(usersURL + '/' + userId, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS'})
                dispatch({
                    type: 'USER',
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
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        fetch(usersURL, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS'})
                dispatch({
                    type: 'ALL_USERS',
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
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({user: user})
        }
        fetch(endPoint, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS'})
                dispatch({
                    type: 'LOG_IN',
                    id: json.id,
                    name: json.full_name
                })
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

export const logOutUser = () => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            method: 'DELETE',
            credentials: 'include'
        }
        fetch(logOutURL, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS'})
                dispatch({type: 'LOG_OUT'})
            }
        })
    }
}

export const updateUser = (userId, user) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Credentials': 'include'
            },
            body: JSON.stringify({user: user})
        }
        fetch(usersURL + '/' + userId, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS'})
                dispatch({
                    type: 'UPDATE_USER',
                    user: json
                })
            }
        })
    }
}

export const deleteUser = (userId) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            method: 'DELETE',
            credentials: 'include'
        }
        fetch(usersURL + '/' + userId, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS'})
                dispatch({type: 'DELETE_USER'})
            }
        })
    }
}