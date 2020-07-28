import React, {useState, useEffect}from 'react'
import GoogleMapReact, {Marker, DirectionsRenderer} from 'google-map-react'
import Card from 'react-bootstrap/Card'

const CircuitMap = (props) => {
  
    return (
      <Card>
          <DirectionsRenderer />
      </Card>
    )
  }

export default CircuitMap