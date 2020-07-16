import React from 'react'
import {NavLink} from 'react-router-dom';


const NavigationBar = () => {
    return (
        <header class="navbar navbar-expand navbar-dark bg-primary shadow flex-column flex-md-row bd-navbar">

            <nav class="collapse navbar-collapse" >
                <a class="navbar-brand" title="Beer Run" href="#">
                    <i class="fas fa-beer"/>
                    <span class="d-none d-sm-none d-md-inline">Beer Run</span>
                </a>
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" title="Breweries" href="#">
                            <i class="fas fa-industry"/>
                            <span class="d-none d-sm-none d-md-inline">Breweries</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" title="Circuits" href="#">
                            <i class="fas fa-route"/>
                            <span class="d-none d-sm-none d-md-inline">Circuits</span>
                        </a>
                    </li>
                </ul>

                <ul class="navbar-nav ml-md-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" title="Create Account" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-user-plus"/>
                            <span class="d-none d-sm-none d-md-inline">Create Account</span>
                        </a>
                        <form class="dropdown-menu dropdown-menu-right p-4 signup-login-form">
                            <div class="form-row">
                                <div class="form-group col-sm-6">
                                    <input type="text" class="form-control" placeholder="First Name" />
                                </div>
                                <div class="form-group col-sm-6">
                                    <input type="text" class="form-control" placeholder="Last Name" />
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="email" class="form-control" placeholder="Email Address" />
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" placeholder=" Password" />
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" placeholder="Confirm Password" />
                            </div>
                            <div class="form-row">
                                <div class="col-6">
                                    <button class="btn btn-block btn-primary" href="#">
                                        <i class="fab fa-google"/>
                                        <span class="d-none d-sm-none d-md-inline">Sign up with Google</span>
                                    </button>
                                </div>
                                <div class="col-6">
                                    <button type="submit" class="btn btn-block btn-success">
                                        <i class="fas fa-user-plus"/>
                                        <span class="d-none d-sm-none d-md-inline">Create Account</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" title="Login" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-sign-in-alt"/>
                            <span class="d-none d-sm-none d-md-inline">Login</span>
                        </a>
                        <form class="dropdown-menu dropdown-menu-right p-4 signup-login-form">
                            <div class="form-group">
                                <input type="email" id="email" class="form-control" placeholder="Email Address" />
                            </div>
                            <div class="form-row">
                                <div class="form-group col-8">
                                    <input type="password" class="form-control" placeholder="Password" />
                                </div>
                                <div class="form-group col-4">
                                    <button type="button" class="btn btn-block btn-primary">
                                        <span class="d-none d-sm-none d-md-inline">Forgot</span>
                                        <i class="far fa-question-circle"/>
                                    </button>
                                </div>
                            </div>
                            <div class="form-row justify-content-center">
                                <div class="col-6">
                                    <button class="btn btn-block btn-primary" href="#">
                                        <i class="fab fa-google"/>
                                        <span class="d-none d-sm-none d-md-inline">Login with Google</span>
                                        </button>
                                </div>
                                <div class="col-6">
                                    <button type="submit" class="btn btn-block btn-success">
                                        <i class="fas fa-sign-in-alt"/>
                                        <span class="d-none d-sm-none d-md-inline">Login to Beer Run</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" title="User Name" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-running"/>
                            <span class="d-none d-sm-none d-md-inline">User Name</span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <h6 class="dropdown-header"><i class="fas fa-bookmark"/> Bookmarked</h6>
                            <a class="dropdown-item" href="#"><i class="fas fa-industry"/> Breweries</a>
                            <a class="dropdown-item" href="#"><i class="fas fa-route"/> Circuits</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#"><i class="fas fa-address-card"/> Account</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#"><i class="fas fa-sign-out-alt"/> Logout</a>
                        </div>
                    </li>
                </ul>
            </nav>
        
        </header>
    )
}

export default NavigationBar