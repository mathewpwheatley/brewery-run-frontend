import React, {Component} from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import BreweriesTableRow from '../components/BreweriesTableRow.js'

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
        return breweries.map(brewery => <BreweriesTableRow key={brewery.id} brewery={brewery}/>)
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
            <Table className="text-center" hover size="sm">
                <thead className="thead-light">
                    <tr>
                        <th>
                            Name <Button size="sm" variant="outline-secondary" name="name" value={this.state.name} onClick={event => this.handleClick(event)} >
                                <i className="fas fa-sort"/>
                            </Button>
                        </th>
                        <th>
                            Type <Button size="sm" variant="outline-secondary" name="brewery_type" value={this.state.brewery_type} onClick={event => this.handleClick(event)} >
                                <i className="fas fa-sort"/>
                            </Button>
                        </th>
                        <th>
                            Rating <Button size="sm" variant="outline-secondary" name="rating" value={this.state.rating} onClick={event => this.handleClick(event)} >
                                <i className="fas fa-sort"/>
                            </Button>
                        </th>
                        <th>
                            Likes <Button size="sm" variant="outline-secondary" name="likes_count" value={this.state.likes_count} onClick={event => this.handleClick(event)} >
                                <i className="fas fa-sort"/>
                            </Button>
                        </th>
                        <th>
                            Tags
                        </th>
                        <th>
                            Address
                        </th>
                        <th>
                            Website
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.mapBreweries(this.sortBreweries())}
                </tbody>
            </Table>
        )
    }
}

export default BreweriesTable