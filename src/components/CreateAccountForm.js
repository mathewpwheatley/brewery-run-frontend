import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {createUser} from '../actions/user.js'
import FetchMessage from './FetchMessage.js'

class CreateAccountForm extends Component {

    state = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: ""
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleGoogleButtonClick = event => {
        // Log user in via google
        console.log("This feature doesn't work yet")
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.createUser(this.state)
    }

    handleRedirect = () => {
        if (this.props.id) {
            return <Redirect to='/' />
        }
    }

    render() {
        return (
            <Container className='col-4 my-4 border border-secondary rounded-lg'>
                <Form className="py-3 px-3" onSubmit={event => this.handleSubmit(event)}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Control type="text" placeholder="First Name" name="first_name" value={this.state.first_name} onChange={event => this.handleChange(event)}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control type="text" placeholder="Last Name" name="last_name" value={this.state.last_name} onChange={event => this.handleChange(event)}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group>
                        <Form.Control type="email" placeholder="Email Address" name="email" value={this.state.email} onChange={event => this.handleChange(event)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="password" placeholder=" Password" name="password" value={this.state.password} onChange={event => this.handleChange(event)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="password" placeholder="Confirm Password" name="password_confirmation" value={this.state.password_confirmation} onChange={event => this.handleChange(event)}/>
                    </Form.Group>
                    <Form.Row>
                        <Col>
                            <Button block variant="primary" type="button" onClick={event => this.handleGoogleButtonClick(event)} >
                                <i className="fab fa-google"/>
                                <span className="d-none d-sm-none d-md-inline"> Sign up with Google</span>
                            </Button>
                        </Col>
                        <Col>
                            <Button block variant="success" type="submit">
                                <i className="fas fa-user-plus"/>
                                <span className="d-none d-sm-none d-md-inline"> Create Account</span>
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
        createUser: (user) => {dispatch(createUser(user))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountForm)