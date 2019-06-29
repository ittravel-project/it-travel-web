import React from 'react';
import { Switch, Route } from 'react-router-dom'; 
import Home from './components/misc/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profile from './components/auth/Profile';


class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/profile' component={Profile} />

        </Switch>
       
      </div>
    );
  }

}

export default App;
