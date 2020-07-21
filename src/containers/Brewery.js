import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import {getBrewery} from '../actions/brewery.js'
import FetchMessage from '../components/FetchMessage.js'


class Brewery extends Component {

    componentDidMount() {
        this.props.getBrewery(this.props.id)
    }

    render () {
        const brewery = this.props.brewery
        return (
            <Container className="col-11 mt-4 border border-secondary rounded-lg">
                <FetchMessage/>
                <h2>{brewery.name}</h2>
                <h5>Reviews ({brewery.reviews_count}):</h5>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        brewery: state.brewery.selected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getBrewery: (id) => {dispatch(getBrewery(id))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Brewery)