import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux';
import BreweriesTable from './BreweriesTable.js'
import BreweriesGrid from './BreweriesGrid.js'

class Breweries extends Component {
    state = {
        breweries: [],
        errors: [],
        filter: ""
    }

    componentDidMount() {
        this.fetchBreweries()
    }

    fetchBreweries = () => {
        fetch(this.props.breweriesURL).then(resp => resp.json()).then(json => {
            if (json.errors) {
                this.setState({errors: json.errors})
            } else {
                this.setState({breweries: json})
            }
        })
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    filteredBreweries = () => {
        if (this.state.filter) {
            return this.state.breweries.filter(brewery => brewery.name.toLowerCase().includes(this.state.filter.toLowerCase()))
        } else {
            return this.state.breweries
        }
    }

    render () {
        return (
            <div className="continer my-3 mx-5 border border-secondary rounded-lg">
                <nav className="navbar navbar-expand navbar-dark bg-primary shadow">
                
                    <div className="navbar-brand">
                        <i className="fas fa-industry"/>
                        <span className="d-none d-sm-none d-md-inline"> Breweries in Seattle, WA</span>
                    </div>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/breweries/table" title="Table View">
                                <i className="fas fa-table"/>
                                <span className="d-none d-sm-none d-md-inline"> Table View</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/breweries/list" title="Grid View">
                                <i className="fas fa-th"/>
                                <span className="d-none d-sm-none d-md-inline"> Grid View</span>
                            </NavLink>
                        </li>

                    </ul>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Brewery Name Search" aria-label="Search" name="filter" value={this.state.filter} onChange={event => this.handleChange(event)}/>
                    </form>
                </nav>
                {/* I feel like there should be a route way to check this.... */}
                {window.location.pathname === "/breweries/table" ? <BreweriesTable breweries={this.filteredBreweries()} /> : <BreweriesGrid breweries={this.filteredBreweries()} />}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return ({
        breweriesURL: state.endPoints.breweriesURL
    })
  }

export default connect(mapStateToProps, {})(Breweries)