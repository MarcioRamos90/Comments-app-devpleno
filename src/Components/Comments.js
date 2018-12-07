import React, { Component } from "react";
import Comment from "./Comment";

class Comments extends Component {
  render() {
    const keys = Object.keys(this.props.comments);
    return (
      <div>
        {keys.map(key => {
          return <Comment c={this.props.comments[key]} key={key} />;
        })}
      </div>
    );
  }
}

export default Comments;
