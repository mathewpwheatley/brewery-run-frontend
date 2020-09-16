import React from 'react'
import { Table } from 'react-bootstrap'

const CircuitLegsTable = ({ legs }) => {
  const nextChar = (c) => {
    return String.fromCharCode(c.charCodeAt(0) + 1)
  }

  const mapTableRows = () => {
    let currWaypoint
    return legs.map((leg) => {
      currWaypoint = !!currWaypoint ? nextChar(currWaypoint) : 'A'
      let nextWaypoint = nextChar(currWaypoint)
      return (
        <tr>
          <td>{currWaypoint + ' - ' + nextWaypoint}</td>
          <td>{leg.start_address}</td>
          <td>{leg.end_address}</td>
          <td>{leg.distance}</td>
        </tr>
      )
    })
  }

  return (
    <Table className='text-center' size='sm' hover bordered>
      <thead className='thead-light'>
        <tr>
          <th>Circuit Leg</th>
          <th>Start Address</th>
          <th>End Address</th>
          <th>Distance</th>
        </tr>
      </thead>
      <tbody>{mapTableRows()}</tbody>
    </Table>
  )
}

export default CircuitLegsTable
