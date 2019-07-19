import React from 'react'
import PostService from '../../services/PostService';
import ReactMarkdown from 'react-markdown'


class PostDetail extends React.Component {
    state = {
        post: {},
    }

    fetchPosts = () => {
        PostService.getPosts().then(
            response => {
                const posts = response.data;
                const post = posts.filter(post => post.id === this.props.match.params.postId)
                this.setState({ post: post[0] })
            }
        )
    }

    componentDidMount () {
        this.fetchPosts()
    }

    render(){
        return (
            <article className="PostDetail">
                 <header className="CommentBase-header">
                    <img src={this.state.post.attachment} alt='logo' className="postPageImage"/>
                    <p>{this.state.post.city}</p>
                    <div className="postDescriptionScroll">
                        <ReactMarkdown
                        source={this.state.post.message}
                        escapeHtml={false}
                        />
                    </div>
                  
                </header>
            </article>
        )
    }
}


export default PostDetail