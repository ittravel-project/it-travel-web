import React from 'react'
import ReactMarkdown from 'react-markdown'

const Post = ({ post, onDeletePost }) => {
 const handleDelete = () => onDeletePost(post.id)

 return (
   <div className="card mb-4">
     <img src={post.attachment} className="card-img-top" alt="post" />

     <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <ReactMarkdown
          source={post.message}
          escapeHtml={false}
        />

       <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>
     </div>

   </div>
 )
}

export default Post