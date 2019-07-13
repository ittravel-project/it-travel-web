import React from 'react'
import PostService from '../../services/PostService'
import Post from './Post';

class PostsList extends React.Component {
  state = {
    posts: []
  }

  fetchPosts = () => {
    PostService.getPosts().then(
      response => {
        this.setState({ posts: response.data })
      }
    )
  }

  componentDidMount() {
    this.fetchPosts()
  }

  deletePost = (postId) => {
    PostService.deletePost(postId).then(
      response => {
        this.fetchPosts()
      }
    )
  }

  render () {
    return (
      <div className="PostList">
        {this.state.posts.map((post, i) => (
          <Post post={post} key={i} onDeletePost={this.deletePost}/>
        ))}
      </div>
    )
  }
}

export default PostsList