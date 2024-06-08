import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../pages/styles/createdepartment.css";

const CreateDepartment = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    numEmployees: 0,
  });
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      console.error("No token found, user is not authenticated");
      navigate("/login");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/companies/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
      });
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "numEmployees" ? Math.max(0, parseInt(value)) : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      console.error("No token found, user is not authenticated");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/departments/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      alert("Department created successfully!");
      navigate("/");
    } catch (error) {
      if (error.response) {
        console.error("Error creating department:", error.response.data);
      } else {
        console.error("Error creating department:", error.message);
      }
      alert("You do not have permission to perform this action.");
    }
  };

  return (
    <div>
      <h2>Create Department</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Company:
          <select
            name="company"
            value={formData.company}
            onChange={handleChange}
          >
            <option value="">Select a company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Number of Employees:
          <input
            type="number"
            name="numEmployees"
            value={formData.numEmployees}
            onChange={handleChange}
            min={0}
          />
        </label>
        <br />
        <button type="submit">Create Department</button>
      </form>
    </div>
  );
};

export default CreateDepartment;
