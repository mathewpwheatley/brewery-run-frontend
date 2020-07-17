import React from 'react'
import BreweryGridCard from '../components/BreweryGridCard.js'

const BreweriesList = ({breweries}) => {

    const mapListRows = () => {
        return breweries.map(brewery => <BreweryGridCard key={brewery.id} brewery={brewery}/>)
    } 

    return (
        <div class="container">
            <div class="row row-cols-4">
                {mapListRows()}
            </div>
        </div>
    )
}

export default BreweriesList