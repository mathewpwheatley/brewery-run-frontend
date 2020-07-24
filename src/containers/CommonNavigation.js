import React, {Component} from 'react'
import Card from 'react-bootstrap/Card'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import FetchMessage from '../components/FetchMessage.js'
import CommonTable from './CommonTable.js'

class CommonNavigation extends Component {

    state = {
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

        // I dont like this, it feels a bit janky and requires a refresh of page to get new data
        if (this.props.getData) {if (this.props.data.length === 0) {this.props.getData()}}
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
                    displayKeys: {title: 'Title', rating: 'Rating', likes_count: 'Likes', reviews_count: 'Reviews', favorites_count: 'Favorites'}
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

    render () {
        return (
            <Card className="col-11 mt-4 px-0 mx-auto">
                <Navbar className="shadow" bg={this.state.navColor} variant="dark">
                    <Navbar.Brand className="mr-auto">
                        {this.state.icon}
                        <span className="d-none d-sm-none d-md-inline"> {this.state.navTitle}</span>
                    </Navbar.Brand>
                    <Form inline>
                        <Form.Control type="search" placeholder={Object.values(this.state.displayKeys)[0] + " Search"} aria-label="Search" name="keyWord" value={this.state.keyWord} onChange={event => this.handleChange(event)}/>
                    </Form>
                </Navbar>
                <FetchMessage/>
                <CommonTable data={this.filterDataByName()} displayKeys={this.state.displayKeys} basePath={this.state.basePath} />
            </Card>
        )
    }
}

export default CommonNavigation