import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {getBreweryReview} from '../actions/review.js'
import {getCircuitReview} from '../actions/review.js'
import FetchMessage from '../components/FetchMessage.js'
import DeleteReviewButton from '../components/DeleteReviewButton.js'

class Review extends Component {

    state = {
        baseSubjectURL: ''
    }

    componentDidMount() {
        switch (this.props.variant) {
            case 'brewery':
                this.props.getBreweryReview(this.props.id)
                this.setState({baseSubjectURL: '/breweries'})
                break
            case 'circuit':
                this.props.getCircuitReview(this.props.id)
                this.setState({baseSubjectURL: '/circuits'})
                break
            default:
                break
        }
    }

    render () {
        const review = this.props.review

        return (
            <Card>
                <Card.Header>{this.props.variant} Review: </Card.Header>
                <Card.Body>
                    <Card.Title>Title: {review.title}</Card.Title>
                    <Card.Text>Rating: {review.rating}</Card.Text>
                    <Card.Text>Author: {this.props.userId ? <Link to={"/users/" + this.props.userId} >{review.author_name}</Link> : review.author_name}</Card.Text>
                    <Card.Text>{this.props.variant}: {review.subject_name}</Card.Text>
                    <Card.Text>{review.content}</Card.Text>
                    {this.props.userID && 
                        <DeleteReviewButton variant={this.props.variant} reviewId={review.id}/>
                    }
                </Card.Body>

                <FetchMessage/>

            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.user.id,
        review: state.review.selected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getBreweryReview: (reviewId) => {dispatch(getBreweryReview(reviewId))},
        getCircuitReview: (reviewId) => {dispatch(getCircuitReview(reviewId))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Review)