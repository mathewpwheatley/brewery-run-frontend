import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {getUser} from '../actions/user.js'
import FetchMessage from '../components/FetchMessage.js'
import IndexTable from './IndexTable.js'


class User extends Component {

    componentDidMount() {
        this.props.getUser(this.props.id)
    }

    render () {
        const user = this.props.user
        const publicCircuitsDataDisplayNames = ['Title', 'Favorites', 'Likes', 'Reviews', 'Rating']
        const publicCircuitsDataKeys = ['title', 'favorites_count', 'likes_count', 'reviews_count', 'rating']
        
        return (
            <Container className="col-11 mt-4 border border-secondary rounded-lg">

                {/* Redirect to logged in user dashboard if they are looking at their own page */}
                {this.props.userId === parseInt(this.props.id) && <Redirect to="/dashboard" />}

                <FetchMessage/>

                <CardColumns className="p-4">

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
                        <Card>
                            <Card.Header>Public Created Circuits</Card.Header>
                            <IndexTable data={user.public_circuits} basePath={"/circuits"} dataDisplayNames={publicCircuitsDataDisplayNames} dataKeys={publicCircuitsDataKeys}/>
                        </Card>
                    }

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

export default connect(mapStateToProps, mapDispatchToProps)(User)