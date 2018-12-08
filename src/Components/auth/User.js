import React from "react";

const User = ({ email, logout }) => {
  return (
    <div>
      <div>Logado como: {email}</div>
      <button type="button" onClick={logout}>
        Sair
      </button>
    </div>
  );
};

export default User;
