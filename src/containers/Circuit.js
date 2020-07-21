import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import {getCircuit} from '../actions/circuit.js'
import FetchMessage from '../components/FetchMessage.js'


class Circuit extends Component {

    componentDidMount() {
        this.props.getCircuit(this.props.id)
    }

    render () {
        const circuit = this.props.circuit
        return (
            <Container className="col-11 mt-4 border border-secondary rounded-lg">
                <FetchMessage/>
                <h2>{circuit.title}</h2>
                <h5>Reviews ({circuit.reviews_count}):</h5>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        circuit: state.circuit.selected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCircuit: (id) => {dispatch(getCircuit(id))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Circuit)