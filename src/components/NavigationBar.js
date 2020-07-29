import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {Navbar, Nav, Dropdown,Badge} from 'react-bootstrap'
import Notifications from '../containers/Notifications.js'
import {logOutUser} from '../actions/user.js'

class NavigationBar extends Component {
    render () {
        return (
            <Navbar className="shadow" bg="info" variant="dark">
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
                        {this.props.userName &&
                            <Nav.Item>
                                <NavLink className="nav-link" to="/users" title="Users">
                                    <i className="fas fa-running"/>
                                    <span className="d-none d-sm-none d-md-inline"> Users</span>
                                </NavLink>
                            </Nav.Item>
                        }
                    </Nav>

                    <Nav className="ml-md-auto">
                        {/* Conditionally render via && operator acting as if statement */}
                        {!this.props.userName &&
                            <Fragment>
                                <Nav.Item>
                                    <NavLink className="nav-link" to="/create-user" title="Create Accout">
                                        <i className="fas fa-user-plus"/>
                                        <span className="d-none d-sm-none d-md-inline"> Create Accout</span>
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
                        {this.props.notifications.length > 0 &&
                            <Dropdown as={Nav.Item}>
                                <Dropdown.Toggle as={Nav.Link} title="Notifications">
                                    <Badge pill variant="danger">{this.props.notifications.length}</Badge>
                                    <span> </span>
                                    <i className="fas fa-bell"/>
                                </Dropdown.Toggle>
                                <Notifications/>
                            </Dropdown>
                        }

                        {/* Conditionally render via && operator acting as if statement */}
                        {this.props.userName &&
                            <Dropdown as={Nav.Item}>
                                <Dropdown.Toggle as={Nav.Link} title={this.props.userName}>
                                    <i className="fas fa-house-user"/>
                                    <span className="d-none d-sm-none d-md-inline"> {this.props.userName}</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu alignRight>
                                    <Dropdown.Item as={NavLink} exact to="/dashboard" title="Dashboard"><i className="fas fa-tachometer-alt"/> Dashboard</Dropdown.Item>
                                    <Dropdown.Item as={NavLink} exact to="/edit-user" title="Edit User"><i className="fas fa-user-edit"/> Edit User</Dropdown.Item>
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
        notifications: state.notification.all
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logOutUser: () => {dispatch(logOutUser())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar)