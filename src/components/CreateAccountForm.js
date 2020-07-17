import React, {Component} from 'react'
import {connect} from 'react-redux';
import {logIn} from '../actions/user.js'
import FormErrors from './FormErrors.js';

class CreateAccountForm extends Component {

    state = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        errors: []
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
        // Fetch request create user
        const body = {...this.state}
        delete body.errors
        const options = {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({user: body})
        }
        fetch(this.props.usersURL, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                this.setState({errors: json.errors})
            } else {
                // Set redux store state to let fronte end know a user is logged in
                this.props.logIn(json)
            }
        })
    }

    render() {
        return (
            <form className="dropdown-menu dropdown-menu-right p-4 signup-login-form" onSubmit={event => this.handleSubmit(event)}>
                <div className="form-row">
                    <div className="form-group col-sm-6">
                        <input className="form-control" type="text" placeholder="First Name" name="first_name" value={this.state.first_name} onChange={event => this.handleChange(event)}/>
                    </div>
                    <div className="form-group col-sm-6">
                        <input className="form-control" type="text" placeholder="Last Name" name="last_name" value={this.state.last_name} onChange={event => this.handleChange(event)}/>
                    </div>
                </div>
                <div className="form-group">
                    <input className="form-control" type="email" placeholder="Email Address" name="email" value={this.state.email} onChange={event => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <input className="form-control" type="password" placeholder=" Password" name="password" value={this.state.password} onChange={event => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <input className="form-control" type="password" placeholder="Confirm Password" name="password_confirmation" value={this.state.password_confirmation} onChange={event => this.handleChange(event)}/>
                </div>
                <div className="form-row">
                    <div className="col-6">
                        <button className="btn btn-block btn-primary" type="button">
                            <i className="fab fa-google"/>
                            <span className="d-none d-sm-none d-md-inline"> Sign up with Google</span>
                        </button>
                    </div>
                    <div className="col-6">
                        <button className="btn btn-block btn-success" type="submit">
                            <i className="fas fa-user-plus"/>
                            <span className="d-none d-sm-none d-md-inline"> Create Account</span>
                        </button>
                    </div>
                </div>
                <FormErrors errors={this.state.errors}/>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        usersURL: state.endPoints.usersURL,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logIn: (user) => {dispatch(logIn(user))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountForm)