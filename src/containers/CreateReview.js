import React, {Fragment, Component} from 'react'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import CreateReviewForm from '../components/CreateReviewForm'
import {createBreweryReview} from '../actions/review.js'
import {createCircuitReview} from '../actions/review.js'


class CreateReview extends Component {

    state = {
        showForm: false,
        formTitle: '',
        submitReview: ''
    }

    componentDidMount() {
        switch (this.props.variant) {
            case 'brewery-review':
                this.setState({
                    formTitle: "Brewery",
                    submitReview: this.props.createBreweryReview
                })
                break
            case 'circuit-review':
                this.setState({
                    formTitle: "Circuit",
                    submitReview: this.props.createCircuitReview
                })
                break
            default:
                break
        }
    }

    toggleForm = () => {
        this.state.showForm ? this.setState({showForm: false}) : this.setState({showForm: true})
    }

    render () {
        return (
            <Fragment>
                {!this.state.showForm && <Button onClick={this.toggleForm}><i class="fas fa-pen"/><span className="d-none d-sm-none d-md-inline"> Write Review</span></Button>}
                {this.state.showForm && 
                    <CreateReviewForm 
                        variant={this.props.variant}
                        subjectId={this.props.subjectId}
                        subjectName={this.props.subjectName}
                        formTitle={this.state.formTitle}
                        userId={this.props.userId}
                        submitReview={this.state.submitReview}
                        toggleForm={this.toggleForm}
                    />
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.user.id
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        createBreweryReview: (review) => {dispatch(createBreweryReview(review))},
        createCircuitReview: (circuit) => {dispatch(createCircuitReview(circuit))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateReview)