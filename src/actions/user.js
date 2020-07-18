const logInURL = "http://localhost:3001/log-in"
const usersURL = "http://localhost:3001/users"

const postFetch = (user, endPoint) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
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

export const logOutUser = () => {
    // Delete cookie from key
    return {
        type: 'LOG_OUT'
    }
}