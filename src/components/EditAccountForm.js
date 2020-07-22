import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {editUser} from '../actions/user.js'
import {updateUser} from '../actions/user.js'
import {deleteUser} from '../actions/user.js'
import FetchMessage from './FetchMessage.js'

class EditAccountForm extends Component {

    state = {
        first_name: this.props.user.first_name,
        middle_name: this.props.user.middle_name,
        last_name: this.props.user.last_name,
        email: this.props.user.email,
        password: '',
        password_confirmation: '',
        about: this.props.user.about,
        street: this.props.user.street,
        city: this.props.user.city,
        state: this.props.user.state,
        postal_code: this.props.user.postal_code,
        country: this.props.user.country
    }

    componentDidMount() {
        this.props.editUser(this.props.userId)
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleDeleteClick = () => {
        if (window.confirm("Are you sure? A deleted account can't be restored.")) {
            this.props.deleteUser(this.props.userId)
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.updateUser(this.props.userId, this.state)
    }

    handleRedirect = () => {
        if (!this.props.userId) {
            return <Redirect to='/' />
        }
    }

    render() {
        return (
            <Container className='col-8 my-4 border border-secondary rounded-lg'>
                {this.handleRedirect()}
                <Form className="py-3 px-3" onSubmit={event => this.handleSubmit(event)}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="First Name" name="first_name" value={this.state.first_name} onChange={event => this.handleChange(event)}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Middle Name</Form.Label>
                            <Form.Control type="text" placeholder="Middle Name" name="middle_name" value={this.state.middle_name} onChange={event => this.handleChange(event)}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Last Name" name="last_name" value={this.state.last_name} onChange={event => this.handleChange(event)}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email Address" name="email" value={this.state.email} onChange={event => this.handleChange(event)}/>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder=" Password" name="password" value={this.state.password} onChange={event => this.handleChange(event)}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                        <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" name="password_confirmation" value={this.state.password_confirmation} onChange={event => this.handleChange(event)}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group>
                            <Form.Label>Street</Form.Label>
                            <Form.Control type="text" placeholder="Street" name="street" value={this.state.street} onChange={event => this.handleChange(event)}/>
                        </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" placeholder="City" name="city" value={this.state.city} onChange={event => this.handleChange(event)}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" placeholder="State" name="state" value={this.state.state} onChange={event => this.handleChange(event)}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control type="text" placeholder="Zip Code" name="postal_code" value={this.state.postal_code} onChange={event => this.handleChange(event)}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" placeholder="Country" name="country" value={this.state.country} onChange={event => this.handleChange(event)}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group>
                            <Form.Label>About</Form.Label>
                            <Form.Control type="text" placeholder="About" name="about" value={this.state.about} onChange={event => this.handleChange(event)}/>
                    </Form.Group>
                    <Form.Row>
                        <Col>
                            <Button block variant="danger" type="button" onClick={() => this.handleDeleteClick()} >
                                <i className="fas fa-trash-alt"/>
                                <span className="d-none d-sm-none d-md-inline"> Delete Account</span>
                            </Button>
                        </Col>
                        <Col>
                            <Button block variant="success" type="submit">
                                <i className="fas fa-user-plus"/>
                                <span className="d-none d-sm-none d-md-inline"> Update Account</span>
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
                <FetchMessage/>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.user.id,
        user: state.user.selected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editUser: (userId) => {dispatch(editUser(userId))},
        updateUser: (userId, user) => {dispatch(updateUser(userId, user))},
        deleteUser: (userId) => {dispatch(deleteUser(userId))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAccountForm)