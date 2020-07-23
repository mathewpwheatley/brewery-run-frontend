import React from 'react'
import {connect} from 'react-redux'
import {Dropdown} from 'react-bootstrap'
import Notification from '../components/Notification.js'

const Notifications = ({notifications}) => {

  return (
    <Dropdown.Menu className="p-2" alignRight style={{width: "20rem"}}>
      {notifications.map(notification => {return <Notification key={notification.id} notification={notification}/>})}
    </Dropdown.Menu>
  )
}

const mapStateToProps = state => {
  return {
      notifications: state.notification.all
  }
}

export default connect(mapStateToProps)(Notifications)

