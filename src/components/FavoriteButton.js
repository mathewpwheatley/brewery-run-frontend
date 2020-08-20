import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import {createFavorite, deleteFavorite} from '../actions/favorite.js'

const FavoriteButton = ({variant, favoriteId, userId, subjectId, createFavorite, deleteFavorite}) => {

    let attributes
    const setAttributes = () => {
        if (!!favoriteId) {
            attributes = {
                title: "Unfavorite",
                variant: "info",
                text: <i className="fas fa-star" style={{color: "gold"}}/>,
                action: () => deleteFavorite(favoriteId, variant)
            }
        } else {
            attributes = {
                title: "Favorite",
                variant: "outline-secondary",
                text: <i className="far fa-star"/>,
                action: () => createFavorite(userId, subjectId, variant)
            }
        }
    }

    return (
        <Fragment>
            {setAttributes()}
            <Button className="mx-2" variant={attributes.variant} size="sm" title={attributes.title} onClick={attributes.action}>
                {attributes.text} 
            </Button>
        </Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        createFavorite: (userId, subjectId, variant) => {dispatch(createFavorite(userId, subjectId, variant))},
        deleteFavorite: (favoriteId, variant) => {dispatch(deleteFavorite(favoriteId, variant))}
    }
}

export default connect(null, mapDispatchToProps)(FavoriteButton)