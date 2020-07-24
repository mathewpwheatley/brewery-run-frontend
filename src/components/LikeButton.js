import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import FetchMessages from './FetchMessage.js'
import {createBreweryLike, createCircuitLike, deleteBreweryLike, deleteCircuitLike} from '../actions/like.js'

const LikeButton = ({variant, likeId, userId, subjectId, createBreweryLike, createCircuitLike, deleteBreweryLike, deleteCircuitLike}) => {

    let attributes
    const setAttributes = () => {
        if (!!likeId) {
            attributes = {
                title: "Unlike",
                variant: "primary",
                text: <i className="fas fa-heart" style={{color: "deeppink"}}/>
            }
            switch (variant) {
                case "brewery":
                    attributes.action = () => deleteBreweryLike(likeId)
                    break
                case "circuit":
                    attributes.action = () => deleteCircuitLike(likeId)
                    break
                default:
                    break
            }
        } else {
            attributes = {
                title: "Like",
                variant: "outline-secondary",
                text: <i className="far fa-heart"/>
            }
            switch (variant) {
                case "brewery":
                    attributes.action = () => createBreweryLike(userId, subjectId)
                    break
                case "circuit":
                    attributes.action = () => createCircuitLike(userId, subjectId)
                    break
                default:
                    break
            }
        }
    }

    return (
        <Fragment>
            {setAttributes()}
            <Button className="mx-2" variant={attributes.variant} size="sm" title={attributes.title} onClick={attributes.action}>
                {attributes.text} 
            </Button>
            <FetchMessages/>
        </Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        createBreweryLike: (userId, breweryId) => {dispatch(createBreweryLike(userId, breweryId))},
        deleteBreweryLike: (likeId) => {dispatch(deleteBreweryLike(likeId))},
        createCircuitLike: (userId, circuitId) => {dispatch(createCircuitLike(userId, circuitId))},
        deleteCircuitLike: (likeId) => {dispatch(deleteCircuitLike(likeId))}
    }
}

export default connect(null, mapDispatchToProps)(LikeButton)