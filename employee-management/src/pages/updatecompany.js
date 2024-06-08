import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../pages/styles/updatecompany.css";

const UpdateCompany = () => {
  const { id } = useParams();
  const [company, setCompany] = useState({
    name: "",
    number_of_departments: 0,
    number_of_employees: 0,
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/companies/${id}/`)
      .then((response) => {
        setCompany(response.data);
      })
      .catch((error) => {
        console.error("Error fetching company data:", error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompany((prevCompany) => ({
      ...prevCompany,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    axios
      .put(`http://localhost:8000/api/companies/${id}/`, company, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Company updated successfully:", response.data);
        setSuccessMessage("Company updated successfully");
        setErrorMessage("");
      })
      .catch((error) => {
        console.error("Error updating company:", error);
        setErrorMessage("Error updating company");
        setSuccessMessage("");
      });
  };

  return (
    <div className="update-company-container">
      <h1>Update Company</h1>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="company-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={company.name}
            onChange={handleInputChange}
            className="form-input"
          />
        </label>
        <label>
          Number of Departments:
          <input
            type="number"
            name="number_of_departments"
            value={company.number_of_departments}
            onChange={handleInputChange}
            className="form-input"
          />
        </label>
        <label>
          Number of Employees:
          <input
            type="number"
            name="number_of_employees"
            value={company.number_of_employees}
            onChange={handleInputChange}
            className="form-input"
          />
        </label>
        <button type="submit" className="submit-button">
          Update Company
        </button>
      </form>
    </div>
  );
};

export default UpdateCompany;
