const baseURL = "https://brewery-run-backend.herokuapp.com"
// const baseURL = "http://localhost:3001"

const endPoints = {
    logInURL: baseURL + "/log_in",
    autoLogInURL: baseURL + "/auto_log_in",
    logOutURL: baseURL + "/log_out",
    usersURL: baseURL + "/users",
    breweriesURL: baseURL + "/breweries",
    breweriesIndexFormURL: baseURL + "/breweries_form_index",
    breweryReviewsURL: baseURL + "/brewery_reviews",
    circuitsURL: baseURL + "/circuits",
    circuitReviewsURL: baseURL + "/circuit_reviews",
    notificationsURL: baseURL + "/notifications",
    followsURL: baseURL + "/follows",
    breweryLikesURL: baseURL + "/brewery_likes",
    circuitLikesURL: baseURL + "/circuit_likes",
    breweryFavoritesURL: baseURL + "/brewery_favorites",
    circuitFavoritesURL: baseURL + "/circuit_favorites"
}

export default endPoints