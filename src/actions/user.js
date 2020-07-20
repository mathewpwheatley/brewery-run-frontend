import endPoints from './endPoints.js'
// Note that dispatch must be passed in from 'connect' when these functions are called

const {usersURL, logInURL, logOutURL, standardOptions} = endPoints

export const getAllUsers = () => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        fetch(usersURL, standardOptions).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({
                    type: 'ALL_USERS',
                    user: json
                })
            }
        })
    } 
} 

export const getUser = (userId) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        fetch(usersURL + '/' + userId, standardOptions).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({
                    type: 'GET',
                    user: json
                })
            }
        })
    }
}

const postFetch = (user, endPoint) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            ...standardOptions,
            method: 'POST',
            body: JSON.stringify({user: user})
        }
        // Note: The backend is setup to send a signed httponly cookie with a jwt token on this fetch
        fetch(endPoint, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({
                    type: 'LOG_IN',
                    userId: json.id,
                    userName: json.full_name
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

// STILL WORKINNG ON LOG OUT USER!!!
export const logOutUser = () => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
    }
    //
    return {
        type: 'LOG_OUT'
    }
}

export const updateUser = (userId, user) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            ...standardOptions,
            method: 'PATCH',
            body: JSON.stringify({user: user})
        }
        fetch(usersURL + '/' + userId, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({
                    type: 'UPDATE',
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
            method: 'DELETE'
        }
        fetch(usersURL + '/' + userId, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({
                    type: 'DELETE'
                })
            }
        })
    }
}