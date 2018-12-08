import React, { Component } from "react";

class SigUpn extends Component {
  state = {
    email: "",
    passwd: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  createAccount = () => {
    const { email, passwd } = this.state;
    this.props.createAccount(email, passwd);
  };

  handleError = err => {
    const error = {
      "auth/invalid-email": "Email inválido",
      "auth/weak-password": "Senha muito fraca",
      "auth/email-already-in-use": "Email já em uso"
    };
    return error[err];
  };

  render() {
    const { isSignUpError, signUpError, handleChangeScren } = this.props;
    return (
      <div>
        <h4>Criar Conta</h4>
        <input type="text" onChange={this.handleChange("email")} />
        <input type="password" onChange={this.handleChange("passwd")} />
        <button type="button" onClick={this.createAccount}>
          Criar Conta
        </button>
        <button onClick={() => handleChangeScren("login")}>
          entra em conta
        </button>
        {isSignUpError && (
          <p style={{ color: "red", marginTop: 0 }}>
            <strong>Erro: </strong>
            {this.handleError(signUpError)}
          </p>
        )}
      </div>
    );
  }
}

export default SigUpn;
