import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import Modal from './Modal';

export default class Probability extends Component {
  state = {
    counter: 0,
    probability: "",
    lumaOdds: 0,
    until50: 4159,
    until90: 13815,
    input: ""
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
        counter: this.state.counter + parseInt(1),
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
      probability: "",
      lumaOdds: 0,
      until50: 4159,
      until90: 13815,
      input: ""
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

  info = () => {
    console.log("heyyyy")
  }

  handleSubmit = (e) => {
    console.log(this.state.input)

    this.setState({
      counter: parseInt(this.state.input)
    }, ()=> {
      this.setState(
        {
          lumaOdds: (1 - (5999 / 6000) ** this.state.counter) * 100,
          until50: 4159 - this.state.input,
          until90: 13815 - this.state.input,
          input: ""
        },
        () => {
          console.log("Odds of getting a luma are", this.state.lumaOdds);
        }
      );
    })

    e.preventDefault()
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  render() {
    return (
      <div>
        {/* <Modal/> */}
        {this.showCounter()}

        <form onSubmit={this.handleSubmit}>
          <label>
            Manually set counter:
            <input
              type="number"
              value={this.state.input}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <br />
        <div className="counter-buttons">
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

            <div className="egg">
            </div>
      </div>
    );
  }
}
