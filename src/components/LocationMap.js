import React, {Component} from 'react'
import Card from 'react-bootstrap/Card'
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react'

export class LocationMap extends Component {

    state = {
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
      }

    onMarkerClick = (props, marker, event) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
    }


    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
            showingInfoWindow: false,
            activeMarker: null
            })
        }
    }

    render() {
        return (
            <Card style={{height: "50vh", width: "50vw"}}>
                <Map google={this.props.google}
                zoom={this.props.zoomLevel ? this.props.zoomLevel : 15}
                style={{height: "100%", width: "100%"}}
                initialCenter={{lat: parseFloat(this.props.latitude), lng: parseFloat(this.props.longitude)}}
                >
                    <Marker onClick={this.onMarkerClick} name={this.props.name} address={this.props.address}/>
                    <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.onClose} >
                        <h6>{this.state.selectedPlace.name}</h6>
                        <p>{this.state.selectedPlace.address}</p>
                    </InfoWindow>
                </Map>
            </Card>
        )
    }
}

export default GoogleApiWrapper({apiKey: ''})(LocationMap)