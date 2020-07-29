import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {Container, CardDeck, Card} from 'react-bootstrap'
import {getUser} from '../actions/user.js'
import CommonNavigationBar from './CommonNavigationBar.js'
import FetchMessage from './FetchMessage.js'
import CommonCard from '../containers/CommonCard.js'
import FollowButton from './FollowButton.js'
import RatingStars from './RatingStars.js'


class User extends Component {

    componentDidMount() {
        this.props.getUser(this.props.id)
    }

    render () {
        const user = this.props.user
        
        return (
            <Container className="col-10 mt-4 ">

                {/* Redirect to Welcome page if user is not logged in */}
                {!this.props.userId && <Redirect to="/log-in" />}

                {/* Redirect to logged in user dashboard if they are looking at their own page */}
                {this.props.userId === parseInt(this.props.id) && <Redirect to="/dashboard" />}
                
                <FetchMessage/>

                <CardDeck className="mb-4">
                    <Card className="col-5 px-0">
                        <CommonNavigationBar
                            variant="user"
                            navSubTitle={": " + user.full_name}
                            showSearch={false}
                        />
                        <Card.Body>
                            <Card.Text>
                                <span className="font-weight-bold">Circuits Average Rating: </span>
                                <RatingStars rating={user.public_circuits_avg_rating} />
                                <span className="text-muted"> ({user.public_circuits_count} Circuits)</span>
                                <span className="float-right"><FollowButton followId={user.active_user_follow_id} followerId={this.props.userId} followeeId={user.id}/></span>
                            </Card.Text>
                            <Card.Text>
                                <span className="font-weight-bold">City: </span>
                                {user.city_address}
                            </Card.Text>
                            <Card.Text>
                                <span className="font-weight-bold">About: </span>
                                {user.about}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            Member Since: {new Date(user.created_at).toLocaleDateString()}
                            <span className="float-right">Followers: {user.followers_count}</span>
                        </Card.Footer>
                    </Card>

                    {(user.public_circuits && user.public_circuits.length > 0) &&
                        <CommonCard variant='circuits' data={user.public_circuits} />
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

export default connect(mapStateToProps, mapDispatchToProps)(User)