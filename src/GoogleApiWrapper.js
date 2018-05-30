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

  // onMarkerClick(key) {
  //   console.log(this)
  //   this.setState({
  //     selectedPlace: this.state.posts[key]
  //   })
  // }

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

  // onMarkerClick(props, marker, e) {
  //   console.log(props, marker, e);
  //   this.setState({
  //     selectedPlace: this.state.posts[props.name]
  //   });
  // }

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
            <h1>
              {this.state.selectedPlace ? this.state.selectedPlace.title : null}
            </h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAMSUu2a5IxsoYCRUoNoP0TJ6bB5mNgxSo"
})(MapContainer);
