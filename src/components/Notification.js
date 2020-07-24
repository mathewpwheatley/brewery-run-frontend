import React from 'react'
import {connect} from 'react-redux'
import Toast from 'react-bootstrap/Toast'
import {markReadNotification, deleteNotification} from '../actions/notification.js'

const Notification = ({notification, markReadNotification, deleteNotification}) => {

  const handleClick = () => {
    if (!notification.read) {markReadNotification(notification.id)}
  }

  return (
    <Toast onClose={() => deleteNotification(notification.id)} onClick={handleClick} >
      <Toast.Header className={!notification.read && "bg-primary text-light"}>
        <strong className="mr-auto">{notification.title}</strong>
        <small>{!notification.read && "Unread"}</small>
      </Toast.Header>
      <Toast.Body>
        {notification.content + " "} {notification.link && <a href={notification.link}>Details</a>}
      </Toast.Body>
    </Toast>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    markReadNotification: (notificationId) => {dispatch(markReadNotification(notificationId))},
    deleteNotification: (notificationId) => {dispatch(deleteNotification(notificationId))}
  }
}

export default connect(null, mapDispatchToProps)(Notification)