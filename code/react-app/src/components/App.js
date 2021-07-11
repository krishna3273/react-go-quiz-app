import React, { Component } from 'react';
import Perfomance from './Perfomance'
import Register from './Register'
import ViewUsers from './ViewUsers'
import ViewGenres from './ViewGenres'
import ViewQuizes from './ViewQuizes'
import ViewQustions from './ViewQustions'
import CreateGenre from './CreateGenre'
import CreateQuiz from './CreateQuiz'
import CreateQuestion from './CreateQuestion'
import Login from './Login'
import DeleteQuiz from './DeleteQuiz'
import DeleteQuestion from './DeleteQuestion'
import UpdateQuestion from './UpdateQuestion'
import Leaderboard from './Leaderboard'
import Genreboard from './Genreboard'
import Deleteuser from './Deleteuser'
import Home from './Home';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class App extends Component {
  handleLogout(){
    localStorage.clear();
    window.location.reload()
  }
  render() {
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>Hello!</Link>
                </div>
                <ul className="nav navbar-nav">
                   {/* <li><Link to={'/'}>Home</Link></li> */}
                  {localStorage.isAuth==null && <li><Link to={'/Register'}>Register</Link></li>}
                  {localStorage.isAuth==2 && <li><Link to={'/ViewUsers'}>View users</Link></li>}
                  {localStorage.isAuth==2 && <li><Link to={'/Deleteuser'}>Delete users</Link></li>}
                    {(localStorage.isAuth==="1" || localStorage.isAuth==="2") && <li><Link to={'/ViewGenres'}>ViewGenres</Link></li>}
                  {localStorage.isAuth==null &&<li><Link to={'/Login'}>Login</Link></li>}
                  {/* <li><Link to={'/DeleteQuiz'}></Link></li>                   */}
                  {localStorage.isAuth==="1" && <li><Link to={'/Perfomance'}>PERFOMANCE</Link> </li> }
                  {(localStorage.isAuth==="1" || localStorage.isAuth==="2") && <li><Link to={'/Leaderboard'}>Leaderboard</Link> </li> }
                  {/* {localStorage.isAuth==="1" && <li><Link to={'/Genreboard/:genre'}>Genreboard</Link> </li> } */}
                  {(localStorage.isAuth==="1" || localStorage.isAuth==="2") && <li onClick={this.handleLogout} ><Link to={'/'}>Logout</Link></li> }
                </ul>
              </div>
            </nav>
            <Switch>
                  <Route exact path='/' component={Home} /> 
                 <Route exact path='/Register' component={Register} />
                 <Route exact path='/ViewUsers' component={ViewUsers} />
                 <Route exact path='/Deleteuser' component={Deleteuser} />
                 <Route exact path='/ViewGenres' component={ViewGenres} />
                 <Route exact path='/ViewGenres/:genre' component={ViewQuizes} />
                 <Route exact path='/ViewQuestions/:id' component={ViewQustions} />
                 <Route exact path='/CreateQuestion/:id' component={CreateQuestion} />
                  <Route exact path='/CreateQuiz/:genre' component={CreateQuiz} />
                 <Route exact path='/CreateGenre' component={CreateGenre} />
                 <Route exact path='/Login' component={Login} />
                 <Route exact path='/DeleteQuiz/:genre' component={DeleteQuiz} />
                  <Route exact path='/DeleteQuestion/:id' component={DeleteQuestion} />
                 <Route exact path='/UpdateQuestion/:id' component={UpdateQuestion} />
                 <Route exact path='/Perfomance' component={Perfomance} />
                 <Route exact path='/Leaderboard' component={Leaderboard} />
                 <Route exact path='/Genreboard/:genre' component={Genreboard} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
