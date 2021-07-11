import React, { Component } from 'react';
import './ViewPeople.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class ViewQuizes extends Component {
  constructor(params) {
    super(params);
    this.state = {
      data: [],
      genre:params.match.params.genre
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/genre/'+this.state.genre);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All Quizes</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Quizes</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      {/* <td>{item.id}</td> */}

                      {/* <td>{item.qtype}</td> */}
                      <td><li><Link to={'/ViewQuestions/'+item.id}>{item.qtype}</Link></li></td>
                  </tr>
                )
             })}
          </tbody>
       </table>
        {localStorage.isAuth=="2" && <Link to={'/CreateQuiz/'+this.state.genre}>Create Quiz</Link>}
        <br></br>
        {localStorage.isAuth=="2" && <Link to={'/DeleteQuiz/'+this.state.genre}>Delete Quiz</Link>}
      </div>
    );
  }
}

export default ViewQuizes;