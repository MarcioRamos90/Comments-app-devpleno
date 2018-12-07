import React, { Component } from "react";

class Comment extends Component {
  render() {
    return <div> {this.props.c.comment} </div>;
  }
}

export default Comment;
