import React, { Component } from "react";

class NewComment extends Component {
  state = {
    newComment: ""
  };

  onChange = event => {
    this.setState({
      newComment: event.target.value
    });
  };

  sendComment = () => {
    this.props.sendComment(this.state.newComment);
    this.setState({
      newComment: ""
    });
  };

  render() {
    return (
      <div>
        <textarea value={this.state.newComment} onChange={this.onChange} />
        <button onClick={this.sendComment}>add</button>
      </div>
    );
  }
}

export default NewComment;
