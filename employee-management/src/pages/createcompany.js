import React, { useState } from "react";
import axiosInstance from "../components/axios";
import { useNavigate } from "react-router-dom";

const CreateCompanyPage = () => {
  const [name, setName] = useState("");
  const [numberOfDepartments, setNumberOfDepartments] = useState(0);
  const [numberOfEmployees, setNumberOfEmployees] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateCompany = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/api/companies/", {
        name,
        number_of_departments: numberOfDepartments,
        number_of_employees: numberOfEmployees,
      });
      navigate("/list-companies");
    } catch (err) {
      setError("Failed to create company");
    }
  };

  const handleNumberOfDepartmentsChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setNumberOfDepartments(value);
    }
  };

  const handleNumberOfEmployeesChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setNumberOfEmployees(value);
    }
  };

  return (
    <div>
      <h2>Create Company</h2>
      <form onSubmit={handleCreateCompany}>
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Number of Departments:</label>
          <input
            type="number"
            value={numberOfDepartments}
            onChange={handleNumberOfDepartmentsChange}
            required
          />
        </div>
        <div>
          <label>Number of Employees:</label>
          <input
            type="number"
            value={numberOfEmployees}
            onChange={handleNumberOfEmployeesChange}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateCompanyPage;
