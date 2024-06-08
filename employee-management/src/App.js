import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/Login";
import CreateCompanyPage from "./pages/createcompany";
import ListCompanies from "./pages/companylist";
import CreateEmployeePage from "./pages/createemployee";
import ListEmployees from "./pages/employeelist";
import UpdateEmployee from "./pages/updateemployee";
import CreateDepartment from "./pages/createdepartment";
import UpdateCompany from "./pages/updatecompany";
import LandingPage from "./pages/landingpage";
import Navigation from "./components/navbar";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navigation isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-company" element={<CreateCompanyPage />} />
        <Route path="/list-companies" element={<ListCompanies />} />
        <Route path="/create-department" element={<CreateDepartment />} />
        <Route path="/create-employee" element={<CreateEmployeePage />} />
        <Route path="/list-employee" element={<ListEmployees />} />
        <Route path="/update-employee/:id" element={<UpdateEmployee />} />
        <Route path="/update-company/:id" element={<UpdateCompany />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
