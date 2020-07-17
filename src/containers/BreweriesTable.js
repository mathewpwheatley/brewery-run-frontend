import React from 'react'
import BreweryTableRow from '../components/BreweryTableRow.js'

const BreweriesTable = ({breweries}) => {

    const mapTableRows = () => {
        return breweries.map(brewery => <BreweryTableRow key={brewery.id} brewery={brewery}/>)
    } 

    return (
        <table className="table table-hover">
            <thead className="thead-light ">
                <tr>
                <th scope="col">Name <i className="fas fa-sort"/></th>
                <th scope="col">Type <i className="fas fa-sort"/></th>
                <th scope="col">Rating <i className="fas fa-sort"/></th>
                <th scope="col">Likes <i className="fas fa-sort"/></th>
                <th scope="col">Tags</th>
                <th scope="col">Address</th>
                <th scope="col">Website</th>
                </tr>
            </thead>
            <tbody>
                {mapTableRows()}
            </tbody>
        </table>
    )
}

export default BreweriesTable