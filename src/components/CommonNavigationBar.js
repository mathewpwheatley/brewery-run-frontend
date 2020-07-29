import React, {Fragment} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import CreateReview from '../containers/CreateReview.js'

const CommonNavigationBar = ({variant, navSubTitle, userId, subjectId, subjectName, dataCount, showData, toggleData, showWriteReview, showSearch, searchTerm, updateSearchTerm, updateSearchKey}) => {

    let attributes
    const setAttributes = () => {
        const subTitle = navSubTitle ? navSubTitle : ''
        switch (variant) {
            case "brewery":
                attributes = {
                    navTitle: 'Brewery' + subTitle,
                    navColor: 'warning',
                    icon: <i className="fas fa-industry"/>,
                    showToggle: false
                }
                break 
            case "breweries":
                attributes = {
                    navTitle: 'Breweries' + subTitle,
                    navColor: 'warning',
                    icon: <i className="fas fa-industry"/>,
                    searchName: "Name",
                    showToggle: true
                }
                updateSearchKey("name")
                break 
            case "circuit":
                attributes = {
                    navTitle: 'Circuit' + subTitle,
                    navColor: 'success',
                    icon: <i className="fas fa-route"/>,
                    showToggle: false
                }
                break 
            case "circuits":
                attributes = {
                    navTitle: 'Circuits' + subTitle,
                    navColor: 'success',
                    icon: <i className="fas fa-route"/>,
                    searchName: "Title",
                    showToggle: true
                }
                updateSearchKey("title")
                break 
            case "user":
                attributes = {
                    navTitle: 'Runner' + subTitle,
                    navColor: 'info',
                    icon: <i className="fas fa-running"/>,
                    showToggle: false
                }
                break
            case "users":
                attributes = {
                    navTitle: 'Runners' + subTitle,
                    navColor: 'info',
                    icon: <i className="fas fa-running"/>,
                    searchName: "Name",
                    showToggle: true
                }
                updateSearchKey("full_name")
                break
            case "brewery-reviews":
                attributes = {
                    navTitle: 'Reviews' + subTitle,
                    navColor: 'secondary',
                    icon: <i className="far fa-newspaper"/>,
                    searchName: "Title",
                    showToggle: true
                }
                updateSearchKey("title")
                break
            case "circuit-reviews":
                attributes = {
                    navTitle: 'Reviews' + subTitle,
                    navColor: 'secondary',
                    icon: <i className="far fa-newspaper"/>,
                    searchName: "Title",
                    showToggle: true
                }
                updateSearchKey("title")
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
                {/* If this is a review navbar, and review enabled, and user logged in users can write a review */}
                {(variant.includes("review") && showWriteReview && userId) &&
                    <CreateReview variant={variant} subjectId={subjectId} subjectName={subjectName}/>
                }
                {attributes.showToggle &&
                    <Button className="mx-3" variant="light" size="sm" onClick={toggleData}>
                        {showData ?
                            <Fragment><i className="fas fa-minus-circle"/><span className="d-none d-sm-none d-md-inline"> Collapse</span></Fragment> :
                            <Fragment><i className="fas fa-plus-circle"/><span className="d-none d-sm-none d-md-inline"> Expand</span></Fragment>
                        }
                    </Button>
                }
                {(showData && showSearch) &&
                <Form inline>
                    <Form.Control type="search" placeholder={attributes.searchName + " Search"} aria-label="Search" name="searchTerm" value={searchTerm} onChange={event => updateSearchTerm(event.target.value)}/>
                </Form>
                }
            </Navbar>
        </Fragment>
    )
}

export default CommonNavigationBar

                