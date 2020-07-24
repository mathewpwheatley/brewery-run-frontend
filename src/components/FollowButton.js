import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import {createFollow, deleteFollow} from '../actions/follow.js'

const FollowButton = ({followId, followeeId, followerId, createFollow, deleteFollow}) => {

    let attributes
    const setAttributes = () => {
        if (!!followId) {
            attributes = {
                title: "Unfollow",
                variant: "success",
                action: () => deleteFollow(followId),
                text: <Fragment><i className="fas fa-beer"/><span className="d-none d-sm-none d-md-inline"> Following</span></Fragment>
            }
        } else {
            attributes = {
                title: "Follow",
                variant: "primary",
                action: () => createFollow(followeeId, followerId),
                text: <Fragment><i className="fas fa-user-plus"/><span className="d-none d-sm-none d-md-inline"> Follow</span></Fragment>
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
        createFollow: (followeeId, followerId) => {dispatch(createFollow(followeeId, followerId))},
        deleteFollow: (followId) => {dispatch(deleteFollow(followId))}
    }
}

export default connect(null, mapDispatchToProps)(FollowButton)