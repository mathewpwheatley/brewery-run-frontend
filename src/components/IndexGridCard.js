import React from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

const IndexGridCard = ({datum, dataDisplayNames, dataKeys}) => {

    const mapDataKeys = () => {
        return dataKeys.slice(1).map((dataKey, index) => {
            if (dataKey === 'website_url') {
                return <ListGroup.Item key={index}><Button size="sm" variant="outline-secondary" href={datum[dataKey]} target="_blank" rel="noopener noreferrer" >External</Button></ListGroup.Item>
            } else {
                return <ListGroup.Item key={index}>{dataDisplayNames[index+1] + ': ' + datum[dataKey]}</ListGroup.Item>
            }
        })
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>{datum[dataKeys[0]]}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                {mapDataKeys()}
            </ListGroup>
        </Card>
    )
}

export default IndexGridCard