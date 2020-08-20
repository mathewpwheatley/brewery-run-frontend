export const standardFetchOptions = {
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}

export const fetchErrorsCheck = (dispatch, json) => {
    if (json.errors) {
        dispatch({
            type: 'SET_ERRORS',
            errors: json.errors
        })
        return true
    } else {
        return false
    }
}