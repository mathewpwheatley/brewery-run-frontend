import React from 'react'
import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap'
import RatingStars from './RatingStars.js'
import CommonDeleteButton from './CommonDeleteButton.js'


const Review = ({variant, review, userId}) => {

    return (
        <Card className="m-2">
            <Card.Body>
                <Card.Title>{review.title}</Card.Title>
                <Card.Subtitle>{review.subject_name}</Card.Subtitle>
                <Card.Text>Rating: <RatingStars rating={review.rating} /></Card.Text>
                <Card.Text>{review.content}</Card.Text>
                {/* Only render delete button if user is logged in and are the author */}
                {userId === review.author_id && 
                    <CommonDeleteButton variant={variant} subjectId={review.id}/>
                }
            </Card.Body>
            <Card.Footer className="text-muted">
                Author: {userId ? <Link to={"/users/" + userId} >{review.author_name}</Link> : review.author_name}
                <span className="float-right">Written: {new Date(review.created_at).toLocaleDateString()}</span>
            </Card.Footer>
        </Card>
    )
}

export default Review