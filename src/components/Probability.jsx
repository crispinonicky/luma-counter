import React, { Component } from "react";

export default class Probability extends Component {
  state = {
    counter: 0,
    probability: "",
    lumaOdds: 0,
    until50: 4159,
    until90: 13815
  };

  reset = () => {
    this.setState(
      {
        counter: 0
      },
      () => {
        console.log("Successfully reset the counter");
        console.log(this.state.counter);
      }
    );
  };

  addOne = () => {
    this.setState(
      {
        counter: this.state.counter + 1,
        until50: this.state.until50 - 1,
        until90: this.state.until90 - 1
      },
      () => {
        this.setState(
          {
            lumaOdds: (1 - (5999 / 6000) ** this.state.counter) * 100
          },
          () => {
            console.log("Odds of getting a luma are", this.state.lumaOdds);
          }
        );
        console.log("Successfully added to the counter");
        console.log(this.state.counter);
      }
    );
  };

  subtractOne = () => {
    if (this.state.lumaOdds !== 0) {
      this.setState(
        {
          counter: this.state.counter - 1,
          until50: this.state.until50 + 1,
          until90: this.state.until90 + 1
        },
        () => {
          this.setState(
            {
              lumaOdds: (1 - (5999 / 6000) ** this.state.counter) * 100
            },
            () => {
              console.log("Odds of getting a luma are", this.state.lumaOdds);
            }
          );
          console.log("Successfully subtracted from the counter");
          console.log(this.state.counter);
        }
      );
    }
  };

  showCounter = () => {
    return (
      <div>
        <h1 className="beeg">{this.state.counter}</h1>
      </div>
    );
  };

  showProbability = () => {
    return (
      <div>
        <h2>Odds of having gotten a Luma: {this.state.lumaOdds.toFixed(3)}%</h2>
      </div>
    );
  };

  reset = () => {
    this.setState({
      counter: 0,
      lumaOdds: 0
    });
  };

  showUntil = () => {
    return (
      <div>
        <p>Until 50%: {this.state.until50}</p>
        <p>Until 90%: {this.state.until90}</p>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.showCounter()}

        <br />
        <div className = 'counter-buttons'>
        <button className="subtract" onClick={this.subtractOne}>
          -
        </button>
        <button className="add" onClick={this.addOne}>
          +
        </button>
        </div>

        {this.showProbability()}

        {this.showUntil()}

        <button className="reset" onClick={this.reset}>
          Reset Counter
        </button>
      </div>
    );
  }
}
