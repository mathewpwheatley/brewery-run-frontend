import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllBreweries, clearAllBreweries} from '../actions/brewery.js'
import FetchMessage from '../components/FetchMessage.js'
import CommonCard from './CommonCard.js'
import LocationsMap from '../components/LocationsMap.js'
import BlankMap from '../components/BlankMap.js'
import {Container, CardDeck} from 'react-bootstrap'

class Breweries extends Component {

  componentDidMount() {
    this.props.getAllBreweries()
  }

  componentWillUnmount() {
    this.props.clearAllBreweries()
  }

  render () {
    return (
      <Container className="col-10 mt-4">
        <FetchMessage/>
        {this.props.breweries &&
          <CardDeck className="mb-4">
            <CommonCard variant='breweries' data={this.props.breweries}/>
            {(this.props.breweries.length > 0 && this.props.breweries[0].latitude) ?
              <LocationsMap locations={this.props.breweries}/> :
              <BlankMap/>
            }
          </CardDeck>
        }
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
      breweries: state.brewery.all
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllBreweries: () => {dispatch(getAllBreweries())},
    clearAllBreweries: () => {dispatch(clearAllBreweries())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Breweries)