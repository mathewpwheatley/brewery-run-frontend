import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import {deleteCircuit} from '../actions/circuit.js'
import {deleteBreweryReview, deleteCircuitReview} from '../actions/review.js'
import {deleteUser} from '../actions/user.js'

const CommonDeleteButton = ({variant, subjectId, deleteCircuit, deleteBreweryReview, deleteCircuitReview, deleteUser}) => {

    const [redirectPath, setRedirectPath] = useState()

    let attributes = {}
    const setAttributes = () => {
        switch (variant) {
            case "circuit":
                attributes.action = () => deleteCircuit(subjectId)
                attributes.desiredRedirectPath = "/dashboard"
                attributes.title = "Delete Circuit"
                attributes.confirmMessage = "Are you sure you want to delete your circuit? A deleted circuit can't be restored."
                break
            case "brewery-review":
                attributes.action = () => deleteBreweryReview(subjectId)
                attributes.desiredRedirectPath = ""
                attributes.title = "Delete Review"
                attributes.confirmMessage = "Are you sure you want to delete your review? A deleted review can't be restored."
                break
            case "circuit-review":
                attributes.action = () => deleteCircuitReview(subjectId)
                attributes.desiredRedirectPath = ""
                attributes.title = "Delete Review"
                attributes.confirmMessage = "Are you sure you want to delete your review? A deleted review can't be restored."
                break
            case "user":
                attributes.action = () => deleteUser(subjectId)
                attributes.desiredRedirectPath = "/welcome"
                attributes.title = "Delete Account"
                attributes.confirmMessage = "Are you sure you want to delete your account? A deleted account can't be restored."
                break
            default:
                break
        }
    }

    const handleDeleteClick = () => {
        if (window.confirm(attributes.confirmMessage)) {
            attributes.action()
            setRedirectPath(attributes.desiredRedirectPath)
        }
    }

    const handleRedirect = (path) => {
        if (path) {
            return <Redirect to={path} />
        }
    }

    return (            
        <Button variant="danger" type="button" title={attributes.title} onClick={() => handleDeleteClick()} >
            {setAttributes()}
            {handleRedirect(redirectPath)}
            <i className="fas fa-trash-alt"/>
            <span className="d-none d-sm-none d-md-inline"> {attributes.title}</span>
        </Button>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        deleteCircuit: (circuitId) => {dispatch(deleteCircuit(circuitId))},
        deleteBreweryReview: (reviewId) => {dispatch(deleteBreweryReview(reviewId))},
        deleteCircuitReview: (reviewId) => {dispatch(deleteCircuitReview(reviewId))},
        deleteUser: (userId) => {dispatch(deleteUser(userId))}
    }
}

export default connect(null, mapDispatchToProps)(CommonDeleteButton)