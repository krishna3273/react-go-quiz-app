import React, { Component } from 'react';
import './ViewPeople.css';

class ViewUsers extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/user/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All Registered Users</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Name</th>
              <th>Email</th>
              <th>password</th>
              <th>Type of participant</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      {/* <td>{item.id}</td> */}
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.password}</td>
                      {item.isadmin==true && <td>ADMIN</td>}
                      {item.isadmin==false && <td>NORMAL USER</td>}
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
}

export default ViewUsers;