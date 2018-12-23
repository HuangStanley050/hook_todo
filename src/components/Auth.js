import React, { useContext } from "react";
import AuthContext from "../auth-context";
const auth = props => {
  const auth = useContext(AuthContext);
  return (
    <div>
      <h2>Auth component</h2>
      <button onClick={auth.login}>Log in</button>
      <button onClick={auth.logout}>Log out</button>
    </div>
  );
};

export default auth;
