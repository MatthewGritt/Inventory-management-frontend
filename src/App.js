import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import EditProduct from "./components/EditProduct";
import Inventory from "./components/InventoryItem";
import Login from "./components/Login";
import Nav from "./components/Nav";
import NewProduct from "./components/NewProduct";
import SignUp from "./components/signUp";
import Cookies from "js-cookie";
import Users from "./components/Users";
import NotFound from "./components/NotFound";

const App = () => {
  const [token, setToken] = useState(Cookies.get("jwtToken"));
  const [user, setUser] = useState(null);
  const [connected, setConnected] = useState(null);
  const navigate = useNavigate();

  // check if connected to database
  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API}/connect`)
  //     .then((res) => res.json())
  //     .then((data) => setConnected(data));
  // }, []);

  useEffect(() => {
    if (token) {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token,
        },
      };
      fetch(`${process.env.REACT_APP_API}/auth`, options).then((res) =>
        res.json().then((data) => setUser(data)),
      );
    }
  }, [token]);
  return (
    <div className="app">
      {token && connected && (
        <>
          <Nav role={user && user[0].role} />
          <div className="routes">
            <div className="welcome">
              <h2>
                Welcome <span>{user && user[0].username}</span>
              </h2>
              <button
                // removes stored cookie when clicked
                onClick={() => {
                  Cookies.remove("jwtToken");
                  setUser(null);
                  setToken(null);
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </div>
            {/* prettier-ignore */}
            <Routes>
              <Route path="/" element={<Dashboard token={token} perm={user && user[0].permission}  />}></Route>
              <Route path="/add-product" element={<NewProduct token={token} perm={user && user[0].permission}  />}></Route>
              <Route path="/edit-product" element={<EditProduct token={token} perm={user && user[0].permission}  />}></Route>
              <Route path="/users" element={<Users user={user} token={token} />}></Route>
              <Route path="/inventory/:id" element={<Inventory />}></Route>;
              <Route path="*" element={<NotFound />}></Route>;
            </Routes>
          </div>
        </>
      )}
      {/* login routes */}
      {!token && connected && (
        <>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />}></Route>
            <Route
              path="/login"
              element={<Login setToken={setToken} />}
            ></Route>
            <Route path="/sign-up" element={<SignUp />}></Route>
            <Route path="*" element={<Navigate to="/login" />}></Route>
          </Routes>
        </>
      )}
      {!connected && (
        <div className="connecting">
          <h1>Loading Server...</h1>
          <p>average wait time 30-40 seconds</p>
        </div>
      )}
    </div>
  );
};
export default App;
