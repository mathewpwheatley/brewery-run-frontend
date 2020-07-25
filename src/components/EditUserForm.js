import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {getEditUser, updateUser, deleteUser} from '../actions/user.js'
import FetchMessage from './FetchMessage.js'
import DeleteUserButton from './DeleteUserButton.js'

class EditUserForm extends Component {

    state = {
        first_name: '',
        middle_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        about: '',
        street: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
    }

    async componentDidMount() {
        await this.props.getEditUser(this.props.userId)
        this.populateForm()
    }

    populateForm = () => {
        this.setState({
            first_name: this.props.user.first_name,
            middle_name: this.props.user.middle_name,
            last_name: this.props.user.last_name,
            email: this.props.user.email,
            about: this.props.user.about,
            street: this.props.user.street,
            city: this.props.user.city,
            state: this.props.user.state,
            postal_code: this.props.user.postal_code,
            country: this.props.user.country,
            redirectPath: ''
        })
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleDeleteClick = () => {
        if (window.confirm("Are you sure? A deleted user can't be restored.")) {
            this.props.deleteUser(this.props.userId)
            this.setState({redirectPath: '/log-in'})
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        const user = {...this.state}
        delete user.redirectPath
        this.props.updateUser(this.props.userId, user)
        this.setState({redirectPath: '/dashboard'})
    }

    handleRedirect = (path) => {
        if (path) {
            return <Redirect to={path} />
        }
    }

    render() {
        return (
            <Card className='col-8 mt-4 mx-auto px-0'>
                <FetchMessage/>  
                {this.handleRedirect(this.state.redirectPath)}
                <Card.Header>Edit User</Card.Header>
                <Form className="py-3 px-3" onSubmit={event => this.handleSubmit(event)}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="First Name" name="first_name" value={this.state.first_name} onChange={event => this.handleChange(event)}/>
                            <Form.Text className="text-muted">Required</Form.Text>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Middle Name</Form.Label>
                            <Form.Control type="text" placeholder="Middle Name" name="middle_name" value={this.state.middle_name} onChange={event => this.handleChange(event)}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Last Name" name="last_name" value={this.state.last_name} onChange={event => this.handleChange(event)}/>
                            <Form.Text className="text-muted">Required</Form.Text>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email Address" name="email" value={this.state.email} onChange={event => this.handleChange(event)}/>
                        <Form.Text className="text-muted">Required</Form.Text>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder=" Password" name="password" value={this.state.password} onChange={event => this.handleChange(event)}/>
                            <Form.Text className="text-muted">Required <small>(You are updating your password here, right now we do not check if this matches your current password)</small></Form.Text>
                        </Form.Group>
                        <Form.Group as={Col}>
                        <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" name="password_confirmation" value={this.state.password_confirmation} onChange={event => this.handleChange(event)}/>
                            <Form.Text className="text-muted">Required</Form.Text>
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
                    <Form.Row className="float-right" >
                        <Col>
                            <DeleteUserButton userId={this.state.userId}/>
                        </Col>
                        <Col>
                            <Button variant="success" type="submit" title="Update User">
                                <i className="fas fa-user-plus"/>
                                <span className="d-none d-sm-none d-md-inline"> Update User</span>
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>  
            </Card>
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
        getEditUser: async (userId) => {await dispatch(getEditUser(userId))},
        updateUser: (userId, user) => {dispatch(updateUser(userId, user))},
        deleteUser: (userId) => {dispatch(deleteUser(userId))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserForm)