import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children, isLoggedIn, onLogout }) => {
  return (
    <div>
      <header>
        <h1>Employee Management System</h1>
        {isLoggedIn && <button onClick={onLogout}>Logout</button>}
      </header>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
