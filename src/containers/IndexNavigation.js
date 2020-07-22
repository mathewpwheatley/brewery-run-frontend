import React, {Component} from 'react'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import {getAllBreweries} from '../actions/brewery.js'
import {getAllCircuits} from '../actions/circuit.js'
import {getAllUsers} from '../actions/user.js'
import FetchMessage from '../components/FetchMessage.js'
import IndexTable from './IndexTable.js'

class IndexNavigation extends Component {

    state = {
        keyword: '',
        keywordKey: '',
        icon: '',
        data: [],
        displayKeys: {}
    }

    setVariantion = () => {
        switch (this.props.variant) {
            case "breweries":
                this.props.getAllBreweries()
                this.setState({
                    keywordKey: 'name',
                    icon: <i className="fas fa-industry"/>,
                    data: this.props.breweries,
                    displayKeys: {name: 'Name', brewery_type: 'Type', public_circuits_count: 'Circuits', rating: 'Rating', likes_count: 'Likes', reviews_count: 'Reviews', favorites_count: 'Favorited'}
                })
                break 
            case "circuits":
                this.props.getAllCircuits()
                this.setState({
                    keywordKey: 'title',
                    icon: <i className="fas fa-route"/>,
                    data: this.props.circuits,
                    displayKeys: {title: 'Title', rating: 'Rating', likes_count: 'Likes', reviews_count: 'Reviews', favorites_count: 'Favorites'}
                })
                break 
            case "users":
                this.props.getAllUsers()
                this.setState({
                    keywordKey: 'full_name',
                    icon: <i className="fas fa-running"/>,
                    data: this.props.users,
                    displayKeys: {full_name: 'Name', public_circuits_count: 'Circuits', followers_count: 'Followers'}
                })
                break 
            default:
                break
        }
    }

    componentDidMount() {
        this.setVariantion()
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    capitalize = (string) => {
        if (typeof string !== 'string') return ''
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    filterDataByName = () => {
        if (this.state.keyword) {
            return this.state.data.filter(datum => datum[this.state.keywordKey].toLowerCase().includes(this.state.keyword.toLowerCase()))
        } else {
            return this.state.data
        }
    }

    render () {
        return (
            <Container className="col-11 mt-4 px-0 border border-secondary rounded-lg">
                <Navbar className="shadow" bg="primary" variant="dark">
                    <Navbar.Brand className="mr-auto">
                        {this.state.icon}
                        <span className="d-none d-sm-none d-md-inline"> {this.capitalize(this.props.variant)}</span>
                    </Navbar.Brand>
                    <Form inline>
                        <Form.Control type="search" placeholder={"Name Search"} aria-label="Search" name="keyword" value={this.state.keyword} onChange={event => this.handleChange(event)}/>
                    </Form>
                </Navbar>
                <FetchMessage/>
                <IndexTable data={this.filterDataByName()} displayKeys={this.state.displayKeys} basePath={"/" + this.props.variant} />
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        breweries: state.brewery.all,
        circuits: state.circuit.all,
        users: state.user.all
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllBreweries: () => {dispatch(getAllBreweries())},
        getAllCircuits: () => {dispatch(getAllCircuits())},
        getAllUsers: () => {dispatch(getAllUsers())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexNavigation)