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

  render() {
    const { isAuthError, authError, handleChangeScren } = this.props;
    return (
      <div>
        <h4>Entrar</h4>
        <input type="text" onChange={this.handleChange("email")} />
        <input type="password" onChange={this.handleChange("passwd")} />
        <button type="button" onClick={this.login}>
          Entrar
        </button>
        <button onClick={() => handleChangeScren("signup")}>criar conta</button>
        {isAuthError && (
          <p style={{ color: "red", marginTop: 0 }}>
            <strong>Erro: </strong>
            {this.handleError(authError)}
          </p>
        )}
      </div>
    );
  }
}

export default Login;
