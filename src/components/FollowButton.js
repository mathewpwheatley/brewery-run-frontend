import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import FetchMessages from './FetchMessage.js'
import {createFollow, deleteFollow} from '../actions/follow.js'

const FollowButton = ({followId, userId, followeeId, createFollow, deleteFollow}) => {

    const handleClick = () => {
        if (followId) {
            deleteFollow(followId)
        } else {
            createFollow(followeeId, userId)
        }
    }

    return (
        <Fragment>
            <Button variant={followId ? "outline-secondary" : "primary"} onClick={handleClick}>
                {followId ? "Unfollow" : "Follow"} 
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