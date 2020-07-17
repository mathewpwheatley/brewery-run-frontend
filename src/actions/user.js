export const logIn = user => {
    return {
        type: 'LOG_IN',
        userId: user.id,
        userName: user.full_name
    }
}

export const logOut = () => {
    return {
        type: 'LOG_OUT'
    }
}