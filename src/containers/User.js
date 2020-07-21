import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import {getUser} from '../actions/user.js'
import FetchMessage from '../components/FetchMessage.js'


class User extends Component {

    componentDidMount() {
        this.props.getUser(this.props.id)
    }

    render () {
        const user = this.props.user
        return (
            <Container className="col-11 mt-4 border border-secondary rounded-lg">
                <FetchMessage/>
                <h2>{user.full_name}</h2>
                <h5>Reviews ({user.reviews_count}):</h5>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.selected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUser: (id) => {dispatch(getUser(id))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)