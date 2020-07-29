import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import {createBreweryFavorite, createCircuitFavorite, deleteBreweryFavorite, deleteCircuitFavorite} from '../actions/favorite.js'

const FavoriteButton = ({variant, favoriteId, userId, subjectId, createBreweryFavorite, createCircuitFavorite, deleteBreweryFavorite, deleteCircuitFavorite}) => {

    let attributes
    const setAttributes = () => {
        if (!!favoriteId) {
            attributes = {
                title: "Unfavorite",
                variant: "info",
                text: <i className="fas fa-star" style={{color: "gold"}}/>
            }
            switch (variant) {
                case "brewery":
                    attributes.action = () => deleteBreweryFavorite(favoriteId)
                    break
                case "circuit":
                    attributes.action = () => deleteCircuitFavorite(favoriteId)
                    break
                default:
                    break
            }
        } else {
            attributes = {
                title: "Favorite",
                variant: "outline-secondary",
                text: <i className="far fa-star"/>
            }
            switch (variant) {
                case "brewery":
                    attributes.action = () => createBreweryFavorite(userId, subjectId)
                    break
                case "circuit":
                    attributes.action = () => createCircuitFavorite(userId, subjectId)
                    break
                default:
                    break
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
        createBreweryFavorite: (userId, breweryId) => {dispatch(createBreweryFavorite(userId, breweryId))},
        deleteBreweryFavorite: (favoriteId) => {dispatch(deleteBreweryFavorite(favoriteId))},
        createCircuitFavorite: (userId, circuitId) => {dispatch(createCircuitFavorite(userId, circuitId))},
        deleteCircuitFavorite: (favoriteId) => {dispatch(deleteCircuitFavorite(favoriteId))}
    }
}

export default connect(null, mapDispatchToProps)(FavoriteButton)