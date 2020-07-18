import React from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

const BreweriesGridCard = ({brewery}) => {
    const {name, brewery_type, rating, likes_count, tag_list, full_address, website_url} = brewery
    return (
        <Card>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Type: {brewery_type}</ListGroup.Item>
                <ListGroup.Item>Rating: {rating}</ListGroup.Item>
                <ListGroup.Item>Likes: {likes_count}</ListGroup.Item>
                <ListGroup.Item>Tags: {tag_list}</ListGroup.Item>
                <ListGroup.Item>Address: {full_address}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Button size="sm" variant="outline-secondary" href={website_url} target="_blank" rel="noopener noreferrer" >Brewery Website</Button>
            </Card.Body>
        </Card>
    )
}

export default BreweriesGridCard