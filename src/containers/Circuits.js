import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllCircuits, clearAllCircuits} from '../actions/circuit.js'
import FetchMessage from '../components/FetchMessage.js'
import CommonCard from './CommonCard.js'

class Circuits extends Component {

  componentDidMount() {
    this.props.getAllCircuits()
  }
  componentWillUnmount() {
    this.props.clearAllCircuits()
  }

  render () {
    return (
      <div className="col-10 my-4 mx-auto">
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
    getAllCircuits: () => {dispatch(getAllCircuits())},
    clearAllCircuits: () => {dispatch(clearAllCircuits())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Circuits)