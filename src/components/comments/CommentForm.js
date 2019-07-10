import React, { Component } from "react";
import CommentService from '../../services/CommentService'

export default class CommentForm extends Component {  
  constructor(props) {
    super(props);

    this.state = {
      error: "",

      comment: {
        name: "",
        textg: ""
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
 
    this.setState({ error: "" });
 
    let { comment } = this.state;

    CommentService.createComment(this.props.match.params.postId ,comment)
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
    return this.state.comment.name !== "" && this.state.comment.text !== "";
  }

  renderError() {
    return this.state.error ? (
      <div className="alert alert-danger">{this.state.error}</div>
    ) : null;
  }

  render() {
    return (
      <React.Fragment>
        <form method="post" onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              onChange={this.handleFieldChange}
              value={this.state.comment.name}
              className="form-control"
              placeholder="😎 Your Name"
              name="name"
              type="text"
            />
          </div>

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

          <div className="form-group">
            <button disabled={this.state.loading} className="btn btn-primary">
              Comment ➤
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}