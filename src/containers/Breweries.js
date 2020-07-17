import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux';
import BreweryTableRow from '../components/BreweryTableRow.js'

class Breweries extends Component {
    state = {
        breweries: [],
        errors: []
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

    mapTableRows = () => {
        return this.state.breweries.map(brewery => <BreweryTableRow key={brewery.id} brewery={brewery}/>)
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
                            <NavLink className="nav-link" exact to="/breweries/list" title="List View">
                                <i className="fas fa-list"/>
                                <span className="d-none d-sm-none d-md-inline"> List View</span>
                            </NavLink>
                        </li>

                    </ul>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Brewery Name" aria-label="Search" />
                        <button className="btn btn-light my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </nav>

                <table className="table table-hover">
                    <thead className="thead-light ">
                        <tr>
                        <th scope="col">Name <i className="fas fa-sort"/></th>
                        <th scope="col">Type <i className="fas fa-sort"/></th>
                        <th scope="col">Rating <i className="fas fa-sort"/></th>
                        <th scope="col">Likes <i className="fas fa-sort"/></th>
                        <th scope="col">Tags</th>
                        <th scope="col">Address</th>
                        <th scope="col">Website</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.mapTableRows()}
                    </tbody>
                </table>
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