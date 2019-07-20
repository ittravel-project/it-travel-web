import React from 'react'
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import CommentService from '../../services/CommentService';
import PostDetail from '../posts/PostDetail';
import NavBar from '../misc/NavBar'



class CommentBase extends React.Component{
    constructor(props){
        super(props);

        this.state={
            comments:[],
            post: []
        };

        this.addComment = this.addComment.bind(this);
    }
       
    fetchPosts = () => {
        CommentService.getComments(this.props.match.params.postId).then(
            response => {
            this.setState({ comments: response.data.reverse() })
            }
        )
    }

    addComment() {
        this.fetchPosts()
    }

    componentDidMount() {
        this.fetchPosts()
    }

    render(){
        return(
            <div style={{height: '100vh'}}>
                <div className="CommentBase shadow">
                <PostDetail {...this.props}/>
                <div className='row commentBackground'>
                    <div className='col-5 '>
                        <h6 className="commentPostHeader">Comment on Post</h6>
                        <CommentForm {...this.props} addComment={this.addComment} />
                    </div>
                    <div className='col-6 pt-3 bg-white commentBox'>
                        <CommentList comments={this.state.comments} />
                    </div>
                </div>
                </div>
                <NavBar />
            </div>
        )
    }
}

export default CommentBase