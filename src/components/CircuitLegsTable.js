import React from 'react'
import {Table} from 'react-bootstrap'

const CircuitLegsTable = ({legs}) => {

    const mapTableRows = () => {
        return (
            legs.map(leg => {
                return (
                    <tr>
                        <td>{leg.start_address}</td>
                        <td>{leg.end_address}</td>
                        <td>{leg.distance}</td>
                    </tr>
                )
            })
        )
    }

    return (
        <Table className="text-center" size="sm" hover bordered>
            <thead className="thead-light">
                <tr>
                    <th>Start Address</th>
                    <th>End Address</th>
                    <th>Distance</th>
                </tr>
            </thead>
            <tbody>
                {mapTableRows()}
            </tbody>
        </Table>
    )
}

export default CircuitLegsTable