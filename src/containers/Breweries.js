import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllBreweries} from '../actions/brewery.js'
import FetchMessage from '../components/FetchMessage.js'
import CommonCard from './CommonCard.js'

class Breweries extends Component {

  componentDidMount() {
    this.props.getAllBreweries()
  }

  render () {
    return (
      <div className="m-4">
          <FetchMessage/>
          <CommonCard variant='breweries' data={this.props.breweries}/>
      </div>
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
    getAllBreweries: () => {dispatch(getAllBreweries())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Breweries)