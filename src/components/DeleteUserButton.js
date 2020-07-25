import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import {deleteUser} from '../actions/user.js'

const DeleteUserButton = ({userId, deleteUser}) => {

    const [redirectPath, setRedirectPath] = useState()

    const handleDeleteClick = () => {
        if (window.confirm("Are you sure? A deleted user can't be restored.")) {
            deleteUser(userId)
            setRedirectPath('/welcome')
        }
    }

    const handleRedirect = (path) => {
        if (path) {
            return <Redirect to={path} />
        }
    }

    return (            
        <Button variant="danger" type="button" title="Delete User" onClick={() => handleDeleteClick()} >
            {handleRedirect(redirectPath)}
            <i className="fas fa-trash-alt"/>
            <span className="d-none d-sm-none d-md-inline"> Delete User</span>
        </Button>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        deleteUser: (userId) => {dispatch(deleteUser(userId))}
    }
}

export default connect(null, mapDispatchToProps)(DeleteUserButton)