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
        email: '',
        password: '',
        password_confirmation: '',
        about: '',
        street: '',
        city: '',
        state: '',
        postal_code: '',
        country: ''
    }

    componentDidMount() {
        this.props.editUser(this.props.userId)
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleDeleteClick = event => {
        console.log("This feature doesn't work yet")
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.updateUser(this.state)
    }

    handleRedirect = () => {
        if (!this.props.userId) {
            return <Redirect to='/' />
        }
    }

    render() {
        return (
            <Container className='col-4 my-4 border border-secondary rounded-lg'>
                {this.handleRedirect()}
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
                            <Button block variant="danger" type="button" onClick={event => this.handleDeleteClick(event)} >
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
        updateUser: (user) => {dispatch(updateUser(user))},
        deleteUser: (user) => {dispatch(deleteUser(user))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAccountForm)