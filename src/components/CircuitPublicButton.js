import React, { Fragment } from 'react'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import {togglePublicCircuit} from '../actions/circuit.js'

const CircuitPublicButton = ({circuitId, status, togglePublicCircuit}) => {

    let attributes
    const setAttributes = () => {
        if (status) {
            attributes = {
                title: "Public Circuit",
                variant: "info",
                text: <Fragment><i className="fas fa-lock-open"/><span className="d-none d-sm-none d-md-inline"> Public Circuit</span></Fragment>
            }
        } else {
            attributes = {
                title: "Private Circuit",
                variant: "outline-secondary",
                text: <Fragment><i className="fas fa-lock"/><span className="d-none d-sm-none d-md-inline"> Private Circuit</span></Fragment>
            }
        }
    }

    return (     
        <Fragment>     
            {setAttributes()}  
            <Button variant={attributes.variant} type="button" title={attributes.title} onClick={() => togglePublicCircuit(circuitId, !status)} >
                {attributes.text}
            </Button>
        </Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        togglePublicCircuit: (id, status) => {dispatch(togglePublicCircuit(id, status))}
    }
}

export default connect(null, mapDispatchToProps)(CircuitPublicButton)