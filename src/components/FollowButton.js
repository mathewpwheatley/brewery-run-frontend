import React, {Fragment, Component} from 'react'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import FetchMessages from './FetchMessage.js'
import {createFollow, deleteFollow} from '../actions/follow.js'

class FollowButton extends Component {
    render () {
        let attributes = {}
        const setAttributes = () => {
            if (!!this.props.followId) {
                attributes = {
                    variant: "outline-secondary",
                    action: () => this.props.deleteFollow(this.props.followId),
                    text: "Unfollow"
                }
            } else {
                attributes = {
                    variant: "primary",
                    action: () => this.props.createFollow(this.props.followeeId, this.props.followerId),
                    text: "Follow"
                }
            }
        }
        return (
            <Fragment>
                {setAttributes()}
                {console.log(this.props, this.state, attributes)}
                <Button variant={attributes.variant} onClick={attributes.action}>
                    {attributes.text} 
                </Button>
                <FetchMessages/>
            </Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createFollow: (followeeId, followerId) => {dispatch(createFollow(followeeId, followerId))},
        deleteFollow: (followId) => {dispatch(deleteFollow(followId))}
    }
}

export default connect(null, mapDispatchToProps)(FollowButton)