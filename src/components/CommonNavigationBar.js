import React, {Fragment} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const CommonNavigationBar = ({variant, navSubTitle, showData, toggleData, showSearch, searchName, searchTerm, updateSearchTerm, updateSearchKey}) => {

    let attributes
    const setAttributes = () => {
        const subTitle = navSubTitle ? navSubTitle : ''
        switch (variant) {
            case "breweries":
                attributes = {
                    navTitle: 'Breweries' + subTitle,
                    navColor: 'warning',
                    icon: <i className="fas fa-industry"/>,
                }
                if (updateSearchKey) {updateSearchKey("name")}
                break 
            case "circuits":
                attributes = {
                    navTitle: 'Circuits' + subTitle,
                    navColor: 'success',
                    icon: <i className="fas fa-route"/>,
                }
                if (updateSearchKey) {updateSearchKey("title")}
                break 
            case "users":
                attributes = {
                    navTitle: 'Runners' + subTitle,
                    navColor: 'info',
                    icon: <i className="fas fa-running"/>,
                }
                if (updateSearchKey) {updateSearchKey("full_name")}
                break
            case "brewery-reviews":
                attributes = {
                    navTitle: 'Reviews' + subTitle,
                    navColor: 'secondary',
                    icon: <i className="far fa-newspaper"/>,
                }
                if (updateSearchKey) {updateSearchKey("title")}
                break
            case "circuit-reviews":
                attributes = {
                    navTitle: 'Reviews' + subTitle,
                    navColor: 'secondary',
                    icon: <i className="far fa-newspaper"/>,
                }
                if (updateSearchKey) {updateSearchKey("title")}
                break
            default:
                break
        }
    }

    return (
        <Fragment>
            {setAttributes()}
            <Navbar className="shadow rounded-top" bg={attributes.navColor} variant="dark">
                <Navbar.Brand className="mr-auto">
                    {attributes.icon}
                    <span className="d-none d-sm-none d-md-inline"> {attributes.navTitle}</span>
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
        </Fragment>
    )
}

export default CommonNavigationBar