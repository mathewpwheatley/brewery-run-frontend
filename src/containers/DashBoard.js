import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import {getUser} from '../actions/user.js'

class DashBoard extends Component {
    render () {
        return (
            
            <Container className="col-11 mt-4 border border-secondary">
                <h3>Suggested Circuits:</h3>
                <h3>Favorite Circuits:</h3>
                <h3>Favorite Breweries:</h3>
                <h3>States: (followers, followeing, reviews count, circuits cout,</h3>
                <Button>Create Route</Button>
                
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.user.id,
        userName: state.user.name
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUser: (id) => {dispatch(getUser(id))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)