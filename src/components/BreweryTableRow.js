import React from 'react'

const BreweryTableRow = (props) => {
    console.log(props)
    const {name, brewery_type, rating, likes_count, tag_list, full_address, website_url} = props.brewery
    return (
        <tr>
            {console.log(props.brewery)}
            {/* <th scope="row">1</th> */}
            <td>{name}</td>
            <td>{brewery_type}</td>
            <td>{rating}</td>
            <td>{likes_count}</td>
            <td>{tag_list}</td>
            <td>{full_address}</td>
            <td><a href={website_url} target="_blank">External</a></td>
        </tr>
    )
}

export default BreweryTableRow