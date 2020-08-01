import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Modal, Spinner} from 'react-bootstrap'

const FetchMessage = ({loading, errors, messages, clearErrorsMessages}) => {

    const [show, setShow] = useState(true)

    useEffect(() => {
        handleShow()
      })

    const handleShow = () => {
        if (loading) {
            setTimeout(() => {setShow(true)}, 1500)
        } else if (errors.length > 0 || messages.length > 0) {
            setShow(true)
        } else {
            setShow(false)
        }
    }

    const handleClose = () => {
        clearErrorsMessages()
    }

    return (
        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Conditionally render via && operator acting as if statement */}
                {loading &&
                    <div className="text-center">
                        <Spinner animation="border" variant="success" />
                        <h3 className="d-none d-sm-none d-md-inline"> Loading </h3>
                    </div>
                }
                {/* Conditionally render via && operator acting as if statement */}
                {errors.length > 0 &&
                    <div className="text-center">
                        <ul className="list-unstyled text-danger">
                            {errors.map((message, index) => <li key={index}>{message}</li>)}
                        </ul>
                    </div>
                }
                {/* Conditionally render via && operator acting as if statement */}
                {messages.length > 0 &&
                    <div className="text-center">
                        <ul className="list-unstyled">
                            {errors.map((message, index) => <li key={index}>{message}</li>)}
                        </ul>
                    </div>
                }
            </Modal.Body>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.fetchMessage.loading,
        messages: state.fetchMessage.messages,
        errors: state.fetchMessage.errors
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearErrorsMessages: () => dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchMessage)
  