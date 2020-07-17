import React from 'react'
import BreweriesGridCard from '../components/BreweriesGridCard.js'

const BreweriesList = ({breweries}) => {

    const mapBreweries = () => {
        return breweries.map(brewery => <BreweriesGridCard key={brewery.id} brewery={brewery}/>)
    } 

    return (
        <div className="row row-cols-4">
            {mapBreweries()}
        </div>
    )
}

export default BreweriesList