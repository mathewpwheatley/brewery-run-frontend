import React, {Component} from 'react'
import { connect } from 'react-redux';

class LogInForm extends Component {
    state = {
        email: "",
        password: "",
        errors: []
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
        // Fetch request to login user
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
        fetch(this.props.logInURL, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                this.setState({errors: json.errors})
            } else {
                console.log(json)
            }
        })
        
        console.log("This feature doesn't work yet")
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
                    <div className="form-group col-6">
                        <button className="btn btn-block btn-primary" type="button" onClick={event => this.handleGoogleButtonClick(event)}>
                            <i className="fab fa-google"/>
                            <span className="d-none d-sm-none d-md-inline"> Login with Google</span>
                            </button>
                    </div>
                    <div className="form-group col-6">
                        <button className="btn btn-block btn-success" type="submit">
                            <i className="fas fa-sign-in-alt"/>
                            <span className="d-none d-sm-none d-md-inline"> Login to Beer Run</span>
                        </button>
                    </div>
                </div>

                {/* Conditionally render via && operator acting as if statement */}
                {this.state.errors &&
                    <div className="d-flex justify-content-center">
                        <ul className="list-unstyled text-danger">
                            {this.state.errors.map((message, index) => <li key={index}>{message}</li>)}
                        </ul>
                    </div>
                }
            </form>
        )
    }
}

const mapStateToProps = state => {
    return ({
        logInURL: state.endPoints.logInURL
    })
  }

export default connect(mapStateToProps, {})(LogInForm)