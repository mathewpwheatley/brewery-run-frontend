import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import {createLike, deleteLike} from '../actions/like.js'

const LikeButton = ({variant, likeId, userId, subjectId, createLike, deleteLike}) => {

    let attributes
    const setAttributes = () => {
        if (!!likeId) {
            attributes = {
                title: "Unlike",
                variant: "info",
                text: <i className="fas fa-heart" style={{color: "deeppink"}}/>,
                action: () => deleteLike(likeId, variant)
            }
        } else {
            attributes = {
                title: "Like",
                variant: "outline-secondary",
                text: <i className="far fa-heart"/>,
                action: () => createLike(userId, subjectId, variant)
            }
        }
    }

    return (
        <Fragment>
            {setAttributes()}
            <Button className="mx-2" variant={attributes.variant} size="sm" title={attributes.title} onClick={attributes.action}>
                {attributes.text} 
            </Button>
        </Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        createLike: (userId, subjectId, variant) => {dispatch(createLike(userId, subjectId, variant))},
        deleteLike: (likeId, variant) => {dispatch(deleteLike(likeId, variant))}
    }
}

export default connect(null, mapDispatchToProps)(LikeButton)