import React from 'react'
import CardColumns from 'react-bootstrap/CardColumns'
import BreweriesGridCard from '../components/BreweriesGridCard.js'

const BreweriesList = ({breweries}) => {

    const mapBreweries = () => {
        return breweries.map(brewery => <BreweriesGridCard key={brewery.id} brewery={brewery}/>)
    } 

    return (
        <CardColumns className="p-4">
            {mapBreweries()}
        </CardColumns>
    )
}

export default BreweriesList