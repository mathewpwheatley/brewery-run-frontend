import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


const Home = ({userId}) => {

    return (
        <Fragment>
            {userId ? <Redirect to="/dashboard"/> : <Redirect to="/welcome"/>}
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        userId: state.user.id
    }
}

export default connect(mapStateToProps)(Home)