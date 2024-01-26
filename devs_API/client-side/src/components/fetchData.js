import React, { Component } from "react";

class Devs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devs: [],
    };

    this.lngRef = React.createRef();
    this.latRef = React.createRef();
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  render() {
    const { devs } = this.state;
    const devList = devs.map((dev, index) => (
      <li key={index}>
        <span className={dev.laisvas ? "free" : "busy"}></span>
        <span className="name">{dev.vardas}</span>
        <span className="rank">{dev.tech.join(", ")}</span>
        <span className="dist">{Math.floor(dev.distance / 1000)} km</span>
      </li>
    ));

    return (
      <div id="dev-container">
        <form id="search" onSubmit={this.handleSubmit}>
          <label>Ilguma:</label>
          <input
            type="number"
            ref={this.lngRef}
            placeholder="ilguma"
            required
          />
          <label>Platuma:</label>
          <input
            type="number"
            ref={this.latRef}
            placeholder="platuma"
            required
          />
          <input type="submit" value="Rasti programuotojus" />
        </form>
        <ul>{devList}</ul>
      </div>
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const lng = this.lngRef.current.value;
    const lat = this.latRef.current.value;

    fetch(`/api/programuotojai/?lng=${lng}&lat=${lat}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json) => {
        this.setState({
          devs: json,
        });
      })
      .catch((error) => {
        console.error("Error during fetch:", error.message);
      });
  };

  fetchDevs = async () => {
    try {
      const response = await fetch("/api/programuotojai");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      if (response.ok) {
        const json = await response.json();
        if (this.isComponentMounted) {
          this.setState({
            devs: json,
          });
        }

        return json;
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      throw error;
    }
  };
}

export default Devs;
