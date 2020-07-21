import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {getUser} from '../actions/user.js'
import FetchMessage from '../components/FetchMessage.js'


class DashBoard extends Component {

    componentDidMount() {
        this.props.getUser(this.props.userId)
    }

    render () {
        const user = this.props.user
        return (
            <Container className="col-11 mt-4 border border-secondary rounded-lg">

                {/* Redirect to root if user is not logged in */}
                {!this.props.userId && <Redirect to="/" />}

                <FetchMessage/>

                <CardColumns className="p-4">

                    <Card>
                        <Card.Header>User Information</Card.Header>
                        <Card.Body>
                            <Card.Title>{user.full_name}</Card.Title>
                            <Card.Text>About: {user.about}</Card.Text>
                            <Card.Text>Email: {user.email}</Card.Text>
                            <Card.Text>Address: {user.full_address}</Card.Text>
                            <Button variant="warning">Edit (Doesnt Work)</Button>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header>Statistics</Card.Header>
                        <Card.Body>
                            <Card.Text>Created Circuits: {user.circuits_count} (Public: {user.public_circuits_count})</Card.Text>
                            <Card.Text>Public Circuits Average Rating: {user.public_circuits_avg_rating}</Card.Text>
                            <Card.Text>Favorite Circuits: {user.favorite_circuits_count}</Card.Text>
                            <Card.Text>Circuit Reviews Written: {user.circuit_reviews_count}</Card.Text>
                            <Card.Text>Favorite Breweries: {user.favorite_breweries_count}</Card.Text>
                            <Card.Text>Brewery Reviews Written: {user.brewery_reviews_count}</Card.Text>
                            <Card.Text>Followers: {user.followers_count}</Card.Text>
                            <Card.Text>Following: {user.following_count}</Card.Text>
                        </Card.Body>
                    </Card>

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

                    <Card>
                        <Card.Header>Circuits From Followed</Card.Header>
                        <Card.Body>
                            <Card.Text>TBD</Card.Text>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header>Favorite Circuits</Card.Header>
                        <Card.Body>
                            <Card.Text>TBD</Card.Text>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header>Created Circuits (Public + Private)</Card.Header>
                        <Card.Body>
                            <Card.Text>TBD</Card.Text>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header>Favorite Breweries</Card.Header>
                        <Card.Body>
                            <Card.Text>TBD</Card.Text>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header>Authored Circuit Reviews</Card.Header>
                        <Card.Body>
                            <Card.Text>TBD</Card.Text>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header>Authored Brewery Reviews</Card.Header>
                        <Card.Body>
                            <Card.Text>TBD</Card.Text>
                        </Card.Body>
                    </Card>
                    
                </CardColumns>
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
        getUser: (id) => {dispatch(getUser(id))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)

