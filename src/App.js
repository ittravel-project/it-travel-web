import React from 'react';
import { Switch, Route } from 'react-router-dom'; 
import Home from './components/auth/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profile from './components/auth/Profile';
import PrivateRoute from './guards/PrivateRoute';
import Main from './components/misc/Main';




class App extends React.Component {
  render(){
    return (
      <div className="App">
      <main>
      <Switch>
          <Route exact path='/' component={Main} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/profile' component={Profile} />
          <PrivateRoute exact path='/home' component={Home} />
        </Switch>
      </main>
        
       
      </div>
    );
  }

}

export default App;
