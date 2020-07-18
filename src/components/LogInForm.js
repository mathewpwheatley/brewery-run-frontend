import React, {Component} from 'react'
import {connect} from 'react-redux'
import {logInUser} from '../actions/user.js'
import FormMessages from './FormMessages.js';

class LogInForm extends Component {
    state = {
        email: "",
        password: "",
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
            <form className="dropdown-menu dropdown-menu-right p-4 signup-login-form" onSubmit={event => this.handleSubmit(event)}>
                <div className="form-group">
                    <input className="form-control" type="email" placeholder="Email Address" name="email" value={this.state.email} onChange={event => this.handleChange(event)}/>
                </div>
                <div className="form-row">
                    <div className="form-group col-8">
                        <input className="form-control" type="password" placeholder="Password" name="password" value={this.state.password} onChange={event => this.handleChange(event)}/>
                    </div>
                    <div className="form-group col-4">
                        <button className="btn btn-block btn-primary" type="button" onClick={event => this.handleForgotButtonClick(event)}>
                            <i className="far fa-question-circle"/>
                            <span className="d-none d-sm-none d-md-inline"> Forgot</span>
                        </button>
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-6">
                        <button className="btn btn-block btn-primary" type="button" onClick={event => this.handleGoogleButtonClick(event)}>
                            <i className="fab fa-google"/>
                            <span className="d-none d-sm-none d-md-inline"> Login with Google</span>
                            </button>
                    </div>
                    <div className="col-6">
                        <button className="btn btn-block btn-success" type="submit">
                            <i className="fas fa-sign-in-alt"/>
                            <span className="d-none d-sm-none d-md-inline"> Login to Beer Run</span>
                        </button>
                    </div>
                </div>
                <FormMessages loading={this.props.loading} errors={this.props.errors} />
            </form>
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