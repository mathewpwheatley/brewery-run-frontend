import React, {Component} from 'react'
import {connect} from 'react-redux'
import IndexNavigationBar from '../components/IndexNavigationBar.js'
import BreweriesTable from './BreweriesTable.js'
import BreweriesGrid from './BreweriesGrid.js'


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

    render () {
        return (
            <div className="my-3 mx-5 border border-secondary rounded-lg">
                <IndexNavigationBar variant="runners" />
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