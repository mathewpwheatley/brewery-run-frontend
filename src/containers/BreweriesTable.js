import React, {Component} from 'react'
import BreweryTableRow from '../components/BreweryTableRow.js'

class BreweriesTable extends Component {
    // State is only used for sorting functions in this class
    // Key names must match data
    state = {
        current: "name",
        name: "ascending",
        brewery_type: "ascending",
        rating: "ascending",
        likes_count: "ascending",
    }

    sortBreweries = () => {
        let sort_by = this.state.current
        return this.props.breweries.sort((a, b) => { 
            if (this.state[sort_by] === "ascending") {
                return a[sort_by] - b[sort_by]
            } else {
                return b[sort_by] - a[sort_by]
            }
        })
    }

    mapBreweries = (breweries) => {
        return breweries.map(brewery => <BreweryTableRow key={brewery.id} brewery={brewery}/>)
    }

    handleClick = event => {
        let sort_by
        if (event.currentTarget.value === "ascending") {
            sort_by = "descending"
        } else {
            sort_by = "ascending"
        }
        this.setState({
            current: event.currentTarget.name,
            [event.currentTarget.name]: sort_by
        })
    }

    render () {
        return (
            <table className="table table-hover">
                <thead className="thead-light ">
                    <tr>
                        <th scope="col">
                            Name <button className="btn btn-sm btn-light border-secondary" name="name" value={this.state.name} onClick={event => this.handleClick(event)} >
                                <i className="fas fa-sort"/>
                            </button>
                        </th>
                        <th scope="col">
                            Type <button className="btn btn-sm btn-light border-secondary" name="brewery_type" value={this.state.brewery_type} onClick={event => this.handleClick(event)} >
                                <i className="fas fa-sort"/>
                            </button>
                        </th>
                        <th scope="col">
                            Rating <button className="btn btn-sm btn-light border-secondary" name="rating" value={this.state.rating} onClick={event => this.handleClick(event)} >
                                <i className="fas fa-sort"/>
                            </button>
                        </th>
                        <th scope="col">
                            Likes <button className="btn btn-sm btn-light border-secondary" name="likes_count" value={this.state.likes_count} onClick={event => this.handleClick(event)} >
                                <i className="fas fa-sort"/>
                            </button>
                        </th>
                        <th scope="col">
                            Tags
                        </th>
                        <th scope="col">
                            Address
                        </th>
                        <th scope="col">
                            Website
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.mapBreweries(this.sortBreweries())}
                </tbody>
            </table>
        )
    }
}

export default BreweriesTable