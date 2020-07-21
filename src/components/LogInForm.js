import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {logInUser} from '../actions/user.js'
import FetchMessage from './FetchMessage.js'

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

    handleRedirect = () => {
        if (this.props.id) {
            return <Redirect to='/' />
        }
    }

    render () {
        return (
            <Container className='col-4 my-4 py-0 border border-secondary rounded-lg'>
                <Form className="py-3 px-3" onSubmit={event => this.handleSubmit(event)}>
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
                </Form>
                <FetchMessage/>
                {this.handleRedirect()}
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        id: state.user.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logInUser: (user) => {dispatch(logInUser(user))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm)