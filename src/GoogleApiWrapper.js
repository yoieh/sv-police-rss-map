import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

import { policeFeed } from "./services/police-rss";
import cities from "./services/cities.json";
import filterPlaces from "./services/filterPlaces";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incidents: []
    };
  }

  componentWillMount() {
    policeFeed()
      .then(items => items.map(i => filterPlaces(cities, i)))
      .then(data => {
        this.setState({
          incidents: data
        });
      });
  }

  render() {
    return (
      <Map
        google={this.props.google}
        initialCenter={{
          lat: 59.334591,
          lng: 18.06324
        }}
        zoom={5}
      >
        {this.state.incidents.map((incident, key) => (
          <Marker
            key={key}
            title={"The marker`s title will appear as a tooltip."}
            name={"SOMA"}
            position={{
              lat: incident.center.latitude,
              lng: incident.center.longitude
            }}
          />
        ))}

        {/* <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow> */}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAMSUu2a5IxsoYCRUoNoP0TJ6bB5mNgxSo"
})(MapContainer);
