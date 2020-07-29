import React, {Fragment, Component} from 'react'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import CreateReviewForm from '../components/CreateReviewForm'
import {createBreweryReview, createCircuitReview} from '../actions/review.js'


class CreateReview extends Component {

    state = {
        showForm: false,
        formTitle: '',
        submitReview: ''
    }

    componentDidMount() {
        switch (this.props.variant) {
            case 'brewery-reviews':
                this.setState({
                    submitReview: this.props.createBreweryReview
                })
                break
            case 'circuit-reviews':
                this.setState({
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
                <Button variant="secondary" size="sm" onClick={this.toggleForm}>
                    <i className="fas fa-pen"/>
                    <span className="d-none d-sm-none d-md-inline"> Write Review</span>
                </Button>
                {this.state.showForm &&
                <CreateReviewForm 
                    variant={this.props.variant}
                    subjectId={this.props.subjectId}
                    subjectName={this.props.subjectName}
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
        createCircuitReview: (review) => {dispatch(createCircuitReview(review))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateReview)