import React, { Component } from 'react';
// import NewComponent from './NewComponent';
import './Home.css'
import { Redirect } from 'react-router-dom';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        name: "",
        email: "",
        password: "",
      },
      submitted: false,
    }
    this.handleFChange = this.handleFChange.bind(this);
    this.handleLChange = this.handleLChange.bind(this);
    this.handleCChange = this.handleCChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/user', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
      });
  }

  handleFChange(event) {
    this.state.formData.name = event.target.value;
  }
  handleLChange(event) {
    this.state.formData.email = event.target.value;
  }
  handleCChange(event) {
    this.state.formData.password= event.target.value;
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Register</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" value={this.state.name} onChange={this.handleFChange}/>
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" value={this.state.email} onChange={this.handleLChange}/>
            </div>
            <div className="form-group">
                <label>password</label>
                <input type="password" className="form-control" value={this.state.password} onChange={this.handleCChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

        {this.state.submitted && <Redirect to={'/Login'}></Redirect>}

      </div>
    );
  }
}

export default Register;