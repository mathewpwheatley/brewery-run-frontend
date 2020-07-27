import React, {Fragment} from 'react'
import Review from './Review.js'

const Reviews = ({variant, reviews, userId}) => {

    const mapReviews = () => {
        return reviews.map(review => {
            return <Review review={review} variant={variant} userId={userId}/> 
        })
    }

    return (
        <Fragment>
            {mapReviews()}
        </Fragment>
    )
}


export default Reviews