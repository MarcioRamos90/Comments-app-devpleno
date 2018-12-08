import React, { Component } from "react";
import Comments from "./Components/Comments";
import NewComment from "./Components/newComment";
import Login from "./Components/auth/login";
import SignUp from "./Components/auth/SignUp";
import User from "./Components/auth/User";

import "bootstrap-css-only";

class App extends Component {
  state = {
    comments: [],
    isLoading: false,
    isAuth: false,
    isAuthError: false,
    authError: "",
    user: {},
    isSignUpError: false,
    signUpError: "",
    authScreen: "login" // signup
  };

  createAccount = async (email, passwd) => {
    const { auth } = this.props;
    // Limpando msg de erro
    this.setState({
      signUpError: "",
      isSignUpError: false
    });
    try {
      // se ok crair com sucesso
      await auth.createUserWithEmailAndPassword(email, passwd);
    } catch (err) {
      // se erro seta estados de erro
      this.setState({
        signUpError: err.code,
        isSignUpError: true
      });
    }
  };

  login = async (email, passwd) => {
    const { auth } = this.props;
    // Limpando msg de erro
    this.setState({
      authError: "",
      isAuthError: false
    });
    // tentando logar
    try {
      // se ok loga com sucesso
      await auth.signInWithEmailAndPassword(email, passwd);
    } catch (err) {
      // se erro seta estados de erro
      this.setState({
        authError: err.code,
        isAuthError: true
      });
    }
  };

  logout = () => {
    const { auth } = this.props;
    auth.signOut();
  };

  sendComment = comment => {
    const { database } = this.props;
    const id = database
      .ref()
      .child("comments")
      .push().key;
    const comments = {};
    comments["comments/" + id] = {
      comment,
      email: this.state.user.email,
      userid: this.state.user.uid
    };
    database.ref().update(comments);
  };

  componentDidMount() {
    const { database, auth } = this.props;
    // pegando comentários persistidos no firebase
    this.setState({ isLoading: true });
    this.comments = database.ref("comments");
    this.comments.on("value", snapshot => {
      this.setState({
        comments: snapshot.val(),
        isLoading: false
      });
    });
    // verificando se já está logado
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          isAuth: true,
          user
        });
      } else {
        this.setState({
          isAuth: false,
          user: ""
        });
      }
    });
  }

  handleChangeScren = screen => {
    this.setState({
      authScreen: screen
    });
  };

  render() {
    return (
      <div className="App container mt-3">
        {/* LOGIN */}
        {!this.state.isAuth && this.state.authScreen === "login" && (
          <Login
            login={this.login}
            isAuthError={this.state.isAuthError}
            authError={this.state.authError}
            handleChangeScren={this.handleChangeScren}
          />
        )}
        {/* SIGNUP */}
        {!this.state.isAuth && this.state.authScreen === "signup" && (
          <SignUp
            createAccount={this.createAccount}
            isSignUpError={this.state.isSignUpError}
            signUpError={this.state.signUpError}
            handleChangeScren={this.handleChangeScren}
          />
        )}
        {this.state.isAuth && (
          <User email={this.state.user.email} logout={this.logout} />
        )}
        {/* NEW COMMENT */}
        {this.state.isAuth && <NewComment sendComment={this.sendComment} />}
        {/* COMMENTS */}
        <Comments comments={this.state.comments} />
        {this.state.isLoading && <p>carregando...</p>}
      </div>
    );
  }
}

export default App;
