import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// make account POST request
const makeAccount = (user, pwd, navigate) => {
  const data = {
    username: user,
    password: pwd,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const signingUp = async () => {
    try {
      const res = await fetch("/sign-up", options);
      const data = await res.json();
      alert(data.message);
      if (res.ok) navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  signingUp();
};

// SIGN-UP FUNCTION
const SignUp = () => {
  const [signUpUser, setSignUpUser] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login sign-up">
        <div>
          {/* goes back to login if clicked */}
          <Link to="/login">
            <div className="go-back">X</div>
          </Link>

          <h2>Make an Account</h2>

          {/* user input */}
          <div>
            <label htmlFor="user">Username:</label>
            <input
              value={signUpUser}
              onChange={(e) => setSignUpUser(e.target.value)}
              placeholder="Username"
              type="user"
              id="user"
            />
          </div>

          {/* password input */}
          <div className="pwd">
            <label htmlFor="password">Password:</label>
            <input
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
              placeholder="Password"
              type="text"
              id="password"
            />
          </div>

          {/* calls makeAccount POST function */}
          <div className="buttons">
            <button
              onClick={(e) => {
                e.preventDefault();
                makeAccount(signUpUser, signUpPassword, navigate);
              }}
            >
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
