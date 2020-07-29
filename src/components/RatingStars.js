import React, {Fragment} from 'react'

const RatingStars = ({rating}) => {

    const emptyStar = <i style={{color: "grey"}} className="far fa-star"/>
    const halfStar = <i style={{color: "gold"}} className="fas fa-star-half-alt"/>
    const fullStar = <i style={{color: "gold"}} className="fas fa-star"/>
    const unknown = <i style={{color: "royalBlue"}} className="fas fa-question-circle"/>
    
    const stars = (rating) => {
        // rating = parseFloat(rating)
        if (rating >= 0 && rating < 0.25) {
            return (<Fragment>{emptyStar} {emptyStar} {emptyStar} {emptyStar} {emptyStar}</Fragment>)
        } else if (rating >= 0.25 && rating < 0.75) {
            return (<Fragment>{halfStar} {emptyStar} {emptyStar} {emptyStar} {emptyStar}</Fragment>)
        } else if (rating >= 0.75 && rating < 1.25) {
            return (<Fragment>{fullStar} {emptyStar} {emptyStar} {emptyStar} {emptyStar}</Fragment>)
        } else if (rating >= 1.25 && rating < 1.75) {
            return (<Fragment>{fullStar} {halfStar} {emptyStar} {emptyStar} {emptyStar}</Fragment>)
        } else if (rating >= 1.75 && rating < 2.25) {
            return (<Fragment>{fullStar} {fullStar} {emptyStar} {emptyStar} {emptyStar}</Fragment>)
        } else if (rating >= 2.25 && rating < 2.75) {
            return (<Fragment>{fullStar} {fullStar} {halfStar} {emptyStar} {emptyStar}</Fragment>)
        } else if (rating >= 2.75 && rating < 3.25) {
            return (<Fragment>{fullStar} {fullStar} {fullStar} {emptyStar} {emptyStar}</Fragment>)
        } else if (rating >= 3.25 && rating < 3.75) {
            return (<Fragment>{fullStar} {fullStar} {fullStar} {halfStar} {emptyStar}</Fragment>)
        } else if (rating >= 3.75 && rating < 4.25) {
            return (<Fragment>{fullStar} {fullStar} {fullStar} {fullStar} {emptyStar}</Fragment>)
        } else if (rating >= 4.25 && rating < 4.75) {
            return (<Fragment>{fullStar} {fullStar} {fullStar} {fullStar} {halfStar}</Fragment>)
        } else if (rating >= 4.75 && rating <= 5) {
            return (<Fragment>{fullStar} {fullStar} {fullStar} {fullStar} {fullStar}</Fragment>)
        } else {
            return (unknown)
        }
    }

    return (
        <span title={rating + " stars"}>{stars(rating)}</span>
    )
}

export default RatingStars