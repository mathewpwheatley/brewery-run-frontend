import React from 'react'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const CommonTableRow = ({datum, dataKeys, basePath}) => {

    const mapColumns = () => {
        return dataKeys.map((dataKey, index) => <td key={index}>{datum[dataKey]}</td>)
    }

    return (
        <tr>
            {mapColumns()}
            <td>
                <Link to={basePath + "/" + datum.id}>
                    <Button size="sm" variant="outline-primary" title="View">
                        View
                    </Button>
                </Link>
            </td>
        </tr>
    )
}

export default CommonTableRow