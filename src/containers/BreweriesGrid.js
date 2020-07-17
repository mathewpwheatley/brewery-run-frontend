import React from 'react'
import BreweryGridCard from '../components/BreweryGridCard.js'

const BreweriesList = ({breweries}) => {

    const mapBreweries = () => {
        return breweries.map(brewery => <BreweryGridCard key={brewery.id} brewery={brewery}/>)
    } 

    return (
        <div className="row row-cols-4">
            {mapBreweries()}
        </div>
    )
}

export default BreweriesList