import React from 'react'
import Button from 'react-bootstrap/Button'

const BreweriesTableRow = ({brewery}) => {
    const {name, brewery_type, rating, likes_count, tag_list, full_address, website_url} = brewery
    return (
        <tr>
            <td>{name}</td>
            <td>{brewery_type}</td>
            <td>{rating}</td>
            <td>{likes_count}</td>
            <td>{tag_list}</td>
            <td>{full_address}</td>
            <td><Button size="sm" variant="outline-secondary" href={website_url} target="_blank" rel="noopener noreferrer" >External</Button></td>
        </tr>
    )
}

export default BreweriesTableRow