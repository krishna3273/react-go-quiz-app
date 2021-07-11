import React, { Component } from 'react';
import './ViewPeople.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class ViewGenres extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/genre/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All Genres</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Genres</th>
              <th>Respective Leaderboard</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td><li><Link to={'/ViewGenres/'+item.name}>{item.name}</Link></li></td>
                      <td><li><Link to={'/Genreboard/'+item.name}>Click Here</Link></li></td>
                  </tr>
                )
             })}
          </tbody>
       </table>

       {localStorage.isAuth==2 && <Link to={'/CreateGenre'}>CreateGenre</Link>}
      </div>
    );
  }
}

export default ViewGenres;