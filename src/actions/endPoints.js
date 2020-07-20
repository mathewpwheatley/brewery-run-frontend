const baseURL = "http://localhost:3001"

const endPoints = {
    logInURL: baseURL + "/log-in",
    logOutURL: baseURL + "/log-out",
    usersURL: baseURL + "/users",
    breweriesURL: baseURL + "/breweries",
    circuitsURL: baseURL + "/circuits",
    standardOptions: {
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
}

export default endPoints