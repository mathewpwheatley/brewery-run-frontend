import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import Welcome from '../components/Welcome.js'
import DashBoard from './DashBoard.js'

const Home = ({userId}) => {

    return (
        <Fragment>
            {userId ? <DashBoard/> : <Welcome/>}
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        userId: state.user.id
    }
}

export default connect(mapStateToProps)(Home)