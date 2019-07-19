import React from 'react'
import {withAuthConsumer} from '../../contexts/AuthStore'
import AuthService from '../../services/AuthService'
import NavBar from '../misc/NavBar';
import Post from '../posts/Post';
import PostService from '../../services/PostService';
import { Link } from 'react-router-dom'


class Profile extends React.Component {
  state = {
    user: {
        name:'',
        city:'',
        description: '',
        email: '',
        password: '',
        avatarURL: 'http://ecuciencia.utc.edu.ec/media/foto/default-user_x5fGYax.png',
        avatar: ''
    },
    posts: []
  }

  isValid = () => {
    return !Object.keys(this.state.user)
      .some(attr => this.state.errors[attr])
  }

  fetchPosts = () => {
    PostService.getPosts({ creater: this.state.user.id }).then(
      response => {
        this.setState({ posts: response.data })
      }
    )
  }

  componentDidMount() {
    AuthService.getProfile()
    .then(
      (user) => this.setState({ user: {...this.state, ...user} }),
      (error) => console.error(error)
    ) 
    this.fetchPosts()
  }

  render() {
    const { user } =  this.state;

    return (
      <div className="box mx-auto">
       <div className='Home-image'>
          <img src='https://img.jakpost.net/c/2018/01/11/2018_01_11_38768_1515668901._large.jpg' alt="" width='420px' height='200px'/>
        </div>
        <div className="col-6 pt-4 ">
            <div>
              <label htmlFor="avatar" className="avatar"><img src={user.avatar ? URL.createObjectURL(user.avatar) : user.avatarURL} className="rounded-circle mb-3 profile-pic" alt="Cinque Terre" width="304" height="236"/></label>
            </div>
            <Link to="/profile/edit" className="btn btn-primary">Edit Profile</Link>
          <div>
            <h1>Username</h1>
            <p>{user.name}</p>
          </div>
          <div>
            <h1>City</h1>
            <p>{user.city}</p>
          </div>
          <div>
            <h1>Description</h1>
            <p>{user.description}</p>
          </div>
        </div>
        <div>
            <h1>Activity Feed</h1>

            {this.state.posts.map((post, i) => (
                <Post post={post} key={i} onClick={this.deletePost} isDelete/>
              ))}  
            
          </div>
          <NavBar />
      </div>
    );
  }
}

export default withAuthConsumer(Profile)