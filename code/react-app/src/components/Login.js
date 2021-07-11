import React, { Component } from 'react';
import './NewPerson.css';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        email: "",
        password: "",
      },
      logged_in: 4,
    }
    this.handleFChange = this.handleFChange.bind(this);
    this.handleLChange = this.handleLChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSession(event) {
    if(this.state.logged_in===2){
        localStorage.setItem('isAuth',1);
        localStorage.setItem('email',this.state.formData.email);
        window.location.reload();
    }
    if(this.state.logged_in===3){
      localStorage.setItem('isAuth',2);
      localStorage.setItem('email',this.state.formData.email);
      window.location.reload();
  }

  }
  handleSubmit (event) {
    event.preventDefault();
    var url;
    //localStorage.setItem('email',this.state.formData.email);
    url = 'http://localhost:8080/loginuser/'
    fetch(url, {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
   .then(response => response.json())
   .then(logged_in => 
    {
      this.setState({logged_in: logged_in});
      console.log(this.state.logged_in);
      this.handleSession();
    });
  }

  handleFChange(event) {
    this.state.formData.email = event.target.value;
  }
  handleLChange(event) {  
    this.state.formData.password = event.target.value;
  }

  render() {
    if(localStorage.isAuth!="1" && localStorage.isAuth!="2" )
    {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">LOGIN!</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <input placeholder="Email Id" type="email" className="form-control" value={this.state.email} onChange={this.handleFChange}/>
            </div>
            <div className="form-group">
                <input placeholder = "Password" type="password" className="form-control" value={this.state.password} onChange={this.handleLChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

        {this.state.logged_in === 2  && <Redirect to={'/ViewGenres'} />}
         {this.state.logged_in === 3  && <Redirect to={'/ViewGenres'} />}         
        {this.state.logged_in === 1 && <h2>Wrong Password</h2>}
        {this.state.logged_in === 0 && <h2>No such email id exists</h2>}

      </div>
    );
  }
  else if(localStorage.isAuth==="1" || localStorage.isAuth==="2")
  {
    return(
      <div>
        <Router>
      <div className="App">
        <h1>You are already logged in.</h1>
        <a href="http://localhost:3000/"><button type="submit" className="btn btn-default">Submit</button></a>
      </div>
      </Router>
      </div>
    )
  }
}
}

export default Login;
