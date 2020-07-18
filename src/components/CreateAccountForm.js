import React, {Component} from 'react'
import {connect} from 'react-redux'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {createUser} from '../actions/user.js'
import FormMessages from './FormMessages.js'

class CreateAccountForm extends Component {

    state = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
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

    render() {
        return (
            <Form className="py-2 px-3 signup-login-form" onSubmit={event => this.handleSubmit(event)}>
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
        createUser: (user) => {dispatch(createUser(user))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountForm)