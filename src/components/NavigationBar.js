import React from 'react'
import {NavLink} from 'react-router-dom'
import CreateAccountForm from './CreateAccountForm.js'
import LogInForm from './LogInForm.js'

const NavigationBar = () => {
    return (
        <header className="navbar navbar-expand navbar-dark bg-primary shadow flex-column flex-md-row bd-navbar">

            <nav className="collapse navbar-collapse" >
                <NavLink className="navbar-brand" exact to="/" title="Beer Run">
                    <i className="fas fa-beer"/>
                    <span className="d-none d-sm-none d-md-inline"> Beer Run</span>
                </NavLink>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" exact to="/" title="Breweries">
                            <i className="fas fa-industry"/>
                            <span className="d-none d-sm-none d-md-inline"> Breweries</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" exact to="/" title="Circuits">
                            <i className="fas fa-route"/>
                            <span className="d-none d-sm-none d-md-inline"> Circuits</span>
                        </NavLink>
                    </li>
                </ul>

                <ul className="navbar-nav ml-md-auto">
                    <li className="nav-item dropdown">
                        <NavLink className="nav-link dropdown-toggle" exact to="/" title="Create Account" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-user-plus"/>
                            <span className="d-none d-sm-none d-md-inline"> Create Account</span>
                        </NavLink>
                        <CreateAccountForm />
                    </li>

                    <li className="nav-item dropdown">
                        <NavLink className="nav-link dropdown-toggle" exact to="/" title="Log In" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-sign-in-alt"/>
                            <span className="d-none d-sm-none d-md-inline"> Log In</span>
                        </NavLink>
                        <LogInForm />
                    </li>

                    <li className="nav-item dropdown">
                        <NavLink className="nav-link dropdown-toggle" exact to="/" title="User Name" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-running"/>
                            <span className="d-none d-sm-none d-md-inline"> User Name</span>
                        </NavLink>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <h6 className="dropdown-header"><i className="fas fa-star"/> Favorite</h6>
                            <NavLink className="dropdown-item" exact to="/" title="Favorite Breweries"><i className="fas fa-industry"/> Breweries</NavLink>
                            <NavLink className="dropdown-item" exact to="/" title="Favorite Circuits"><i className="fas fa-route"/> Circuits</NavLink>
                            <div className="dropdown-divider"></div>
                            <NavLink className="dropdown-item" exact to="/" title="Account"><i className="fas fa-address-card"/> Account</NavLink>
                            <div className="dropdown-divider"></div>
                            <NavLink className="dropdown-item" exact to="/" title="Log Out"><i className="fas fa-sign-out-alt"/> Log Out</NavLink>
                        </div>
                    </li>
                </ul>
            </nav>
        
        </header>
    )
}

export default NavigationBar