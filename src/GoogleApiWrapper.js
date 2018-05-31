import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

import { policeFeed } from "./services/police-rss";
import cities from "./services/cities.json";
import filterPlaces from "./services/filterPlaces";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentWillMount() {
    policeFeed()
      .then(items => items.map(i => filterPlaces(cities, i)))
      .then(data => {
        this.setState({
          posts: data
        });
      });
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: this.state.posts[props.name],
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <Map
        google={this.props.google}
        onClick={this.onMapClicked}
        initialCenter={{
          lat: 59.334591,
          lng: 18.06324
        }}
        zoom={5}
      >
        {this.state.posts.map((post, key) => (
          <Marker
            key={key}
            title={post.incident}
            name={key}
            onClick={this.onMarkerClick}
            // icon={{
            //   scaledSize: new this.props.google.maps.Size(32,32)
            // }}
            position={{
              lat: post.center.latitude,
              lng: post.center.longitude
            }}
          />
        ))}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            {this.state.selectedPlace ? (
              <div>
                {console.log(this.state.selectedPlace)}
                <h2>{this.state.selectedPlace.title}</h2>
                <p>{this.state.selectedPlace.content}</p>
                <a href={this.state.selectedPlace.link}>Go to Post</a>
              </div>
            ) : null}
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAMSUu2a5IxsoYCRUoNoP0TJ6bB5mNgxSo"
})(MapContainer);
