import React, { Component } from "react";
import Comments from "./Components/Comments";
import NewComment from "./Components/newComment";

import { database } from "./Firebase/firebase";

class App extends Component {
  state = {
    comments: []
  };

  sendComment = comment => {
    this.setState({
      comments: [...this.state.comments, comment]
    });
  };

  componentDidMount() {
    this.comments = database.ref("comments");
    this.comments.on("value", snapshot => {
      console.log(snapshot.val());
    });
  }

  render() {
    return (
      <div className="App">
        <NewComment sendComment={this.sendComment} />
        <Comments comments={this.state.comments} />
      </div>
    );
  }
}

export default App;
