const endPoints = () => {
    const baseURL = "http://localhost:3001"
    const logInURL = baseURL + "/log-in"
    const logOutURL = baseURL + "/log-out"
    const usersURL = baseURL + "/users" 
    const breweriesURL = baseURL + "/breweries" 
    const circuitsURL = baseURL + "/circuits" 
    
    return {baseURL, logInURL, usersURL, breweriesURL, circuitsURL}
}

export default endPoints