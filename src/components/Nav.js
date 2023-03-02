import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ role }) => {
  return (
    <nav>
      {/* top part showing role */}
      <div className="role">
        <h2>{role}</h2>
      </div>
      {/* Dashboard */}
      <Link to="/">
        <div className="nav-option">
          <h2>Dashboard</h2>
        </div>
      </Link>

      {/* Add product */}
      <Link to="/add-product">
        <div className="nav-option">
          <h2>Add Product</h2>
        </div>
      </Link>
      {/* Show out of stokes */}
      <Link to="/users">
        <div className="nav-option">
          <h2>Users</h2>
        </div>
      </Link>
    </nav>
  );
};

export default Nav;
