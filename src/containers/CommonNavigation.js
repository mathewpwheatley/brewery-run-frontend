import React, {Component, Fragment} from 'react'
import Card from 'react-bootstrap/Card'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import CommonTable from './CommonTable.js'

class CommonNavigation extends Component {

    state = {
        showTable: this.props.hideTableDefault ? false : true,
        keyWord: '',
        navTitle: '',
        navColor: '',
        icon: '',
        basePath: '',
        displayKeys: {}
    }

    componentDidMount() {
        const navSubTitle = this.props.navSubTitle ? this.props.navSubTitle : ''
        this.setVariantion(navSubTitle)
    }

    setVariantion = (navSubTitle) => {
        switch (this.props.variant) {
            case "breweries":
                this.setState({
                    navTitle: 'Breweries' + navSubTitle,
                    navColor: 'warning',
                    icon: <i className="fas fa-industry"/>,
                    basePath: '/breweries',
                    displayKeys: {name: 'Name', brewery_type: 'Type', public_circuits_count: 'Circuits', rating: 'Rating', likes_count: 'Likes', reviews_count: 'Reviews', favorites_count: 'Favorited'}
                })
                break 
            case "circuits":
                this.setState({
                    navTitle: 'Circuits' + navSubTitle,
                    navColor: 'success',
                    icon: <i className="fas fa-route"/>,
                    basePath: '/circuits',
                    displayKeys: {title: 'Title', breweries_count: 'Breweries', rating: 'Rating', likes_count: 'Likes', reviews_count: 'Reviews', favorites_count: 'Favorites'}
                })
                break 
            case "users":
                this.setState({
                    navTitle: 'Runners' + navSubTitle,
                    navColor: 'info',
                    icon: <i className="fas fa-running"/>,
                    basePath: '/users',
                    displayKeys: {full_name: 'Name', public_circuits_count: 'Circuits', followers_count: 'Followers'}
                })
                break
            case "brewery-reviews":
                this.setState({
                    navTitle: 'Reviews' + navSubTitle,
                    navColor: 'secondary',
                    icon: <i className="far fa-newspaper"/>,
                    basePath: '/breweries/reviews',
                    displayKeys: {title: 'Title', author_name: 'Author', rating: 'Rating'}
                })
                break
            case "circuit-reviews":
                this.setState({
                    navTitle: 'Reviews' + navSubTitle,
                    navColor: 'secondary',
                    icon: <i className="far fa-newspaper"/>,
                    basePath: '/circuits/reviews',
                    displayKeys: {title: 'Title', author_name: 'Author', rating: 'Rating'}
                })
                break
            case "notifications":
                this.setState({
                    navTitle: 'Notifications' + navSubTitle,
                    icon: <i className="fas fa-bell"/>,
                    basePath: '/notifications',
                    displayKeys: {title: 'Title', read: 'Read'}
                })
                break
            default:
                break
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    filterDataByName = () => {
        if (this.state.keyWord) {
            const keyWordKey = Object.keys(this.state.displayKeys)[0]
            return this.props.data.filter(datum => datum[keyWordKey].toLowerCase().includes(this.state.keyWord.toLowerCase()))
        } else {
            return this.props.data
        }
    }

    toggleTable = () => {
        this.state.showTable ? this.setState({showTable: false}) : this.setState({showTable: true})
    }

    render () {
        return (
            <Card className="px-0 mx-auto">
                <Navbar className="shadow rounded-top" bg={this.state.navColor} variant="dark">
                    <Navbar.Brand className="mr-auto">
                        {this.state.icon}
                        <span className="d-none d-sm-none d-md-inline"> {this.state.navTitle}</span>
                    </Navbar.Brand>
                    <Button className="mr-3" variant="light" size="sm" onClick={this.toggleTable}>
                        {this.state.showTable ?
                            <Fragment><i className="fas fa-minus-circle"/><span className="d-none d-sm-none d-md-inline"> Collapse</span></Fragment> :
                            <Fragment><i className="fas fa-plus-circle"/><span className="d-none d-sm-none d-md-inline"> Expand</span></Fragment>
                        }
                    </Button>
                    {(this.state.showTable && (this.props.hideSearch ? false : true)) &&
                    <Form inline>
                        <Form.Control type="search" placeholder={Object.values(this.state.displayKeys)[0] + " Search"} aria-label="Search" name="keyWord" value={this.state.keyWord} onChange={event => this.handleChange(event)}/>
                    </Form>
                    }
                    
                </Navbar>
                {this.state.showTable &&
                    <CommonTable data={this.filterDataByName()} displayKeys={this.state.displayKeys} basePath={this.state.basePath} showLink={this.props.hideLink ? false : true}/>
                }
            </Card>
        )
    }
}

export default CommonNavigation