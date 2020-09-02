import React, {useState, useEffect, useRef, createRef} from 'react'
import {connect} from 'react-redux'
import Chart from 'chart.js'
import {CardGroup, Card} from 'react-bootstrap'
import {updateDistanceElevationCircuit} from '../actions/circuit.js'
import CommonNavigationBar from './CommonNavigationBar.js'

const CircuitMap = ({locations, hideDirectionsDefault, mapSize, circuitId, storedDistance, storedElevation ,updateDistanceElevationCircuit}) => {
  const googleMapRef = createRef()
  const googleMapSidePanelRef = createRef()
  const googleMapBottomPanelRef = createRef()
  const googleMap = useRef()
  
  useEffect(() => {
    // Load google maps and visualizer scripts if (one is not already loaded) 
    if (!document.getElementById("googleMapScript")) {
      const googleMapScript = document.createElement('script')
      googleMapScript.id = "googleMapScript"
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API}&libraries=places`
      window.document.body.appendChild(googleMapScript)

      // Add event listener to wait for script to load (Should probably also wait for visualizer to load)
      googleMapScript.addEventListener('load', () => {
        // Render Map
        googleMap.current = createGoogleMap(locations[0])
        // Get directions and elevation then render directions, path, and elevation chart
        mapPlotCircuit(locations)
      })
    } else {
      // Render Map
      googleMap.current = createGoogleMap(locations[0])
      // Get directions and elevation then render directions, path, and elevation chart
      mapPlotCircuit(locations)
    }
    /// eslint-disable-next-line (Used to ignore error of blank array in following line, this use used to make effect run only on mount)
  },[])
  const createGoogleMap = (origin) => {
    return new window.google.maps.Map(googleMapRef.current, {
      zoom: 15,
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
            plotElevation(elevationData, sampleCount, Math.round(totalDistance*100)/100)
          })
        } else {
          window.alert("Directions request failed due to " + status)
        }
      }
    )
  }
  
  const plotElevation = (elevationData, sampleCount, totalDistance) => {
    // Set map and directions container to render in
    const googleMapBottomPanel = googleMapBottomPanelRef.current
    // Prepare data for plotting (Note weird rounding since javascript is bad with numbers)
    // (Note distance is in meters so 0.3048 m/ft conversion is used)
    let minElevation = (elevationData[0].elevation/0.3048 * 100) / 100
    let maxElevation = minElevation
    const elevation = elevationData.map(elevation => {
      // Convert elevation to feet and find max/min elevation
      let currentElevation = (Math.round(elevation.elevation/0.3048 * 100) / 100)
      if (currentElevation < minElevation) {minElevation = currentElevation}
      if (currentElevation > maxElevation) {maxElevation = currentElevation}
      return currentElevation
    })
    const distance = [0]
    // Create points for plotting
    let i
    for (i = 0; i < sampleCount-1; i++) {
      const x = distance[i] + totalDistance/sampleCount
      // Note weird rounding since javascript is bad with numbers
      distance.push(Math.round(x * 100) / 100)
    }
    // Push to backend if distance/elevation doesnt match Google Maps
    // updateDistanceElevationCircuit
    const elevationGain = Math.round(maxElevation - minElevation)
    if (elevationGain !== storedElevation || totalDistance.toString() !== storedDistance) {
      console.log(totalDistance, elevationGain)
      updateDistanceElevationCircuit(circuitId, totalDistance.toString(), elevationGain.toString())
    }

    // Creat elevation line chart
    new Chart(googleMapBottomPanel, {
      type: 'line',
      data: {
        labels: distance,
        datasets: [{
          label: "Elevation (ft)",
          data: elevation,
          borderColor: "rgba(74, 137, 243, 1)",
          fill: true,
          backgroundColor: "rgba(74, 137, 243, 0.5)"
        }]
      },
      options: {
        legend: {display: false},
        responsive: true,
        aspectRatio: 7.5,
        tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
            title: (tooltipItem) => {return "Miles: " + tooltipItem[0].xLabel}
          }
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Elevation (ft)'
            },
            ticks:{
              beginAtZero: false,
              display: true,
              autoSkip: true,
              maxTicksLimit: 5
            }
          }]
        }     
      }
    })
  }

  const [showDirections, setShowDirections] = useState(hideDirectionsDefault ? false : true)

  const toggleDirections = () => {
    showDirections ? setShowDirections(false) : setShowDirections(true)
  }

  return (
    <Card className="p-0" style={{width: '100%', height: '100%'}}>
      <CommonNavigationBar
        variant="circuit-map"
        showSearch={false}
        showData={showDirections}
        toggleData={toggleDirections}
      />
      <CardGroup style={mapSize ? mapSize : {width: '100%', height: '45vh'}}>
        <Card className="m-0 rounded-0" ref={googleMapRef} style={{width: '100%', height: '100%'}} />
        <Card className="col-4 m-0 p-0 rounded-0" style={{maxHeight: "100%", overflowY: "scroll", display: showDirections ? "block" : "none"}} >
          <Card.Header className="text-center">Directions</Card.Header>
          <Card.Body className="p-1" ref={googleMapSidePanelRef} />
        </Card>
      </CardGroup>
      <Card className="m-0 rounded-0 rounded-bottom" style={{height:"10vh"}}>
        <canvas ref={googleMapBottomPanelRef} />
      </Card>
    </Card>
  )
}

const mapStateToProps = state => {
  return {
      circuitId: state.circuit.selected.id,
      locations: state.circuit.selected.breweries,
      storedDistance: state.circuit.selected.distance,
      storedElevation: state.circuit.selected.elevation
  }
}

const mapDispatchToProps = dispatch => {
  return {
      updateDistanceElevationCircuit: (circuitId, distance, elevation) => {dispatch(updateDistanceElevationCircuit(circuitId, distance, elevation))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CircuitMap)