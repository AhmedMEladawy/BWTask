import React from "react";
import { Link } from "react-router-dom";
import "../pages/styles/landingpage.css"; // Import your CSS file for styling

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <h1>Welcome to Employee Management System</h1>
        <p>Manage Your Companies, Departments, and Employees with Ease</p>
      </header>
      <section className="features">
        <div className="feature">
          <h2>Key Features</h2>
          <ul>
            <li>Create, Read, Update, and Delete (CRUD) records</li>
            <li>Efficient onboarding workflow for new employees</li>
            <li>Role-based access control for secure data handling</li>
          </ul>
        </div>
      </section>
      <footer className="footer">
        <Link to="/login" className="cta-button">
          Get Started
        </Link>
        <nav className="footer-nav">
          <ul>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default LandingPage;
