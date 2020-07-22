import React, {Component} from 'react'
import Card from 'react-bootstrap/Card'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import FetchMessage from '../components/FetchMessage.js'
import IndexTable from './IndexTable.js'

class IndexNavigation extends Component {

    state = {
        keyWord: '',
        title: '',
        icon: '',
        basePath: '',
        displayKeys: {}
    }

    componentDidMount() {
        const subTitle = this.props.subTitle ? this.props.subTitle : ''
        this.setVariantion(subTitle)

        // I dont like this, it feels a bit janky and requires a refresh of page to get new data
        if (this.props.getData) {if (this.props.data.length === 0) {this.props.getData()}}
    }

    setVariantion = (subTitle) => {
        switch (this.props.variant) {
            case "breweries":
                this.setState({
                    title: 'Breweries' + subTitle,
                    icon: <i className="fas fa-industry"/>,
                    basePath: '/breweries',
                    displayKeys: {name: 'Name', brewery_type: 'Type', public_circuits_count: 'Circuits', rating: 'Rating', likes_count: 'Likes', reviews_count: 'Reviews', favorites_count: 'Favorited'}
                })
                break 
            case "circuits":
                this.setState({
                    title: 'Circuits' + subTitle,
                    icon: <i className="fas fa-route"/>,
                    basePath: '/circuits',
                    displayKeys: {title: 'Title', rating: 'Rating', likes_count: 'Likes', reviews_count: 'Reviews', favorites_count: 'Favorites'}
                })
                break 
            case "users":
                this.setState({
                    title: 'Runners' + subTitle,
                    icon: <i className="fas fa-running"/>,
                    basePath: '/users',
                    displayKeys: {full_name: 'Name', public_circuits_count: 'Circuits', followers_count: 'Followers'}
                })
                break
            case "reviews":
                this.setState({
                    title: 'Reviews' + subTitle,
                    icon: <i className="far fa-newspaper"/>,
                    basePath: '/reviews',
                    displayKeys: {title: 'Title', author_name: 'Author', rating: 'Rating'}
                })
                break
            case "notifications":
                this.setState({
                    title: 'Notifications' + subTitle,
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
            <Card className="col-11 mt-4 px-0 mx-auto border border-secondary rounded-lg">
                <Navbar className="shadow" bg="primary" variant="dark">
                    <Navbar.Brand className="mr-auto">
                        {this.state.icon}
                        <span className="d-none d-sm-none d-md-inline"> {this.state.title}</span>
                    </Navbar.Brand>
                    <Form inline>
                        <Form.Control type="search" placeholder={Object.values(this.state.displayKeys)[0] + " Search"} aria-label="Search" name="keyWord" value={this.state.keyWord} onChange={event => this.handleChange(event)}/>
                    </Form>
                </Navbar>
                <FetchMessage/>
                <IndexTable data={this.filterDataByName()} displayKeys={this.state.displayKeys} basePath={this.state.basePath} />
            </Card>
        )
    }
}

export default IndexNavigation