import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import {deleteUser} from '../actions/user.js'

const DeleteAccountButton = ({userId, deleteUser}) => {

    const [redirectPath, setRedirectPath] = useState()

    const handleDeleteClick = () => {
        if (window.confirm("Are you sure? A deleted account can't be restored.")) {
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
        <Button variant="danger" type="button" title="Delete Account" onClick={() => handleDeleteClick()} >
            {handleRedirect(redirectPath)}
            <i className="fas fa-trash-alt"/>
            <span className="d-none d-sm-none d-md-inline"> Delete Account</span>
        </Button>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        deleteUser: (accountId) => {dispatch(deleteUser(accountId))}
    }
}

export default connect(null, mapDispatchToProps)(DeleteAccountButton)