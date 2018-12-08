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

  handleChangeScren = e => {
    e.preventDefault();
    this.props.handleChangeScren("login");
  };

  render() {
    const { isSignUpError, signUpError } = this.props;
    return (
      <div>
        <h4>Criar Conta</h4>
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
            onClick={this.createAccount}
          >
            Criar Conta
          </button>
          <button className="btn" onClick={this.handleChangeScren}>
            entra em conta
          </button>
        </form>
        {isSignUpError && (
          <p class="alert alert-warning mt-2">
            <strong>Erro: </strong>
            {this.handleError(signUpError)}
          </p>
        )}
      </div>
    );
  }
}

export default SigUpn;
