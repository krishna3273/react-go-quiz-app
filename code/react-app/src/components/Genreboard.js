import React, { Component } from 'react';
import './ViewPeople.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Genreboard extends Component {
  constructor(params) {
    super(params);
    this.state = {
      data: [],
      genre:params.match.params.genre
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/genreboard/'+this.state.genre);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data},()=>{
            if(this.state.data!==null){
                this.state.data.sort((a,b)=>{
                    return b.score-a.score;
                });
            }
        }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">LEADERBOARD FOR EACH GENRE</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>genre</th>
              <th>usermail</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map((item, key) => {
               return (
                  <tr key = {key}>
                      {/* <td>{item.id}</td> */}
                      <td>{this.state.genre}</td>
                       <td>{item.email}</td>
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

export default Genreboard;