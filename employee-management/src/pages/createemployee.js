import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateEmployee = () => {
  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    company: "",
    department: "",
    status: "onboarding",
    name: "",
    email: "",
    mobile_number: "",
    address: "",
    designation: "",
    hired_on: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      console.error("No token found, user is not authenticated");
      navigate("/login");
      return;
    }

    console.log("Token on load:", token);

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

  useEffect(() => {
    if (!token) {
      console.error("No token found, user is not authenticated");
      navigate("/login");
      return;
    }

    if (formData.company) {
      axios
        .get(
          `http://127.0.0.1:8000/api/departments/?company=${formData.company}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setDepartments(response.data);
        })
        .catch((error) => {
          console.error("Error fetching departments:", error);
        });
    } else {
      setDepartments([]);
    }
  }, [formData.company, token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "status" && value === "active") {
      setFormData((prevData) => ({
        ...prevData,
        hired_on: new Date().toISOString().slice(0, 10),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      console.error("No token found, user is not authenticated");
      navigate("/login");
      return;
    }

    try {
      console.log("Submitting form data:", formData);

      const requestData = {
        ...formData,
        hired_on: formData.hired_on || null,
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/employees/",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      alert("Employee created successfully!");
      navigate("/employees");
    } catch (error) {
      if (error.response) {
        console.error("Error creating employee:", error.response.data);
      } else {
        console.error("Error creating employee:", error.message);
      }
      alert("You do not have permission to perform this action.");
    }
  };

  const calculateDaysEmployed = () => {
    if (formData.hired_on) {
      const hiredDate = new Date(formData.hired_on);
      const currentDate = new Date();
      const timeDifference = Math.abs(currentDate - hiredDate);
      const daysEmployed = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      return daysEmployed;
    }
    return 0;
  };

  return (
    <div>
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit}>
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
          Department:
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            disabled={!formData.company}
          >
            <option value="">Select a department</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Status:
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="onboarding">Onboarding</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
        <br />
        {formData.status === "active" && (
          <label>
            Hired On:
            <input
              type="date"
              name="hired_on"
              value={formData.hired_on}
              onChange={handleChange}
            />
          </label>
        )}
        <br />
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
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Mobile Number:
          <input
            type="text"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Designation:
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Days Employed:
          <input type="text" value={calculateDaysEmployed()} readOnly />
        </label>
        <br />
        <button type="submit">Create Employee</button>
      </form>
    </div>
  );
};

export default CreateEmployee;
