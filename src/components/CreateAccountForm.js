import React from 'react'

const CreateAccountForm = () => {
    return (
        <form className="dropdown-menu dropdown-menu-right p-4 signup-login-form">
            <div className="form-row">
                <div className="form-group col-sm-6">
                    <input className="form-control" type="text" placeholder="First Name" />
                </div>
                <div className="form-group col-sm-6">
                    <input className="form-control" type="text" placeholder="Last Name" />
                </div>
            </div>
            <div className="form-group">
                <input className="form-control" type="email" placeholder="Email Address" />
            </div>
            <div className="form-group">
                <input className="form-control" type="email" placeholder="Confirm Email Address" />
            </div>
            <div className="form-group">
                <input className="form-control" type="password" placeholder=" Password" />
            </div>
            <div className="form-group">
                <input className="form-control" type="password" placeholder="Confirm Password" />
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
        </form>
    )
}
export default CreateAccountForm