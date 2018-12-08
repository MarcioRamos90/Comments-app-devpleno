import React, { Component } from "react";

class Login extends Component {
  state = {
    email: "",
    passwd: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  login = () => {
    const { email, passwd } = this.state;
    this.props.login(email, passwd);
  };

  handleError = err => {
    const error = {
      "auth/invalid-email": "Email inválido",
      "auth/user-not-found": "Email e/ou senha incorretos",
      "auth/wrong-password": "Email e/ou senha incorretos"
    };
    return error[err];
  };

  handleChangeScren = e => {
    e.preventDefault();
    this.props.handleChangeScren("signup");
  };

  render() {
    const { isAuthError, authError } = this.props;
    return (
      <div>
        <h4>Entrar</h4>
        <form className="form-inline">
          <input
            type="text"
            className="form-control mr-2"
            onChange={this.handleChange("email")}
          />
          <input
            type="password"
            className="form-control mr-2"
            onChange={this.handleChange("passwd")}
          />
          <button
            type="button"
            className="btn btn-primary mr-2"
            onClick={this.login}
          >
            Entrar
          </button>
          <button className="btn" onClick={this.handleChangeScren}>
            criar conta
          </button>
        </form>
        {isAuthError && (
          <p class="alert alert-warning mt-2">
            <strong>Erro: </strong>
            {this.handleError(authError)}
          </p>
        )}
      </div>
    );
  }
}

export default Login;
