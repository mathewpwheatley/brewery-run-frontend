import React from 'react'
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

const IndexGridCard = ({basePath, datum, dataDisplayNames, dataKeys}) => {

    const mapDataKeys = () => {
        return dataKeys.slice(1).map((dataKey, index) => {
            return <ListGroup.Item key={index}>{dataDisplayNames[index+1] + ': ' + datum[dataKey]}</ListGroup.Item>
        })
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>{datum[dataKeys[0]]}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                {mapDataKeys()}
                <ListGroup.Item>
                    <Link to={basePath + "/" + datum.id}>
                        <Button size="sm" variant="outline-primary">
                            View
                        </Button>
                    </Link>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    )
}

export default IndexGridCard