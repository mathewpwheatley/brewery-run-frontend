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
                variant: "outline-secondary",
                action: () => deleteFollow(followId),
                text: "Unfollow"
            }
        } else {
            attributes = {
                variant: "primary",
                action: () => createFollow(followeeId, followerId),
                text: "Follow"
            }
        }
    }
    return (
        <Fragment>
            {setAttributes()}
            <Button variant={attributes.variant} onClick={attributes.action}>
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