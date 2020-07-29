import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {Container} from 'react-bootstrap'
import {getAllUsers} from '../actions/user.js'
import FetchMessage from '../components/FetchMessage.js'
import CommonCard from './CommonCard.js'

class Users extends Component {

  componentDidMount() {
    this.props.getAllUsers()
  }

  render () {
    return (
      <Container className="col-10 my-4">
          {/* Redirect to Welcome page if user is not logged in */}
          {!this.props.userId && <Redirect to="/log-in" />}
          <FetchMessage/>
          <CommonCard variant='users' data={this.props.users}/>
      </Container>
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