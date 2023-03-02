import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Login&admin.css";

// validate POST request
// will attempt to log in user
const validate = (user, pwd, navigate, setToken) => {
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
  const loggingIn = async () => {
    try {
      const res = await fetch("/login", options);
      const data = await res.json();
      if (data.message) alert(data.message);
      else {
        setToken(data);
        Cookies.set("jwtToken", data, { expires: 7 });
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  loggingIn();
};

// LOGIN FUNCTION
const Login = ({ setToken }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="login-container">
      <div className="login">
        <form className="login-box">
          <h2>Login</h2>

          {/* user input */}
          <div>
            <label htmlFor="user">Username:</label>
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Username"
              type="email"
              id="user"
            />
          </div>

          {/* password input */}
          <div className="pwd">
            <label htmlFor="password">Password:</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="text"
              id="password"
            />
          </div>

          <div className="buttons">
            {/* calls validate POST request function */}
            <button
              onClick={(e) => {
                e.preventDefault();
                validate(user, password, navigate, setToken);
              }}
            >
              SIGN IN
            </button>
            <p>
              Not registered? sign up{" "}
              <span
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/sign-up");
                }}
              >
                here
              </span>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
