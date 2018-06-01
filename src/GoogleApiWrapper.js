import React, { Component } from "react";
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

import { policeFeed } from "./services/police-rss";
import cities from "./services/cities.json";
import icons from "./services/icons";
import filterPlaces from "./services/filterPlaces";

const MapWithAMarker = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={5}
      defaultCenter={{
        lat: 59.334591,
        lng: 18.06324
      }}
    >
      {new google.map}
      {console.log('here:', props)}
      {props.children}
    </GoogleMap>
  ))
);

export class MapContainer extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      incidents: null
    };
  }

  componentWillMount() {
    policeFeed()
      .then(items => items.map(i => filterPlaces(cities, i)))
      // .then(data => data.map(i => ({ ...i, icon: icons[i.incident] })))
      .then(data => {
        console.log();

        this.setState({
          posts: icons(data)
          // incidents: data.reduce((results, item) => {
          //   let incident = item.title.split(", ").slice(1)[0];
          //   results[incident] = results[incident]
          //     ? { ...results[incident], amount: results[incident].amount + 1 }
          //     : { amount: 1, icon: icons[incident] };
          //   return results;
          // }, {})
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
    console.log(this.state.incidents);
    return (
      <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAMSUu2a5IxsoYCRUoNoP0TJ6bB5mNgxSo&v=3.exp"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `720px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        lol={"lol"}
      >
        {console.log(this.props)}
        {this.state.posts.map((post, key) => {
          console.log(post.center)
          return(
          <Marker
            key={key}
            title={post.incident}
            name={key}
            onClick={this.onMarkerClick}
            icon={{
              url: post.icon,
              // anchor: new google.maps.Point(11, 11),
              // scaledSize: new google.maps.Size(22, 22)
            }}
            position={{ lat: parseFloat(post.center.latitude), lng: parseFloat(post.center.longitude) }}

            // position={
            //   new google.maps.LatLng(post.center.latitude, post.center.longitude)
            // }
          />
        )})
      }
      </MapWithAMarker>
      // <Map
      //   google={this.props.google}
      //   onClick={this.onMapClicked}
      //   initialCenter={{
      //     lat: 59.334591,
      //     lng: 18.06324
      //   }}
      //   zoom={5}
      // >
      //   {this.state.posts.map((post, key) => (
      //     <Marker
      //       key={key}
      //       title={post.incident}
      //       name={key}
      //       onClick={this.onMarkerClick}
      //       icon={{
      //         url: post.icon,
      //         anchor: new this.props.google.maps.Point(11, 11),
      //         scaledSize: new this.props.google.maps.Size(22, 22)
      //       }}
      //       position={{
      //         lat: post.center.latitude,
      //         lng: post.center.longitude
      //       }}
      //     />
      //   ))}

      //   <InfoWindow
      //     marker={this.state.activeMarker}
      //     visible={this.state.showingInfoWindow}
      //   >
      //     <div>
      //       {this.state.selectedPlace ? (
      //         <div>
      //           {console.log(this.state.selectedPlace)}
      //           <h2>{this.state.selectedPlace.title}</h2>
      //           <p>{this.state.selectedPlace.content}</p>
      //           <a href={this.state.selectedPlace.link}>Go to Post</a>
      //         </div>
      //       ) : null}
      //     </div>
      //   </InfoWindow>
      // </Map>
    );
  }
}

export default MapContainer;

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyAMSUu2a5IxsoYCRUoNoP0TJ6bB5mNgxSo"
// })(MapContainer);
