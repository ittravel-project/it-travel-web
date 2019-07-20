import React from 'react';
import { Switch, Route } from 'react-router-dom'; 
import Home from './components/auth/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profile from './components/auth/Profile';
import PrivateRoute from './guards/PrivateRoute';
import Main from './components/misc/Main';
import ProfileEdit from './components/auth/ProfileEdit';
import CreatePost from './components/posts/CreatePost';
import PostsBase from './components/posts/PostBase';
import CommentBase from './components/comments/CommentBase';
import Traveler from './components/auth/Traveler'


class App extends React.Component {
  render(){
    return (
      <div className="App">
      <main>
      <Switch>
          <Route exact path='/' component={Main} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/create' component={CreatePost} />
          <PrivateRoute exact path='/profile' component={Profile} />
          <PrivateRoute exact path='/profile/edit' component={ProfileEdit} />
          <PrivateRoute exact path='/posts' component={PostsBase} />
          <PrivateRoute exact path='/posts/new' component={CreatePost} />
          <PrivateRoute exact path='/home' component={Home} />
          <PrivateRoute exact path='/posts/:postId/comments' component ={CommentBase} />
          <PrivateRoute exact path='/profile/:userId' component ={Traveler} />


        </Switch>
      </main>
      
        
       
      </div>
    );
  }

}

export default App;
