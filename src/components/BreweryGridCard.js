import React from 'react'

const BreweryTableRow = ({brewery}) => {
    const {name, brewery_type, rating, likes_count, tag_list, full_address, website_url} = brewery
    return (
        <div className="col my-2">
            <div className="card col m-1">
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <ul>
                        <li className="card-text">Type: {brewery_type}</li>
                        <li className="card-text">Rating: {rating}</li>
                        <li className="card-text">Likes: {likes_count}</li>
                        <li className="card-text">Tags: {tag_list}</li>
                        <li className="card-text">Address: {full_address}</li>
                    </ul>
                    <a className="btn btn-light border-secondary" href={website_url} target="_blank">Brewery Website</a>
                </div>
            </div>
        </div>
    )
}

export default BreweryTableRow