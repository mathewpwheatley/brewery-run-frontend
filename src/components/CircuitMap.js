import React, {Fragment, useEffect, useRef, createRef} from 'react'
import Chart from 'chart.js'
import {CardGroup, Card} from 'react-bootstrap'

const CircuitMap = ({locations, mapSize, zoomLevel}) => {
  const googleMapRef = createRef()
  const googleMapSidePanelRef = createRef()
  const googleMapBottomPanelRef = createRef()
  const googleMap = useRef()
  

  useEffect(() => {
    // Load google maps and visualizer scripts
    const googleMapScript = document.createElement('script')
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API}&libraries=places`
    window.document.body.appendChild(googleMapScript)

    // Add event listener to wait for script to load (Should probably also wait for visualizer to load)
    googleMapScript.addEventListener('load', () => {
      // Render Map
      googleMap.current = createGoogleMap(locations[0])
      // Get directions and elevation then render directions, path, and elevation chart
      mapPlotCircuit(locations)
    })
  })

  const createGoogleMap = (origin) => {
    return new window.google.maps.Map(googleMapRef.current, {
      zoom: zoomLevel ? zoomLevel : 15,
      center: {
        lat: parseFloat(origin.latitude),
        lng: parseFloat(origin.longitude)
      }
    })
  }

  const mapPlotCircuit = (locations) => {
    // Initialize direction, elevation, and render services
    const directionsService = new window.google.maps.DirectionsService()
    const elevationService = new window.google.maps.ElevationService()
    const directionsRenderer = new window.google.maps.DirectionsRenderer()
    // Set map and directions container to render in
    directionsRenderer.setMap(googleMap.current)
    directionsRenderer.setPanel(googleMapSidePanelRef.current)
    // Setup origin, destination, and waypoints
    const waypoints = locations.map(location => {
      return {
        location: new window.google.maps.LatLng({
          lat: parseFloat(location.latitude),
          lng: parseFloat(location.longitude)
        }),
        stopover: true
      } 
    })
    const origin = waypoints.shift().location
    const destination = waypoints.pop().location
    const circuit = {
      origin: origin,
      destination: destination,
      waypoints: waypoints,
      optimizeWaypoints: true,
      travelMode: window.google.maps.TravelMode.WALKING
    }
    // Make directions service request
    directionsService.route(circuit, (response, status) => {
        if (status === "OK") {
          // Render directions on map
          directionsRenderer.setDirections(response)

          // Pull distance from each let to calculate total distance (Note distance is in meters so 1603.34 m/mile conversion is used)
          const totalDistance = (response.routes[0].legs.reduce((sum, current) => sum + current.distance.value, 0))/1603.34

          // Make a request for elevation data
          const sampleCount = 100
          elevationService.getElevationAlongPath({path: response.routes[0].overview_path, samples: sampleCount }, (elevationData, status) => {
            if (status !== "OK") {
              window.alert("Cannot show elevation: request failed because " + status)
              return
            }
            // Plot elevation data
            plotElevation(elevationData, sampleCount, totalDistance)
          })
        } else {
          window.alert("Directions request failed due to " + status)
        }
      }
    )
  }
  
  function plotElevation(elevationData, sampleCount, totalDistance) {
    // Set map and directions container to render in
    const googleMapBottomPanel = googleMapBottomPanelRef.current
    
    // Prepare data for plotting
    const elevation = elevationData.map(elevation => {return elevation.elevation})
    const distance = [0]
    let i
    for (i = 0; i < sampleCount-1; i++) {
      const x = distance[i] + totalDistance/sampleCount
      // Note weird rounding since javascrip is bad with numbers
      distance.push(Math.round(x * 100) / 100)
    }
    // Creat elevation line chart
    new Chart(googleMapBottomPanel, {
      type: 'line',
      data: {
        labels: distance,
        datasets: [{
          label: "Elevation (ft)",
          data: elevation,
          boarderColor: "#69E5AE",
          fill: false
        }]
      },
      options: {
        legend: {display: false},
        responsive: true,
        aspectRatio: 7.5,
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Elevation (ft)'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Total Distance (miles)'
            }
          }]
        }     
      }
    })
  }

  return (
    <Card className="mb-4">
      <CardGroup>
        <Card className="col-8" id="google-map" ref={googleMapRef} style={mapSize ? mapSize : {width: '100%', height: '50vh'}} />
        <Card className="col-4" id="google-map-side-panel" ref={googleMapSidePanelRef} style={{maxHeight: "50vh", overflowY: "scroll"}}/>
      </CardGroup>
      <Card maxHeight="20vh">
        <canvas id="google-map-bottom-panel" ref={googleMapBottomPanelRef} />
      </Card>
    </Card>
  )
}

export default CircuitMap