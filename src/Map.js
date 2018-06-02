/* global google */

import React, { Component } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

import SimpleLineIcon from "react-simple-line-icons";

import { policeFeed } from "./services/police-rss";
import cities from "./services/cities.json";
import icons from "./services/icons";
import filterPlaces from "./services/filterPlaces";
import MapControl from "./MapControl";

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      shownCollapse: [],
      hiddenIcons: []
    };
  }

  componentWillMount() {
    policeFeed()
      .then(items => items.map(i => filterPlaces(cities, i)))
      .then(data => icons(data))

      .then(data => {
        this.setState({
          posts: data
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

  toggleCollapse = key => {
    let shownCollapse = this.state.shownCollapse;

    if (shownCollapse.some(i => i === key)) {
      shownCollapse = shownCollapse.filter(i => i !== key);
    } else {
      shownCollapse.push(key);
    }
    this.setState({
      shownCollapse: shownCollapse
    });
  };

  filerIncident = name => {
    this.setState({
      posts: this.state.posts.map(
        post =>
          name === post.incident ? { ...post, hidden: !post.hidden } : post
      )
    });
  };

  filerIcon = id => {
    let hiddenIcons = this.state.hiddenIcons;

    if (hiddenIcons.some(i => i === id)) {
      hiddenIcons = hiddenIcons.filter(i => i !== id);
    } else {
      hiddenIcons.push(id);
    }

    console.log(hiddenIcons);

    this.setState({
      hiddenIcons: hiddenIcons
    });
  };

  render() {
    return (
      <GoogleMap
        defaultZoom={5}
        defaultCenter={new google.maps.LatLng(59.334591, 18.06324)}
        defaultOptions={{
          maxZoom: 10,
          streetViewControl: false,
          mapTypeControl: false
        }}
      >
        {this.state.posts
          ? this.state.posts.map((post, key) => {
              return !post.hidden &&
                !this.state.hiddenIcons.some(i => post.icon.id === i) ? (
                <Marker
                  key={key}
                  title={post.incident}
                  onClick={() => this.togglePost(key)}
                  icon={{
                    url: post.icon.uri,
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
              ) : null;
            })
          : null}
        <MapControl position={google.maps.ControlPosition.TOP_LEFT}>
          <div style={{ margin: "10px 0" }}>
            <button
              onClick={() => this.setState({ show: !this.state.show })}
              style={{
                padding: "5px",
                width: "100%",
                borderRadius: "5px",
                backgroundColor: "#fff"
              }}
            >
              {this.state.show ? (
                <span>
                  <SimpleLineIcon
                    name="layers
"
                  />
                  {"Hide filters"}
                </span>
              ) : (
                <span>
                  <SimpleLineIcon
                    name="layers
"
                  />
                  {"Show filters"}
                </span>
              )}
            </button>
            <div
              style={{
                overflow: "auto",
                maxHeight: "500px"
              }}
            >
              {this.state.show
                ? this.state.posts
                    .reduce((results, item, key) => {
                      let incident = item.title.split(", ").slice(1)[0];
                      let found = results.findIndex(i => i.name === incident);
                      found > -1
                        ? results[found].amount++
                        : results.push({
                            ...item,
                            amount: 1,
                            name: incident,
                            icon: item.icon.uri,
                            iconId: item.icon.id,
                            incidentId: key
                          });
                      return results;
                    }, [])
                    .sort(function(a, b) {
                      if (a.name < b.name) return -1;
                      if (a.name > b.name) return 1;
                      return 0;
                    })
                    .reduce((results, item) => {
                      let found = results.findIndex(i =>
                        i.find(i => i.icon === item.icon)
                      );
                      found > -1
                        ? results[found].push(item)
                        : results.push([item]);
                      return results;
                    }, [])
                    .map((i, key) => (
                      <div
                        key={key}
                        style={{
                          backgroundColor: "#fff"
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            background: "#c0c0c0",
                            padding: "5px",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            alignItems: "center"
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={
                              !this.state.hiddenIcons.some(
                                j => j === i[0].iconId
                              )
                            }
                            onChange={() => this.filerIcon(i[0].iconId)}
                          />
                          <img
                            width={20}
                            height={20}
                            src={i[0].icon}
                            style={{
                              marginLeft: "10px"
                            }}
                          />

                          <span
                            style={{
                              marginLeft: "10px"
                            }}
                          >
                            {i.reduce((result, j, key) => result + j.amount, 0)}
                          </span>
                          <span
                            onClick={() => this.toggleCollapse(key)}
                            style={{
                              marginLeft: "10px"
                            }}
                          >
                            {this.state.shownCollapse.some(i => i === key) ? (
                              <SimpleLineIcon name="arrow-up" />
                            ) : (
                              <SimpleLineIcon name="arrow-down" />
                            )}
                          </span>
                        </div>
                        <div>
                          {this.state.shownCollapse.some(i => i === key)
                            ? i.map((j, key) => (
                                <div
                                  key={key}
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    padding: "5px",
                                    paddingRight: "10px",
                                    alignItems: "center"
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={
                                      !j.hidden &&
                                      !this.state.hiddenIcons.some(
                                        j => j === i[0].iconId
                                      )
                                    }
                                    onChange={() => this.filerIncident(j.name)}
                                  />
                                  <span
                                    style={{
                                      marginLeft: "5px"
                                    }}
                                  >
                                    {j.name}
                                  </span>
                                  <span
                                    style={{
                                      marginLeft: "10px"
                                    }}
                                  >
                                    {j.amount}
                                  </span>
                                </div>
                              ))
                            : null}
                        </div>
                      </div>
                    ))
                : null}
            </div>
          </div>
        </MapControl>
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
