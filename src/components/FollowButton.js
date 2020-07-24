import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import FetchMessages from './FetchMessage.js'
import {createFollow, deleteFollow} from '../actions/follow.js'

const FollowButton = ({followId, followeeId, followerId, createFollow, deleteFollow}) => {

    let attributes
    const setAttributes = () => {
        if (!!followId) {
            attributes = {
                title: "Unfollow",
                variant: "outline-secondary",
                action: () => deleteFollow(followId),
                text: <Fragment><i className="far fa-times-circle"/><span className="d-none d-sm-none d-md-inline"> Unfollow</span></Fragment>
            }
        } else {
            attributes = {
                title: "Follow",
                variant: "primary",
                action: () => createFollow(followeeId, followerId),
                text: <Fragment><i className="fas fa-check-circle"/><span className="d-none d-sm-none d-md-inline"> Follow</span></Fragment>
            }
        }
    }
    return (
        <Fragment>
            {setAttributes()}
            <Button variant={attributes.variant} title={attributes.title} onClick={attributes.action}>
                {attributes.text} 
            </Button>
            <FetchMessages/>
        </Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        createFollow: (followeeId, followerId) => {dispatch(createFollow(followeeId, followerId))},
        deleteFollow: (followId) => {dispatch(deleteFollow(followId))}
    }
}

export default connect(null, mapDispatchToProps)(FollowButton)