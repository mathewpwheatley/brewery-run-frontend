import React from 'react'
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import CommonDeleteButton from '../components/CommonDeleteButton.js'

const Review = ({variant, review, userId}) => {

    return (
        <Card>
            <Card.Header>{variant} Review: </Card.Header>
            <Card.Body>
                <Card.Title>Title: {review.title}</Card.Title>
                <Card.Text>Rating: {review.rating}</Card.Text>
                <Card.Text>Author: {userId ? <Link to={"/users/" + userId} >{review.author_name}</Link> : review.author_name}</Card.Text>
                <Card.Text>{variant}: {review.subject_name}</Card.Text>
                <Card.Text>{review.content}</Card.Text>
                {/* Only render delete button if user is logged in and are the author */}
                {userId === review.author_id && 
                    <CommonDeleteButton variant={variant} subjectId={review.id}/>
                }
            </Card.Body>
        </Card>
    )
}

export default Review