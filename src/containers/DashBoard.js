import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {getUser} from '../actions/user.js'
import FetchMessage from '../components/FetchMessage.js'
import IndexNavigation from './IndexNavigation.js'


class DashBoard extends Component {

    componentDidMount() {
        this.props.getUser(this.props.userId)
    }

    render () {
        const user = this.props.user

        return (
            <CardColumns className="p-4">

                {/* Redirect to root if user is not logged in */}
                {!this.props.userId && <Redirect to="/" />}

                <FetchMessage/>

                <Card>
                    <Card.Header>User Information</Card.Header>
                    <Card.Body>
                        <Card.Title>{user.full_name}</Card.Title>
                        <Card.Text>About: {user.about}</Card.Text>
                        <Card.Text>Email: {user.email}</Card.Text>
                        <Card.Text>Address: {user.full_address}</Card.Text>
                        <Link to="/edit-account">
                            <Button variant="warning">
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

                {!!user.favorite_breweries &&
                    <IndexNavigation variant='breweries' subTitle=': Favorite' data={user.favorite_breweries} />
                }

                {!!user.public_followees_circuits &&
                    <IndexNavigation variant='circuits' subTitle=': from Followees' data={user.public_followees_circuits} />
                }

                {!!user.favorite_circuits &&
                    <IndexNavigation variant='circuits' subTitle=': Favorite' data={user.favorite_circuits} />
                }

                {!!user.private_circuits &&
                    <IndexNavigation variant='circuits' subTitle=': Private' data={user.private_circuits} />
                }

                {!!user.public_circuits &&
                    <IndexNavigation variant='circuits' subTitle=': Public' data={user.public_circuits} />
                }

                {!!user.brewery_reviews &&
                    <IndexNavigation variant='reviews' subTitle=': Brewery' data={user.brewery_reviews} />
                }

                {!!user.circuit_reviews &&
                    <IndexNavigation variant='reviews' subTitle=': Circuit' data={user.circuit_reviews} />
                }
                
            </CardColumns>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)

