import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import CreateAccountForm from './CreateAccountForm.js'
import LogInForm from './LogInForm.js'

class NavigationBar extends Component {
    render () {
        return (
            <header className="navbar navbar-expand navbar-dark bg-primary shadow flex-column flex-md-row bd-navbar">

                <nav className="collapse navbar-collapse" >
                    <NavLink className="navbar-brand" exact to="/" title="Beer Run">
                        <i className="fas fa-beer"/>
                        <span className="d-none d-sm-none d-md-inline"> Beer Run</span>
                    </NavLink>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/breweries" title="Breweries">
                                <i className="fas fa-industry"/>
                                <span className="d-none d-sm-none d-md-inline"> Breweries</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/circuits" title="Circuits">
                                <i className="fas fa-route"/>
                                <span className="d-none d-sm-none d-md-inline"> Circuits</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/test-fetch" title="Test Fetch">
                                <i className="fas fa-vial"/>
                                <span className="d-none d-sm-none d-md-inline"> Test Fetch</span>
                            </NavLink>
                        </li>
                    </ul>

                    <ul className="navbar-nav ml-md-auto">

                        {/* Conditionally render via && operator acting as if statement */}
                        {!this.props.user.userId &&
                            <Fragment>
                                <li className="nav-item dropdown">
                                    <div className="nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-user-plus"/>
                                        <span className="d-none d-sm-none d-md-inline"> Create Account</span>
                                    </div>
                                    <CreateAccountForm />
                                </li>

                                <li className="nav-item dropdown">
                                    <div className="nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-sign-in-alt"/>
                                        <span className="d-none d-sm-none d-md-inline"> Log In</span>
                                    </div>
                                    <LogInForm />
                                </li>
                            </Fragment>
                        }

                        {/* Conditionally render via && operator acting as if statement */}
                        {this.props.user.userId &&
                            <li className="nav-item dropdown">
                                <div className="nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-running"/>
                                    <span className="d-none d-sm-none d-md-inline"> {this.props.user.name}</span>
                                </div>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <h6 className="dropdown-header"><i className="fas fa-star"/> Favorite</h6>
                                    <NavLink className="dropdown-item" exact to="/favorite-breweries" title="Favorite Breweries"><i className="fas fa-industry"/> Breweries</NavLink>
                                    <NavLink className="dropdown-item" exact to="/favorite-circuits" title="Favorite Circuits"><i className="fas fa-route"/> Circuits</NavLink>
                                    <div className="dropdown-divider"></div>
                                    <NavLink className="dropdown-item" exact to="/account" title="Account"><i className="fas fa-address-card"/> Account</NavLink>
                                    <div className="dropdown-divider"></div>
                                    <NavLink className="dropdown-item" exact to="/log-out" title="Log Out"><i className="fas fa-sign-out-alt"/> Log Out</NavLink>
                                </div>
                            </li>
                        }
                    </ul>
                </nav>
            
            </header>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(NavigationBar)