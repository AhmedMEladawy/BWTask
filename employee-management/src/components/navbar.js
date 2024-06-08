import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navigation.css";

const Navigation = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    navigate("/");
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/create-employee" className="nav-link">
            Create Employee
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/create-company" className="nav-link">
            Create Company
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/create-department" className="nav-link">
            Create Department
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/list-employee" className="nav-link">
            List Employees
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/list-companies" className="nav-link">
            List Companies
          </Link>
        </li>
        {isLoggedIn ? (
          <li className="nav-item">
            <button onClick={handleLogout} className="nav-link">
              Logout
            </button>
          </li>
        ) : (
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
