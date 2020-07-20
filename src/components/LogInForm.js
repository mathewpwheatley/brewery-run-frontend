import React, {Component} from 'react'
import {connect} from 'react-redux'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {logInUser} from '../actions/user.js'
import FormMessages from './FormMessages.js'

class LogInForm extends Component {
    state = {
        email: "",
        password: ""
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleForgotButtonClick = event => {
        // Send email to user to reset email somehow
        console.log("This feature doesn't work yet")
    }

    handleGoogleButtonClick = event => {
        // Log user in via google
        console.log("This feature doesn't work yet")
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.logInUser(this.state)
    }

    render () {
        return (
            <Form className="py-2 px-3 signup-login-form" onSubmit={event => this.handleSubmit(event)}>
                <Form.Group>
                    <Form.Control type="email" placeholder="Email Address" name="email" value={this.state.email} onChange={event => this.handleChange(event)}/>
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} md="8"> 
                        <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={event => this.handleChange(event)}/>
                    </Form.Group>
                    <Form.Group as={Col} md="4"> 
                        <Button block variant="primary" type="button" onClick={event => this.handleForgotButtonClick(event)}>
                            <i className="far fa-question-circle"/>
                            <span className="d-none d-sm-none d-md-inline"> Forgot</span>
                        </Button>
                    </Form.Group>
                </Form.Row>
                <Form.Row className="justify-content-center">
                    <Col>
                        <Button block variant="primary" type="button" onClick={event => this.handleGoogleButtonClick(event)}>
                            <i className="fab fa-google"/>
                            <span className="d-none d-sm-none d-md-inline"> Login with Google</span>
                        </Button>
                    </Col>
                    <Col>
                        <Button block variant="success" type="submit">
                            <i className="fas fa-sign-in-alt"/>
                            <span className="d-none d-sm-none d-md-inline"> Login to Beer Run</span>
                        </Button>
                    </Col>
                </Form.Row>
                <FormMessages loading={this.props.loading} errors={this.props.errors} />
            </Form>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.user.loading,
        errors: state.user.errors
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logInUser: (user) => {dispatch(logInUser(user))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm)