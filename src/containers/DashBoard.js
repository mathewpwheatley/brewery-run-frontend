import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {Container, CardDeck, Card, Button} from 'react-bootstrap'
import {getUser} from '../actions/user.js'
import FetchMessage from '../components/FetchMessage.js'
import CommonNavigationBar from '../components/CommonNavigationBar.js'
import CommonCard from './CommonCard.js'
import Reviews from './Reviews.js'
import CreateCircuit from './CreateCircuit.js'
import RatingStars from '../components/RatingStars.js'

class Dashboard extends Component {

    componentDidMount() {
        this.props.getUser(this.props.userId)
    }

    render () {
        const user = this.props.user

        return (
            <Container className="col-10 mt-4">

                {/* Redirect to root if user is not logged in */}
                {!this.props.userId && <Redirect to="/" />}

                <FetchMessage/>

                <CardDeck className="mb-4">
                    <Card className="col-5 px-0">
                        <CommonNavigationBar
                            variant="user"
                            navSubTitle={": " + user.full_name}
                            showSearch={false}
                        />
                        <Card.Body>
                            <Card.Title>{user.full_name}</Card.Title>
                            <Card.Text>About: {user.about}</Card.Text>
                            <Card.Text>Email: {user.email}</Card.Text>
                            <Card.Text>Address: {user.full_address}</Card.Text>
                            <Link to="/edit-user">
                                <Button variant="secondary" type="button" title="Edit User">
                                    <i className="fas fa-user-edit"/>
                                    <span className="d-none d-sm-none d-md-inline"> Edit Account</span>
                                </Button>
                            </Link>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header>Statistics</Card.Header>
                        <Card.Body>
                            <Card.Text>Created Circuits: {user.circuits_count} (Public: {user.public_circuits_count})</Card.Text>
                            <Card.Text>Public Circuits Average Rating: <RatingStars rating={user.public_circuits_avg_rating} /></Card.Text>
                            <Card.Text>Favorite Circuits: {user.favorite_circuits_count}</Card.Text>
                            <Card.Text>Circuit Reviews Written: {user.circuit_reviews_count}</Card.Text>
                            <Card.Text>Favorite Breweries: {user.favorite_breweries_count}</Card.Text>
                            <Card.Text>Brewery Reviews Written: {user.brewery_reviews_count}</Card.Text>
                            <Card.Text>Followers: {user.followers_count}</Card.Text>
                            <Card.Text>Following: {user.following_count}</Card.Text>
                        </Card.Body>
                    </Card>
                </CardDeck>

                <CreateCircuit/>

                <CardDeck className="mb-4">
                    <Card>
                        <Card.Header>Recommeded Circuits (Most Likes)</Card.Header>
                        <Card.Body>
                            <Card.Text>TBD</Card.Text>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header>Recommeded Circuits (Most Favorites)</Card.Header>
                        <Card.Body>
                            <Card.Text>TBD</Card.Text>
                        </Card.Body>
                    </Card>
                </CardDeck>

                {(!!user.favorite_breweries && user.favorite_breweries.length > 0) &&
                    <CommonCard variant='breweries' navSubTitle=': Favorite' data={user.favorite_breweries} />
                }

                <CardDeck className="mb-4">
                    {(!!user.public_followees_circuits && user.public_followees_circuits.length > 0) &&
                        <CommonCard variant='circuits' navSubTitle=' from Followees' data={user.public_followees_circuits} />
                    }

                    {(!!user.favorite_circuits && user.favorite_circuits.length > 0) &&
                        <CommonCard variant='circuits' navSubTitle=': Favorite' data={user.favorite_circuits} />
                    }
                </CardDeck>

                <CardDeck className="mb-4">
                    {(!!user.private_circuits && user.private_circuits.length > 0) &&
                        <CommonCard variant='circuits' navSubTitle=': Private' hideTableDefault={true} data={user.private_circuits} />
                    }

                    {(!!user.public_circuits && user.public_circuits.length > 0) &&
                        <CommonCard variant='circuits' navSubTitle=': Public' hideTableDefault={true} data={user.public_circuits} />
                    }
                </CardDeck>

                <CardDeck className="mb-4">
                    {(!!user.brewery_reviews && user.brewery_reviews.length > 0) &&
                        <Reviews variant='brewery-reviews' navSubTitle=': Breweries' data={user.brewery_reviews} userId={this.props.userId} hideDataDefault={true}/>
                    }

                    {(!!user.circuit_reviews && user.circuit_reviews.length > 0) &&
                        <Reviews variant='circuit-reviews' navSubTitle=': Circuits' data={user.circuit_reviews} userId={this.props.userId} hideDataDefault={true}/>
                    }
                </CardDeck>
                
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.user.id,
        user: state.user.selected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUser: (userId) => {dispatch(getUser(userId))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

