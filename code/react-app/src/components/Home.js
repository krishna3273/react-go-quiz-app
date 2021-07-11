import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
            <h1>WELCOME TO MY QUIZ APP</h1>
      </div>
    );
  }
}

export default Home;
