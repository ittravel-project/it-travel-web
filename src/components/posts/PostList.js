import React from 'react'
import PostsService from '../../services/PostService'
import Post from './Post';

class PostsList extends React.Component {
 state = {
   posts: []
 }

 fetchPosts = () => {
   PostsService.getPosts().then(
     response => {
       this.setState({ posts: response.data })
     }
   )
 }

 componentDidMount() {
   this.fetchPosts()
 }

 deletePost = (postId) => {
   PostsService.deletePost(postId).then(
     response => {
       this.fetchPosts()
     }
   )
 }

 render () {
   return (
     <div className="PostsList">
       {this.state.posts.map((post, i) => (
         <Post post={post} key={i} onDeletePost={this.deletePost}/>
       ))}
     </div>
   )
 }
}

export default PostsList