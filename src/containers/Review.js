import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {getBreweryReview} from '../actions/review.js'
import {getCircuitReview} from '../actions/review.js'
import FetchMessage from '../components/FetchMessage.js'

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


        // this.props.getReview(this.props.variant, this.props.id)
    }

    render () {
        const review = this.props.review



        return (
            <Card>

                <FetchMessage/>
                
                <Card.Header>{this.props.variant} Review: </Card.Header>
                <Card.Body>
                    <Card.Title>Title: {review.title}</Card.Title>
                    <Card.Text>Rating: {review.rating}</Card.Text>
                    <Card.Text>Author: {review.author_name}</Card.Text>
                    <Card.Text>{this.props.variant}: {review.subject_name}</Card.Text>
                    <Card.Text>{review.content}</Card.Text>
                    <Link to={this.state.baseSubjectURL + '/' + review.subject_id} ><Button variant="outline-secondary" >Subject</Button></Link>
                    <Link to={'/users/' + review.author_id}><Button variant="outline-secondary" >Author</Button></Link>
                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
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


// let getURL
//     switch (variant) {
//         case 'Brewery':
//             getURL = breweryReviewsURL
//             break
//         case 'Circuit':
//             getURL = circuitReviewsURL
//             break
//         default:
//             break
//     }