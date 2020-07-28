import React, {Fragment} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const CommonNavigationBar = ({navTitle, navColor, icon, showData, showSearch, toggleData, searchName, searchTerm, updateSearchTerm}) => {

    return (
            <Navbar className="shadow rounded-top" bg={navColor} variant="dark">
                <Navbar.Brand className="mr-auto">
                    {icon}
                    <span className="d-none d-sm-none d-md-inline"> {navTitle}</span>
                </Navbar.Brand>
                <Button className="mr-3" variant="light" size="sm" onClick={toggleData}>
                    {showData ?
                        <Fragment><i className="fas fa-minus-circle"/><span className="d-none d-sm-none d-md-inline"> Collapse</span></Fragment> :
                        <Fragment><i className="fas fa-plus-circle"/><span className="d-none d-sm-none d-md-inline"> Expand</span></Fragment>
                    }
                </Button>
                {(showData && showSearch) &&
                <Form inline>
                    <Form.Control type="search" placeholder={searchName + " Search"} aria-label="Search" name="searchTerm" value={searchTerm} onChange={event => updateSearchTerm(event.target.value)}/>
                </Form>
                }
                
            </Navbar>
        )
    }

export default CommonNavigationBar