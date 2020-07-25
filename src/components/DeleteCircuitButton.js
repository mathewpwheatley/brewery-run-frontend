import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import {deleteCircuit} from '../actions/circuit.js'

const DeleteCircuitButton = ({circuitId, deleteCircuit}) => {

    const [redirectPath, setRedirectPath] = useState()

    const handleDeleteClick = () => {
        if (window.confirm("Are you sure? A deleted circuit can't be restored.")) {
            deleteCircuit(circuitId)
            setRedirectPath('/dashboard')
        }
    }

    const handleRedirect = (path) => {
        if (path) {
            return <Redirect to={path} />
        }
    }

    return (
        <Button variant="danger" type="button" title="Delete Circuit" onClick={() => handleDeleteClick()} >
            {handleRedirect(redirectPath)}
            <i className="fas fa-trash-alt"/>
            <span className="d-none d-sm-none d-md-inline"> Delete Circuit</span>
        </Button>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        deleteCircuit: (circuitId) => {dispatch(deleteCircuit(circuitId))}
    }
}

export default connect(null, mapDispatchToProps)(DeleteCircuitButton)