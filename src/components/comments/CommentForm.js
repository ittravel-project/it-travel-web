import React from "react";
import CommentService from '../../services/CommentService'

class CommentForm extends React.Component {  
  constructor(props) {
    super(props);

    this.state = {
      error: "",

      comment: {
        text: ""
      }
    };
    
    this.handleFieldChange = this.handleFieldChange.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

  }

  handleFieldChange = event => {
    const { value, name } = event.target;

    this.setState({
      ...this.state,
      comment: {
        ...this.state.comment,
        [name]: value
      }
    });
  };
 
  onSubmit(e) {
    e.preventDefault();

    if (!this.isFormValid()) {
      this.setState({ error: "All fields are required." });
      return;
    }
  
    const { comment } = this.state;
    
    CommentService.createComment(this.props.match.params.postId, { text: comment.text, name: "todo"})
      .then(res => res.data)
      .then(res => {
        if (res.error) {
          this.setState({ error: res.error });
        } else {
          comment.time = res.time;
          this.props.addComment(comment);
 
          this.setState({
            comment: { ...comment, text: "" }
          });
        }
      })
      .catch(err => {
        console.log(err)
        this.setState({
          error: "Something went wrong while submitting form.",
        });
      });
  }
 
  isFormValid() {
    return this.state.comment.text !== "";
  }

  renderError() {
    return this.state.error ? (
      <div className="alert alert-danger">{this.state.error}</div>
    ) : null;
  }

  render() {
    return (
      <React.Fragment>
        <form method="post" onSubmit={this.onSubmit} className="CommentForm">

          <div className="form-group">
            <textarea
              onChange={this.handleFieldChange}
              value={this.state.comment.text}
              className="form-control"
              placeholder="🤬 Your Comment"
              name="text"
              rows="5"
            />
          </div>

          {this.renderError()}

          <div className="form-group pb-0">
            <button disabled={this.state.loading} className="btn btn-primary p-2">
              Comment ➤
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}


export default CommentForm