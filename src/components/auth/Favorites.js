import React from 'react'
import Post from '../posts/Post';
import PostService from '../../services/PostService'


class Favorites extends React.Component {
  constructor(props){
		super(props)
		this.state = {
		    posts: []	
		  }
	}

  render () {
  return (
    <div className="Favorites">
      <h4>Favorites</h4>

      <div className="row">
      {this.state.posts.map((post, i) => (
        <div className="col-12 mb-4" key={i}> 
        <Post post={post} isFavorite />
        </div>
       ))}

      </div>
    </div>
  );
      }
}

export default Favorites