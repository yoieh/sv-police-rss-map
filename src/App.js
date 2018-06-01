import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";

import Map from "./Map";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    console.log();
    return (
      <div className="App">
        <Map
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAMSUu2a5IxsoYCRUoNoP0TJ6bB5mNgxSo&v=3.exp"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={
            <div style={{ height: `${this.state.height}px` }} />
          }
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default App;
