import React, {Fragment, Component} from 'react'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import CreateReviewForm from '../components/CreateReviewForm'
import {createReview} from '../actions/review.js'


class CreateReview extends Component {

    state = {
        showForm: false,
        formTitle: ''
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
                    submitReview={this.props.createReview}
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
        userId: state.user.id,
        errors: state.fetchMessage.errors
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        createReview: async (review, variant) => {await dispatch(createReview(review, variant))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateReview)