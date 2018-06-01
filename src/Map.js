/* global google */

import React, { Component } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

import { policeFeed } from "./services/police-rss";
import cities from "./services/cities.json";
import icons from "./services/icons";
import filterPlaces from "./services/filterPlaces";

class MapComponent extends Component {
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
      .then(data => data.map(i => ({ ...i, icon: icons[i.incident] })))
      .then(data => {
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

  togglePost = key => {
    this.setState({
      selected: key
    });
    // let posts = this.state.posts;
    // posts[key].open = !posts[key].open;
    // this.setState({
    //   posts: posts
    // });
  };

  render() {
    return (
      <GoogleMap
        defaultZoom={5}
        defaultCenter={new google.maps.LatLng(59.334591, 18.06324)}
        defaultOptions={{ maxZoom: 10, streetViewControl: false, mapTypeControl: false }}
      >
        {this.state.posts.map((post, key) => {
          return (
            <Marker
              key={key}
              title={post.incident}
              //name={key}
              onClick={() => this.togglePost(key)}
              icon={{
                url: post.icon,
                anchor: new google.maps.Point(12, 12),
                scaledSize: new google.maps.Size(24, 24)
              }}
              position={
                new google.maps.LatLng(
                  post.center.latitude,
                  post.center.longitude
                )
              }
            >
              {key === this.state.selected ? (
                <InfoWindow onCloseClick={() => this.togglePost(key)}>
                  <div>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <a href={post.link}>Go to Post</a>
                  </div>
                </InfoWindow>
              ) : null}
            </Marker>
          );
        })}
      </GoogleMap>
    );
  }
}

const Map = withScriptjs(
  withGoogleMap(props => {
    return <MapComponent {...props} />;
  })
);

export default Map;
