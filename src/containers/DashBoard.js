import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import {getRunner} from '../actions/runner.js'
import FetchMessage from '../components/FetchMessage.js'


class DashBoard extends Component {

    componentDidMount() {
        this.props.getRunner(this.props.userId)
    }

    render () {
        return (
            <Container className="col-11 mt-4 border border-secondary rounded-lg">
                <FetchMessage/>
                <h3>Suggested Circuits:</h3>
                <h3>Favorite Circuits:</h3>
                <h3>Favorite Breweries:</h3>
                <h3>States: (followers, followeing, reviews count, circuits count,</h3>
                <Button>Create Route</Button>
                
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.user.id,
        userName: state.user.name,
        user: state.user.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getRunner: (id) => {dispatch(getRunner(id))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)