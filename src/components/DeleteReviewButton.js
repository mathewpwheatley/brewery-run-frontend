import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import {deleteBreweryReview, deleteCircuitReview} from '../actions/review.js'

const DeleteReviewButton = ({variant, reviewId, deleteBreweryReview, deleteCircuitReview}) => {

    const [redirectPath, setRedirectPath] = useState()

    const handleDeleteClick = () => {
        // if (window.confirm("Are you sure? A deleted review can't be restored.")) {
            attributes.action()
            // setRedirectPath('/dashboard')
        // }
    }

    const handleRedirect = (path) => {
        if (path) {
            return <Redirect to={path} />
        }
    }

    let attributes = {}
    const setAttributes = () => {
        switch (variant) {
            case "brewery":
                attributes.action = () => deleteBreweryReview(reviewId)
                break
            case "circuit":
                attributes.action = () => deleteCircuitReview(reviewId)
                break
            default:
                break
        }
    }

    return (            
        <Button variant="danger" type="button" title="Delete Review" onClick={() => handleDeleteClick()} >
            {setAttributes()}
            {handleRedirect(redirectPath)}
            <i className="fas fa-trash-alt"/>
            <span className="d-none d-sm-none d-md-inline"> Delete Review</span>
        </Button>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        deleteBreweryReview: (reviewId) => {dispatch(deleteBreweryReview(reviewId))},
        deleteCircuitReview: (reviewId) => {dispatch(deleteCircuitReview(reviewId))}
    }
}

export default connect(null, mapDispatchToProps)(DeleteReviewButton)