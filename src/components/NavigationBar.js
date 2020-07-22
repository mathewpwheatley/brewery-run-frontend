import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Dropdown from 'react-bootstrap/Dropdown'
import {logOutUser} from '../actions/user.js'

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
                            <NavLink className="nav-link" to="/index/breweries" title="Breweries">
                                <i className="fas fa-industry"/>
                                <span className="d-none d-sm-none d-md-inline"> Breweries</span>
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink className="nav-link" to="/index/circuits" title="Circuits">
                                <i className="fas fa-route"/>
                                <span className="d-none d-sm-none d-md-inline"> Circuits</span>
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink className="nav-link" to="/index/users" title="Users">
                                <i className="fas fa-running"/>
                                <span className="d-none d-sm-none d-md-inline"> Users</span>
                            </NavLink>
                        </Nav.Item>
                    </Nav>

                    <Nav className="ml-md-auto">
                        {/* Conditionally render via && operator acting as if statement */}
                        {!this.props.userName &&
                            <Fragment>
                                <Nav.Item>
                                    <NavLink className="nav-link" to="/create-account" title="Create Account">
                                        <i className="fas fa-user-plus"/>
                                        <span className="d-none d-sm-none d-md-inline"> Create Account</span>
                                    </NavLink>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavLink className="nav-link" to="/log-in" title="Log In">
                                        <i className="fas fa-sign-in-alt"/>
                                        <span className="d-none d-sm-none d-md-inline"> Log In</span>
                                    </NavLink>
                                </Nav.Item>
                            </Fragment>
                        }

                        {/* Conditionally render via && operator acting as if statement */}
                        {this.props.notificationsCount > 0 &&
                            <Nav.Item>
                                <NavLink className="nav-link" to="/notifications" title="Notifications">
                                    <i className="fas fa-bell"/>
                                </NavLink>
                            </Nav.Item>
                        }

                        {/* Conditionally render via && operator acting as if statement */}
                        {this.props.userName &&
                            <Dropdown as={Nav.Item}>
                                <Dropdown.Toggle as={Nav.Link}>
                                    <i className="fas fa-running"/>
                                    <span className="d-none d-sm-none d-md-inline"> {this.props.userName}</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu alignRight>
                                    <Dropdown.Header><i className="fas fa-star"/> Favorite</Dropdown.Header>
                                    <NavLink className="dropdown-item" exact to="/favorite-breweries" title="Favorite Breweries"><i className="fas fa-industry"/> Breweries</NavLink>
                                    <NavLink className="dropdown-item" exact to="/favorite-circuits" title="Favorite Circuits"><i className="fas fa-route"/> Circuits</NavLink>
                                    <Dropdown.Divider />
                                    <NavLink className="dropdown-item" exact to="/notifications" title="Notifications"><i className="fas fa-bell"/> Notifications ({this.props.notificationsCount})</NavLink>
                                    <NavLink className="dropdown-item" exact to="/account" title="Account"><i className="fas fa-address-card"/> Account</NavLink>
                                    <Dropdown.Divider />
                                    <Dropdown.Item title="Log Out" onClick={() => this.props.logOutUser()}><i className="fas fa-sign-out-alt"/> Log Out</Dropdown.Item>
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
        userName: state.user.name,
        notificationsCount: state.notification.count
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logOutUser: () => {dispatch(logOutUser())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar)