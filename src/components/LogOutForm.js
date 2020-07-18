import React from 'react'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {logOutUser} from '../actions/user.js'

const LogOutForm = ({logOutUser}) => {

    return (
        <div>
        {/* <Redirect to="/" > */}
            {logOutUser()}
        {/* </Redirect> */}
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        logOutUser: () => {dispatch(logOutUser())}
    }
}

export default connect(null, mapDispatchToProps)(LogOutForm)
