import React, {Fragment, Component} from 'react'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import CreateCircuitForm from '../components/CreateCircuitForm'
import {getAllBreweriesForm} from '../actions/brewery'
import {createCircuit} from '../actions/circuit.js'


class CreateCircuit extends Component {

    state = {
        showForm: false
    }

    async componentDidMount() {
        await this.props.getAllBreweriesForm()
    }

    toggleForm = () => {
        this.state.showForm ? this.setState({showForm: false}) : this.setState({showForm: true})
    }

    render () {
        return (
            <Fragment>
                <Button variant="info" onClick={this.toggleForm}>
                    <i className="fas fa-pen"/>
                    <span className="d-none d-sm-none d-md-inline"> Create Circuit</span>
                </Button>
                {this.state.showForm && 
                    <CreateCircuitForm
                        breweries={this.props.breweries}
                        userId={this.props.userId}
                        submitCircuit={this.props.createCircuit}
                        toggleForm={this.toggleForm}
                        errors={this.props.errors}
                    />
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        breweries: state.brewery.all,
        userId: state.user.id,
        errors: state.fetchMessage.errors
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        createCircuit: async (circuit) => {await dispatch(createCircuit(circuit))},
        getAllBreweriesForm: async () => {await dispatch(getAllBreweriesForm())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCircuit)