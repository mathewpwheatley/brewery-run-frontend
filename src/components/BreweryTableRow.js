import React from 'react'

const BreweryTableRow = ({brewery}) => {
    const {name, brewery_type, rating, likes_count, tag_list, full_address, website_url} = brewery
    return (
        <tr>
            <td>{name}</td>
            <td>{brewery_type}</td>
            <td>{rating}</td>
            <td>{likes_count}</td>
            <td>{tag_list}</td>
            <td>{full_address}</td>
            <td><a className="btn btn-sm btn-light border-secondary" href={website_url} target="_blank" rel="noopener noreferrer" >External</a></td>
        </tr>
    )
}

export default BreweryTableRow