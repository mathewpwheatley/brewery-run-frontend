export const logIn = user => {
    return {
        type: 'LOG_IN',
        userId: user.id,
        userName: user.name
    }
}

export const logOut = () => {
    return {
        type: 'LOG_OUT'
    }
}