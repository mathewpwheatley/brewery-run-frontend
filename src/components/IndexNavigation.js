import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import {getAllUsers} from '../actions/user.js'
import {getAllBreweries} from '../actions/brewery.js'
import {getAllCircuits} from '../actions/circuit.js'

class IndexNavigation extends Component {

    state = {
        filter: ""
    }

    componentDidMount() {
        this.fetchAll()
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    fetchAll = () => {
        switch (this.props.variant) {
            case "breweries":
                return <i className="fas fa-industry"/>
            case "circuits":
                return <i class="fas fa-route"/>
            case "runners":
                return <i class="fas fa-running"/>
            default:
                return ""
        }
    }
    capitalize = (string) => {
        if (typeof string !== 'string') return ''
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    brandIcon = () => {
        switch (this.props.variant) {
            case "breweries":
                return <i className="fas fa-industry"/>
            case "circuits":
                return <i class="fas fa-route"/>
            case "runners":
                return <i class="fas fa-running"/>
            default:
                return ""
        }
    }

    

    

    // filterData = () => {
    //     if (filter) {
    //         return data.filter(datum => datum.name.toLowerCase().includes(filter.toLowerCase()))
    //     } else {
    //         return data
    //     }
    // }

    render () {
        return (
            <div className="my-3 mx-5 border border-secondary rounded-lg">
                <Navbar className="shadow" bg="primary" variant="dark">
                    <Navbar.Brand>
                        {this.brandIcon()}
                        <span className="d-none d-sm-none d-md-inline"> {this.capitalize(this.props.variant)}</span>
                    </Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Item>
                            <NavLink className="nav-link" exact to={"/" + this.props.variant + "/table"} title="Table View">
                                <i className="fas fa-table"/>
                                <span className="d-none d-sm-none d-md-inline"> Table View</span>
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink className="nav-link" exact to={"/" + this.props.variant + "/grid"} title="Grid View">
                                <i className="fas fa-th"/>
                                <span className="d-none d-sm-none d-md-inline"> Grid View</span>
                            </NavLink>
                        </Nav.Item>
                    </Nav>
                    <Form inline>
                        <Form.Control type="search" placeholder={this.capitalize(this.props.variant) + " Name Search"} aria-label="Search" name="filter" value={this.state.filter} onChange={event => this.handleChange(event)}/>
                    </Form>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userLoading: state.user.loading,
        userErrors: state.user.errors,
        breweryLoading: state.brewery.loading,
        breweryErrors: state.brewery.errors,
        circuitLoading: state.circuit.loading,
        circuitErrors: state.circuit.errors
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllUsers: () => {dispatch(getAllUsers())},
        getAllBreweries: () => {dispatch(getAllBreweries())},
        getAllCircuits: () => {dispatch(getAllCircuits())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexNavigation)