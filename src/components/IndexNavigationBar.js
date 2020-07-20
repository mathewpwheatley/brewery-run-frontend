import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'

const IndexNavigationBar = ({variant, data}) => {

    const [filter, setFilter] = useState();

    const capitalize = (string) => {
        if (typeof string !== 'string') return ''
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    const brandIcon = () => {
        switch (variant) {
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

    const filterData = () => {
        if (filter) {
            return data.filter(datum => datum.name.toLowerCase().includes(filter.toLowerCase()))
        } else {
            return data
        }
    }

    return (
        <Navbar className="shadow" bg="primary" variant="dark">
            <Navbar.Brand>
                {brandIcon()}
                <span className="d-none d-sm-none d-md-inline"> {capitalize(variant)}</span>
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Item>
                    <NavLink className="nav-link" exact to={"/" + variant + "/table"} title="Table View">
                        <i className="fas fa-table"/>
                        <span className="d-none d-sm-none d-md-inline"> Table View</span>
                    </NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink className="nav-link" exact to={"/" + variant + "/grid"} title="Grid View">
                        <i className="fas fa-th"/>
                        <span className="d-none d-sm-none d-md-inline"> Grid View</span>
                    </NavLink>
                </Nav.Item>
            </Nav>
            <Form inline>
                <Form.Control type="search" placeholder={capitalize(variant) + " Name Search"} aria-label="Search" name="filter" value={filter} onChange={event => setFilter(event.target.value)}/>
            </Form>
        </Navbar>
    )
}

export default IndexNavigationBar