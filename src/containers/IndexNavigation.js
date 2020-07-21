import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink, Route, Redirect} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import {getAllBreweries} from '../actions/brewery.js'
import {getAllCircuits} from '../actions/circuit.js'
import {getAllUsers} from '../actions/user.js'
import FetchMessage from '../components/FetchMessage.js'
import IndexTable from './IndexTable.js'
import IndexGrid from './IndexGrid.js'

class IndexNavigation extends Component {

    state = {
        keyword: '',
        keywordKey: '',
        icon: '',
        data: [],
        dataDisplayNames: [], // The strings that will be displayed as data headings
        dataKeys: [] // The object keys that will be used to pull the data, must match the order of dataDisplayNames
    }

    fetchData = () => {
        switch (this.props.variant) {
            case "breweries":
                this.props.getAllBreweries()
                break
            case "circuits":
                this.props.getAllCircuits()
                break
            case "users":
                this.props.getAllUsers()
                break
            default:
                break
        }
    }

    setVariantion = () => {
        switch (this.props.variant) {
            case "breweries":
                this.setState({
                    keywordKey: 'name',
                    icon: <i className="fas fa-industry"/>,
                    data: this.props.breweries,
                    dataDisplayNames: ['Name', 'Type', 'Rating', 'Likes', 'Tags', 'Address', 'Website'],
                    dataKeys: ['name', 'brewery_type', 'rating', 'likes_count', 'tag_list', 'full_address', 'website_url']
                })
                break 
            case "circuits":
                this.setState({
                    keywordKey: 'title',
                    icon: <i className="fas fa-route"/>,
                    data: this.props.circuits,
                    dataDisplayNames: ['Title', 'Rating', 'Likes', 'Favorites', 'Reviews'],
                    dataKeys: ['title', 'rating', 'likes_count', 'favorites_count', 'reviews_count']
                })
                break 
            case "users":
                this.setState({
                    keywordKey: 'full_name',
                    icon: <i className="fas fa-running"/>,
                    data: this.props.users,
                    dataDisplayNames: ['Name', 'Circuits', 'Followers'],
                    dataKeys: ['full_name', 'public_circuits_count', 'followers_count']
                })
                break 
            default:
                break
        }
    }

    componentDidMount() {
        this.fetchData()
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
                    <Navbar.Brand>
                        {this.state.icon}
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
                        <Form.Control type="search" placeholder={this.capitalize(this.props.variant) + " Name Search"} aria-label="Search" name="keyword" value={this.state.keyword} onChange={event => this.handleChange(event)}/>
                    </Form>
                </Navbar>
                <FetchMessage />
                <Route path={"/" + this.props.variant + "/table"} component={() => {
                    return <IndexTable data={this.filterDataByName()} dataDisplayNames={this.state.dataDisplayNames} dataKeys={this.state.dataKeys}/>}
                }/>
                <Route path={"/" + this.props.variant + "/grid"} component={() => {
                    return <IndexGrid data={this.filterDataByName()} dataDisplayNames={this.state.dataDisplayNames} dataKeys={this.state.dataKeys}/>}
                }/>

                {/* Redirect to table view as default upon load */}
                <Redirect to={"/" + this.props.variant + "/table"} />

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