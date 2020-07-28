import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllCircuits} from '../actions/circuit.js'
import FetchMessage from '../components/FetchMessage.js'
import CommonCard from './CommonCard.js'

class Circuits extends Component {

  componentDidMount() {
    this.props.getAllCircuits()
  }

  render () {
    return (
      <div className="m-4">
          <FetchMessage/>
          <CommonCard variant='circuits' data={this.props.circuits}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
      circuits: state.circuit.all
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllCircuits: () => {dispatch(getAllCircuits())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Circuits)