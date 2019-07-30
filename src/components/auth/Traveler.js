import React from 'react'
import NavBar from '../misc/NavBar';
import AuthService from '../../services/AuthService';
import PostService from '../../services/PostService'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const defaultPic = 'http://ecuciencia.utc.edu.ec/media/foto/default-user_x5fGYax.png'


class User extends React.Component {
  state = {
    user: {
      name:'',
      city:'',
      description: '',
      avatarURL: '',
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

  render() {
    const { user } =  this.state;

    return (
      <div className="box mx-auto Profile">
      <div className="col-12 pt-4 text-center profileInfo">
          <div className="pl-3">
            <label htmlFor="avatar"><img src={user.avatarURL || defaultPic} className="rounded-circle mb-3" alt="Cinque Terre" width="200" height="150"/></label>
          </div>
        <div>
          <h1 className="shadow"><b>Username:</b>{user.name} </h1>
        </div>
        <div>
          <h1 className="shadow"><b>City:</b> {user.city}</h1>
        </div>
        <div>
          <h1 className="shadow"><b>Description:</b> {user.description}</h1>
        </div>
      </div>
      <div className="col-12 pt-2 text-center ActivityFeedTitle">
        <h2>Activity Feed</h2>
    </div>
      <div className="col-12 pt-2 text-center ActivityFeedTraveler"> 

          {this.state.posts.map((post, i) => (
               <Card className="activityFeedCard">
               <CardContent>
                 <Typography className="cardTitle" color="textSecondary" gutterBottom>
                 {post && post.title}
                 </Typography>
                 <Link className="card-title" to={post && `/posts/${post.id}/comments`}><img  src={post && post.attachment} alt="" className="card-title-img"></img></Link>           
                   <Typography variant="body2" component="p">
                 </Typography>
               </CardContent>
               <CardActions>                  
               </CardActions>
             </Card>
            ))}  
          
        </div>
        <NavBar />
    </div>
    );
  }
}

export default User