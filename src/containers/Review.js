import React, {Component} from 'react'
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {getReview} from '../actions/review.js'
import FetchMessage from '../components/FetchMessage.js'

class Review extends Component {

    componentDidMount() {
        this.props.getReview(this.props.variant, this.props.id)
    }

    render () {
        const review = this.props.review

        return (
            <Card>

                <FetchMessage/>
                
                <Card.Header>Review</Card.Header>
                <Card.Body>
                    {console.log(review)}
                    {/* <Card.Title>Name: {brewery.name}</Card.Title>
                    <Card.Text>Type: {brewery.brewery_type}</Card.Text>
                    <Card.Text>Tags: {brewery.tag_list}</Card.Text>
                    <Card.Text>Address: {brewery.full_address}</Card.Text>
                    <Card.Text>Phone: {brewery.phone}</Card.Text>
                    <Card.Text><Button variant="outline-secondary" href={brewery.website_url} >Brewery Website</Button></Card.Text> */}
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
        getReview: (variant, reviewId) => {dispatch(getReview(variant, reviewId))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Review)