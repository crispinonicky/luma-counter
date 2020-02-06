import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import Modal from './Modal';

export default class Probability extends Component {
  state = {
    counter: 0,
    encounterRate: 1,
    encounterInput: 100,
    probability: "",
    lumaOdds: 0,
    encounterOdds: 0,
    until50: 4159,
    until90: 13815,
    encounter50: 4159,
    encounter90: 13815,
    input: 0
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
        until90: this.state.until90 - 1,
        encounter50: this.state.encounter50 - 1 * this.state.encounterRate,
        encounter90: this.state.encounter90 - 1 * this.state.encounterRate
      },
      () => {
        this.setState(
          {
            lumaOdds: (1 - (5999 / 6000) ** this.state.counter) * 100,
            encounterOdds: (1 - ((6000 / this.state.encounterRate - 1)/(6000 / this.state.encounterRate)) ** this.state.counter) * 100
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
          until90: this.state.until90 + 1,
          encounter50: this.state.encounter50 + 1 * this.state.encounterRate,
          encounter90: this.state.encounter90 + 1 * this.state.encounterRate,
        },
        () => {
          this.setState(
            {
              lumaOdds: (1 - (5999 / 6000) ** this.state.counter) * 100,
              encounterOdds: (1 - ((6000 / this.state.encounterRate - 1)/(6000 / this.state.encounterRate)) ** this.state.counter) * 100
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
      <div>
        <h2>Odds of having gotten any Luma: {this.state.lumaOdds.toFixed(3)}%</h2>
        {this.showUntil()}
      </div>
      <div>
    <h2>Odds of having gotten your desired Luma: {this.state.encounterOdds.toFixed(3)}%</h2>
    <div>
        <p>Until 50%: {Math.round(this.state.encounter50/this.state.encounterRate)}</p>
        <p>Until 90%: {Math.round(this.state.encounter90/this.state.encounterRate)}</p>
      </div>
      </div>
      </div>
    );
  };

  reset = () => {
    this.setState({
      counter: 0,
      encounterRate: 1,
      encounterInput: 100,
      probability: "",
      lumaOdds: 0,
      encounterOdds: 0,
      until50: 4159,
      until90: 13815,
      encounter50: 4159,
      encounter90: 13815,
      input: 0
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

  handleSubmit = (e) => {
    console.log(this.state.input)

    this.setState({
      counter: parseInt(this.state.input)
    }, ()=> {
      this.setState(
        {
          lumaOdds: (1 - (5999 / 6000) ** this.state.counter) * 100,
          encounterOdds: (1 - ((6000 / this.state.encounterRate - 1)/(6000 / this.state.encounterRate)) ** this.state.counter) * 100,
          until50: 4159 - this.state.input,
          until90: 13815 - this.state.input,
          encounter50: this.state.encounter50 - this.state.input * this.state.encounterRate,
          encounter90: this.state.encounter90 - this.state.input * this.state.encounterRate,
          input: 0
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

  handleEncounter = (e) => {
    this.setState({
      encounterInput: parseInt(e.target.value)
    }, ()=> {
      this.setState({
        encounterRate: this.state.encounterInput / 100
      })
      if (this.state.encounterInput > 100) {
        this.setState({
          encounterInput: 100
        }, ()=> {
          this.setState({
            encounterRate: this.state.encounterInput / 100
          }, ()=> {
            console.log(this.state)
          })
        })
      } else if (!this.state.encounterInput) {
      this.setState({
        encounterInput: 0
      }, ()=> {
        this.setState({
          encounterRate: this.state.encounterInput / 100
        }, ()=> {
          console.log(this.state)
        })
      })
    } 
    })
    e.preventDefault()
  }

  render() {
    return (
      <div>
        {this.showCounter()}

<div className = "forms">
        <form className = "manual" onSubmit={this.handleSubmit}>
            <span>
              Set counter:
              
              </span>
            <input
              type="number"
              min = "0"
              value={this.state.input}
              onChange={this.handleChange}
            />
          <button>Submit</button>
        </form>

        <br />

        <form className = "manual encounter" onSubmit={this.handleSubmit}>
            <span>
              Encounter rate:
              
              </span>
            <input
              type="number"
              min = "0"
              max = "100"
              value={this.state.encounterInput}
              onChange={this.handleEncounter}
            />
            <span>%</span>
        </form>   

        </div>     

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


<div>
        <button className="reset" onClick={this.reset}>
          Reset Counter
        </button>

</div>

            <div className="egg">
            </div>
      </div>
    );
  }
}
