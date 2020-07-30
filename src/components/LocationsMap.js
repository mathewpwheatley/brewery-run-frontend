import React, {useEffect, useRef} from 'react'
import {Card} from 'react-bootstrap'

const LocationsMap = ({locations, mapSize, zoomLevel}) => {
  const googleMapRef = React.createRef()
  const googleMap = useRef()

  useEffect(() => {
    const googleMapScript = document.createElement('script')
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API}&libraries=places`
    window.document.body.appendChild(googleMapScript)

    googleMapScript.addEventListener('load', () => {
      googleMap.current = createGoogleMap(locations[0])
      mapLocationMarkers(locations)
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

  const mapLocationMarkers = (locations) => {
    // Initialize bounds and info window object to add markers into
    const mapBounds = new window.google.maps.LatLngBounds()
    const infoWindow = new window.google.maps.InfoWindow()
    // Map all locations to a marker
    locations.forEach(location => {
      // Create position object
      const position = new window.google.maps.LatLng({
        lat: parseFloat(location.latitude),
        lng: parseFloat(location.longitude)
      })
      // Add current position to bounds object
      mapBounds.extend(position)
      // Create map marker
      const marker = new window.google.maps.Marker({
        position: position,
        title: location.name,
        map: googleMap.current
      })
      // Create marker click events to display info window
      window.google.maps.event.addListener(marker, "click", () => {
        infoWindow.setContent(
          `<h6>${location.name} (Rating: ${location.rating})</h6>` +
          `<p>${location.full_address}</p>`
        )
        infoWindow.open(googleMap.current, marker)
      })
    })
    // Center the map to fit all markers if there are multiple markers
    if (locations.length > 1) {googleMap.current.fitBounds(mapBounds)}
  }

  return (
    <Card id="google-map" ref={googleMapRef} style={mapSize ? mapSize : {width: '100%', height: '50vh'}} />
  )
}

export default LocationsMap