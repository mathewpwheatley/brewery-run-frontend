import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import {getUser} from '../actions/user.js'
import FetchMessage from '../components/FetchMessage.js'
import CommonCard from './CommonCard.js'
import FollowButton from '../components/FollowButton.js'
import RatingStars from '../components/RatingStars.js'


class User extends Component {

    componentDidMount() {
        this.props.getUser(this.props.id)
    }

    render () {
        const user = this.props.user
        
        return (
            <div className="col-10 my-4 mx-auto">

                {/* Redirect to Welcome page if user is not logged in */}
                {!this.props.userId && <Redirect to="/log-in" />}

                {/* Redirect to logged in user dashboard if they are looking at their own page */}
                {this.props.userId === parseInt(this.props.id) && <Redirect to="/dashboard" />}

                
                <FetchMessage/>

                <Card>
                    <Card.Header>User Information</Card.Header>
                    <Card.Body>
                        <Card.Title>Name: {user.full_name}</Card.Title>
                        <Card.Text>About: {user.about}</Card.Text>
                        <Card.Text>City: {user.city_address}</Card.Text>
                        <FollowButton followId={user.active_user_follow_id} followerId={this.props.userId} followeeId={user.id}/>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Header>Statistics</Card.Header>
                    <Card.Body>
                        <Card.Text>Created Public Circuits: {user.public_circuits_count}</Card.Text>
                        <Card.Text>Public Circuits Average Rating: <RatingStars rating={user.public_circuits_avg_rating} /></Card.Text>
                        <Card.Text>Followers: {user.followers_count}</Card.Text>
                    </Card.Body>
                </Card>

                {(user.public_circuits && user.public_circuits.lenght > 0) &&
                    <CommonCard variant='circuits' data={user.public_circuits} />
                }

            </div>
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