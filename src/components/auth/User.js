import React from 'react'
import NavBar from '../misc/NavBar';
import PostsList from '../posts/PostList';
import AuthService from '../../services/AuthService';
import PostService from '../../services/PostService'
import Post from '../posts/Post';


class User extends React.Component {
  state = {
    user: {
      name:'',
      city:'',
      description: '',
      avatarURL: 'http://ecuciencia.utc.edu.ec/media/foto/default-user_x5fGYax.png',
      avatar: ''
  },
  posts: []
}

  fetchUser = () => {
    AuthService.getProfileById(this.props.match.params.userId)
    .then(
        (user) => {
          const profileUser = user.data.filter(user => user.id === this.props.match.params.userId)
          this.setState({ user: profileUser[0] }, () => { this.fetchPosts() })
        },
      )
  }


  fetchPosts = () => {
    PostService.getPosts({ creater: this.state.user.id }).then(
      response => {
        this.setState({ posts: response.data })
      }
    )
  }

  componentDidMount() {
    this.fetchUser()
  }

  deletePost = (postId) => {
    PostService.deletePost(postId).then(
      response => {
        this.fetchPosts()
      }
    )
  }


  render() {
    const { user } =  this.state;

    return (
      <div className="box mx-auto">
       <div className='Home-image'>
          <img src='https://img.jakpost.net/c/2018/01/11/2018_01_11_38768_1515668901._large.jpg' alt="" width='420px' height='200px'/>
        </div>
        <div className="col-6 pt-4 ">
            <div className="image-cropper">
              <label htmlFor="avatar" className="avatar"><img src={user.avatar ? URL.createObjectURL(user.avatar) : user.avatarURL} className="rounded mb-3 profile-pic" alt="Cinque Terre" /></label>
            </div>
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
                <Post post={post} key={i} onDeletePost={this.deletePost}/>
              ))}            
          </div>
          <NavBar />
      </div>
    );
  }
}

export default User