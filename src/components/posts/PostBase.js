import React from 'react'
import { Link } from 'react-router-dom'
import PostsList from './PostList';

const PostsBase = () => (
 <article className="PostsBase">
   <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
     <h3>Posts</h3>
     <Link to="/posts/new" className="btn btn-primary">New Post</Link>
   </div>

   <PostsList/>
 </article>
)

export default PostsBase


