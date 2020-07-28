import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllUsers} from '../actions/user.js'
import FetchMessage from '../components/FetchMessage.js'
import CommonCard from './CommonCard.js'

class Users extends Component {

  componentDidMount() {
    this.props.getAllUsers()
  }

  render () {
    return (
      <div className="m-4">
          <FetchMessage/>
          <CommonCard variant='users' data={this.props.users}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
      users: state.user.all
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => {dispatch(getAllUsers())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)