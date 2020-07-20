import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Dropdown from 'react-bootstrap/Dropdown'
import CreateAccountForm from './CreateAccountForm.js'
import LogInForm from './LogInForm.js'

class NavigationBar extends Component {
    render () {
        return (
            <Navbar className="shadow" bg="primary" variant="dark">
                <Navbar.Collapse>
                    <NavLink exact to="/" title="Beer Run">
                        <Navbar.Brand>
                            <i className="fas fa-beer"/>
                            <span className="d-none d-sm-none d-md-inline"> Beer Run</span>
                        </Navbar.Brand>
                    </NavLink>
                    
                    <Nav className="mr-auto">
                        <Nav.Item>
                            <NavLink className="nav-link" to="/breweries" title="Breweries">
                                <i className="fas fa-industry"/>
                                <span className="d-none d-sm-none d-md-inline"> Breweries</span>
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink className="nav-link" to="/circuits" title="Circuits">
                                <i className="fas fa-route"/>
                                <span className="d-none d-sm-none d-md-inline"> Circuits</span>
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink className="nav-link" to="/runners" title="Runners">
                                <i className="fas fa-running"/>
                                <span className="d-none d-sm-none d-md-inline"> Runners</span>
                            </NavLink>
                        </Nav.Item>
                    </Nav>

                    <Nav className="ml-md-auto">
                        {/* Conditionally render via && operator acting as if statement */}
                        {!this.props.user.userID &&
                            <Fragment>
                                <Dropdown as={Nav.Item}>
                                    <Dropdown.Toggle as={Nav.Link}>
                                        <i className="fas fa-user-plus"/>
                                        <span className="d-none d-sm-none d-md-inline"> Create Account</span>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu alignRight>
                                        <CreateAccountForm />
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown as={Nav.Item}>
                                    <Dropdown.Toggle as={Nav.Link}>
                                        <i className="fas fa-sign-in-alt"/>
                                        <span className="d-none d-sm-none d-md-inline"> Log In</span>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu alignRight>
                                        <LogInForm />
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Fragment>
                        }

                        {/* Conditionally render via && operator acting as if statement */}
                        {this.props.user.userID &&
                            <Dropdown as={Nav.Item}>
                                <Dropdown.Toggle as={Nav.Link}>
                                    <i className="fas fa-running"/>
                                    <span className="d-none d-sm-none d-md-inline"> {this.props.user.userName}</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu alignRight>
                                    <Dropdown.Header><i className="fas fa-star"/> Favorite</Dropdown.Header>
                                    <NavLink className="dropdown-item" exact to="/favorite-breweries" title="Favorite Breweries"><i className="fas fa-industry"/> Breweries</NavLink>
                                    <NavLink className="dropdown-item" exact to="/favorite-circuits" title="Favorite Circuits"><i className="fas fa-route"/> Circuits</NavLink>
                                    <Dropdown.Divider />
                                    <NavLink className="dropdown-item" exact to="/account" title="Account"><i className="fas fa-address-card"/> Account</NavLink>
                                    <Dropdown.Divider />
                                    <NavLink className="dropdown-item" exact to="/log-out" title="Log Out"><i className="fas fa-sign-out-alt"/> Log Out</NavLink>
                                </Dropdown.Menu>
                            </Dropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(NavigationBar)