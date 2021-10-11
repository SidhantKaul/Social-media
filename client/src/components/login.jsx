import React from "react";
const axios = require('axios').default;
axios.defaults.withCredentials = true;
function Login() {
  function handleClick() {
    axios
    .get("/auth/google")
    .then((result)=>{
      console.log(result.data);
    })
  }
  return (
    <div>
      <div className="header">
        <h1>FBGRAM</h1>
      </div>
      <div className="login-btn">
        <a href="/auth/google" className="btn btn-block btn-social btn-google shadow-none">
          <span class="fab fa-google"></span> Sign Up/Login
        </a>
      </div>
    </div>
  );
}
export default Login;
