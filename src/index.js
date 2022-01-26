import React, { Component } from "react";
import { render } from "react-dom";
import "./style.css";
import HeroImage from "./HeroImage";
import Gallery from "./Gallery";
import SideBar from "./SideBar";
import BottomBar from "./BottomBar";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      imageWithOutChanges: "https://assets.imgix.net/unsplash/alarmclock.jpg",
      imageSelected: "https://assets.imgix.net/unsplash/alarmclock.jpg",
      propertiesImage: {},
      history: ["https://assets.imgix.net/unsplash/alarmclock.jpg"],
      placeInHistory: 0,
      historyProperties: [{}],
      propertiesSelected: {},
      newUrlImage:''
    };
  }

  selectedImage(event) {
    this.setState({
      imageSelected: event,
      imageWithOutChanges: event,
      propertiesImage: {},
      history: [event],
      placeInHistory: 0,
      propertiesSelected: {}
    });
  }

  async setPropertieImage(event, propName) {
    let propertieFull = `${propName}=${event}`;
    await this.setState((prevState) => ({
      propertiesImage: {
        ...prevState.propertiesImage,
        [propName]: propertieFull
      }
    }));
    this.setState({
      historyProperties: this.state.historyProperties.concat([
        this.state.propertiesImage
      ])
    });
    let fullUrl = this.state.imageWithOutChanges + "?";
    if (this.state.placeInHistory >= this.state.history.length - 1) {
      for (const property in this.state.propertiesImage) {
        fullUrl += this.state.propertiesImage[property] + "&";
      }

      this.setState({
        imageSelected: fullUrl,
        history: this.state.history.concat([fullUrl]),
        placeInHistory: this.state.placeInHistory + 1
      });
    } else {
      for (const property in this.state.propertiesImage) {
        fullUrl += this.state.propertiesImage[property] + "&";
      }
      let newHistory = this.state.history.slice(
        0,
        this.state.placeInHistory === 0 ? 1 : this.state.placeInHistory
      );
      let newArray = newHistory.concat([fullUrl]);

      this.setState({
        imageSelected: fullUrl,
        history: newArray,
        placeInHistory: this.state.placeInHistory
      });
    }
  }

  async handleHistoryImages(value) {
    if (value === "deshacer") {
      await this.setState({
        placeInHistory: this.state.placeInHistory - 1,
        propertiesImage: this.state.historyProperties[
          this.state.placeInHistory - 1
        ],
        imageSelected: this.state.history[this.state.placeInHistory - 1]
      });
    } else {
      await this.setState({
        placeInHistory: this.state.placeInHistory + 1,
        propertiesImage: this.state.historyProperties[
          this.state.placeInHistory + 1
        ],
        imageSelected: this.state.history[this.state.placeInHistory + 1]
      });
    }
  }


  render() {
    return (
      <div className="app-container">
        <a href="https://www.linkedin.com/in/fausto-castillo/" target="_blank" className="signature">Developed by Fausto Castillo &#10024;</a>
        <div>
          <SideBar
            changePropertiesImage={(event, propName) =>
              this.setPropertieImage(event, propName)
            }
            propertiesSelected={this.state.propertiesImage}
          />
        </div>
        <div style={{ width: "100%" }}>
          <div className="container-images">
            <HeroImage image={this.state.imageSelected} />
            <Gallery selectedImage={(event) => this.selectedImage(event)} newUrlImage={this.state.newUrlImage}/>
          </div>
          <BottomBar
            linkImage={this.state.imageSelected}
            length={this.state.history.length}
            placeInHistory={this.state.placeInHistory}
            handleNewImage={(event) => this.setState({newUrlImage : event , imageSelected : event})}
            handleHistory={(event) => this.handleHistoryImages(event)}
          />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
