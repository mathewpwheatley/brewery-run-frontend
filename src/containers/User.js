import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {getUser} from '../actions/user.js'
import FetchMessage from '../components/FetchMessage.js'
import IndexNavigation from './IndexNavigation.js'


class User extends Component {

    componentDidMount() {
        this.props.getUser(this.props.id)
    }

    render () {
        const user = this.props.user
        
        return (
            <CardColumns className="p-4">

                {/* Redirect to logged in user dashboard if they are looking at their own page */}
                {this.props.userId === parseInt(this.props.id) && <Redirect to="/dashboard" />}

                <FetchMessage/>

                <Card>
                    <Card.Header>User Information</Card.Header>
                    <Card.Body>
                        <Card.Title>Name: {user.full_name}</Card.Title>
                        <Card.Text>About: {user.about}</Card.Text>
                        <Card.Text>City: {user.city_address}</Card.Text>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Header>Statistics</Card.Header>
                    <Card.Body>
                        <Card.Text>Created Public Circuits: {user.public_circuits_count}</Card.Text>
                        <Card.Text>Public Circuits Average Rating: {user.public_circuits_avg_rating}</Card.Text>
                        <Card.Text>Followers: {user.followers_count}</Card.Text>
                    </Card.Body>
                </Card>

                {!!user.public_circuits &&
                    <IndexNavigation variant='circuits' data={user.public_circuits} />
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

export default connect(mapStateToProps, mapDispatchToProps)(User)