import React, { Component } from 'react';
import './ViewPeople.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Perfomance extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    //   genre:params.match.params.genre
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/perfomance/'+localStorage.email);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View Your Perfomance</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Genre</th>
              <th>Quiz</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      {/* <td>{item.id}</td> */}

                       <td>{item.genre}</td>
                      <td>{item.qtype}</td>
                      <td>{item.score}</td>
                      {/* <td>{item.qid}</td> */}
                      {/* <td>{item.}</td> */}
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
}

export default Perfomance;